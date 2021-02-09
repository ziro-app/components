import { RegisteredTransaction } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { CreditCardPayments } from "@bit/vitorbarbosa19.ziro.firebase.credit-card-payments";
import mountSplitRules from "./mountSplitRules";
import prepareFees from "./prepareFees";
import prepareReceivables from "./prepareReceivables";
import simplifyFeeDetails from "./simplifyFeeDetails";
import { Receivable } from "../dataCreators/receivables";
import { formatDateUTC3 } from "@ziro/format-date-utc3";
import translateStatus from "./translateStatus";
import { Storeowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import currencyFormat from "@ziro/currency-format";
import mountSplitRulesOld from "./mountSplitRulesOld";
import type firebase from "firebase";

const prepareDataWithInsurance = (
    {
        id: transactionId,
        status,
        amount,
        payment_type,
        payment_method,
        installment_plan,
        sales_receipt,
        gateway_authorizer: authorizer,
        split_rules,
        created_at,
    }: RegisteredTransaction.Response, // @ts-ignore
    { seller, sellerZoopPlan, onBehalfOfBrand, insurance }: CreditCardPayments.FirebaseDocument,
    { razao, storeownerId }: Storeowner,
    timestamp: () => firebase.firestore.FieldValue,
) => {
    try {
        const installments = installment_plan.number_installments;
        const type = payment_type === "credit" ? "crédito" : "";
        const { holder_name, first4_digits, last4_digits, card_brand } = payment_method;
        const [antiFraud, markup] = mountSplitRules({ sellerZoopPlan, cardBrand: card_brand, installments, insurance, split_rules })
            
        const sellerName = seller === "Ziro" && onBehalfOfBrand ? `Ziro - ${onBehalfOfBrand}` : seller;
        const sheetData = [
            transactionId,
            formatDateUTC3(new Date(created_at)),
            translateStatus(status),
            type,
            installments,
            sellerName,
            razao,
            holder_name.trim().toLowerCase(),
            card_brand,
            `${first4_digits}...${last4_digits}`,
            currencyFormat(parseFloat(amount).toFixed(2).replace(".", "")).replace("R$", ""),
        ];
        const dbData = {
            buyerStoreownerId: storeownerId,
            buyerRazao: razao,
            status: translateStatus(status),
            installments,
            datePaid: timestamp(),
            dateLastUpdate: timestamp(),
            cardBrand: card_brand,
            cardholder: holder_name.toLowerCase(),
            cardFirstFour: first4_digits,
            cardLastFour: last4_digits,
            transactionZoopId: transactionId,
            receiptId: sales_receipt,
            sellerZoopPlan: {
                antiFraud,
                markup,
            },
            authorizer,
            onBehalfOfBrand: onBehalfOfBrand ?? "",
        };
        return [dbData, sheetData] as [typeof dbData, typeof sheetData];
    } catch (e) {
        //console.log("error on prepareRegisteredDataToDbAndSheet", e);
    }
};

const prepareDataWithoutInsurance = (
    {
        id: transactionId,
        status,
        amount,
        payment_type,
        payment_method,
        installment_plan,
        sales_receipt,
        gateway_authorizer: authorizer,
        fee_details,
        fees,
        split_rules,
        created_at,
    }: RegisteredTransaction.Response, // @ts-ignore
    { seller, sellerZoopPlan, onBehalfOfBrand, insurance }: CreditCardPayments.FirebaseDocument,
    { razao, storeownerId }: Storeowner,
    timestamp: () => firebase.firestore.FieldValue,
    receivables: Receivable[],
) => {
    try {
        const installments = installment_plan.number_installments;
        const type = payment_type === "credit" ? "crédito" : "";
        const { holder_name, first4_digits, last4_digits, card_brand } = payment_method; // @ts-ignore
        const [antiFraud, markup] = mountSplitRules({ sellerZoopPlan, cardBrand: card_brand, installments, insurance, split_rules })
            
        const sellerName = seller === "Ziro" && onBehalfOfBrand ? `Ziro - ${onBehalfOfBrand}` : seller;
        const simplifiedFeeDetails = simplifyFeeDetails(fee_details, {
            antiFraud,
            markup,
        } as CreditCardPayments.SellerZoopPlan.AfterPayment);
        const totalFees = simplifiedFeeDetails.map((fee) => parseFloat(fee.amount)).reduce((accumulator, currentValue) => accumulator + currentValue);
        const rounded = (Math.round((totalFees + Number.EPSILON) * 100) / 100).toString();

        const preparedFees = prepareFees(fees, simplifiedFeeDetails, receivables);
        // @ts-ignore
        const antifraudId = "id" in antiFraud ? antiFraud.id : "-";
        // @ts-ignore
        const markupId = "id" in markup ? markup.id : "-";
        const preparedReceivables = prepareReceivables(
            transactionId,
            receivables,
            markupId,
            antifraudId,
            markupId !== "-" && markupId === antifraudId,
        );

        const sheetData = [
            transactionId,
            formatDateUTC3(new Date(created_at)),
            translateStatus(status),
            type,
            installments,
            sellerName,
            razao,
            holder_name.trim().toLowerCase(),
            card_brand,
            `${first4_digits}...${last4_digits}`,
            currencyFormat(parseFloat(amount).toFixed(2).replace(".", "")).replace("R$", ""),
            ...preparedFees,
        ];
        const dbData = {
            buyerStoreownerId: storeownerId,
            buyerRazao: razao,
            status: translateStatus(status),
            installments,
            datePaid: timestamp(),
            cardBrand: card_brand,
            cardholder: holder_name.toLowerCase(),
            cardFirstFour: first4_digits,
            cardLastFour: last4_digits,
            transactionZoopId: transactionId,
            receiptId: sales_receipt,
            authorizer,
            fees,
            fee_details: simplifiedFeeDetails,
            sellerZoopPlan: {
                antiFraud,
                markup,
            },
            totalFees: rounded,
            receivables,
            dateLastUpdate: timestamp(),
        };
        return [dbData, sheetData, preparedReceivables] as [typeof dbData, typeof sheetData, typeof preparedReceivables];
    } catch (e) {
        //console.log("error on prepareDataToDbAndSheet", e);
    }
};

export default (
    transaction: RegisteredTransaction.Response,
    firebaseDocument: CreditCardPayments.FirebaseDocument,
    storeowner: Storeowner,
    timestamp: () => firebase.firestore.FieldValue,
    receivables: Receivable[],
) => {
    try {
        const { insurance } = firebaseDocument;
        return insurance
            ? prepareDataWithInsurance(transaction, firebaseDocument, storeowner, timestamp)
            : prepareDataWithoutInsurance(transaction, firebaseDocument, storeowner, timestamp, receivables);
    } catch (e) {
        //console.log("error on prepareDataToDbAndSheet", e);
    }
};

import { formatDateUTC3 } from "@ziro/format-date-utc3";
import { CreditCardPayments } from "@bit/vitorbarbosa19.ziro.firebase.credit-card-payments";
import currencyFormat from "@ziro/currency-format";
import translateStatus from "./translateStatus";
import prepareFees from "./prepareFees";
import prepareReceivables from "./prepareReceivables";
import mountSplitRules from "./mountSplitRules";
import simplifyFeeDetails from "./simplifyFeeDetails";
import mountSplitRulesOld from "./mountSplitRulesOld";
import { UnregisteredTransaction } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { Receivable } from "../dataCreators/receivables";
const prepareDataToDbAndSheet = (
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
    }: UnregisteredTransaction.Response,
    receivables: Receivable[], // @ts-ignore
    { seller, sellerZoopPlan, insurance, isNewPlan }: CreditCardPayments.FirebaseDocument,
) => {
    try {
        const today = new Date();
        const installments = installment_plan.number_installments;
        const type = payment_type === "credit" ? "crédito" : "";
        const { holder_name, first4_digits, last4_digits, card_brand } = payment_method; // @ts-ignore
        const [antiFraud, markup] = isNewPlan
            ? mountSplitRules({ sellerZoopPlan, cardBrand: card_brand, installments, insurance, split_rules })
            : mountSplitRulesOld(split_rules, sellerZoopPlan || {});

        const simplifiedFeeDetails = simplifyFeeDetails(fee_details, {
            antiFraud,
            markup,
        } as CreditCardPayments.SellerZoopPlan.AfterPayment);
        const totalFees = simplifiedFeeDetails.map((fee) => parseFloat(fee.amount)).reduce((accumulator, currentValue) => accumulator + currentValue);
        //const simplifiedFeeDetails = fee_details.map(({ amount, type, description }) => ({ amount, type, description }));
        //simplifiedFeeDetails.push(antifraudObj);
        //simplifiedFeeDetails.push(markupObj);

        //const totalFees = fee_details.map((fee) => fee.amount).reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue));
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
            seller,
            "Pagamento sem cadastro",
            holder_name.toLowerCase(),
            card_brand,
            `${first4_digits}...${last4_digits}`,
            currencyFormat(parseFloat(amount).toFixed(2).replace(".", "")).replace("R$", ""),
            ...preparedFees,
        ];
        const dbData = {
            buyerRazao: "Pagamento sem cadastro",
            status: translateStatus(status),
            installments,
            datePaid: new Date(),
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
            dateLastUpdate: today,
        };
        return [sheetData, dbData, preparedReceivables] as [typeof sheetData, typeof dbData, typeof preparedReceivables];
    } catch (e) {
        //console.log("error on prepareDataToDbAndSheet", e);
    }
};

export default prepareDataToDbAndSheet;

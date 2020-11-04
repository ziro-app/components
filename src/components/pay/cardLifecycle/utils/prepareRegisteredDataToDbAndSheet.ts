import { RegisteredTransaction } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { CreditCardPayments } from "@bit/vitorbarbosa19.ziro.firebase.credit-card-payments";
import mountSplitRules from "./mountSplitRules";
import { formatDateUTC3 } from "@ziro/format-date-utc3";
import translateStatus from "./translateStatus";
import { Storeowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import currencyFormat from "@ziro/currency-format";

export default (
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
    }: RegisteredTransaction.Response,
    { seller, sellerZoopPlan, onBehalfOfBrand }: CreditCardPayments.FirebaseDocument,
    { razao, storeownerId }: Storeowner,
    timestamp: () => firebase.firestore.FieldValue,
) => {
    const installments = installment_plan.number_installments;
    const type = payment_type === "credit" ? "crédito" : "";
    const { holder_name, first4_digits, last4_digits, card_brand } = payment_method;
    const [antiFraud, markup] = mountSplitRules(split_rules, sellerZoopPlan || {});
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
};

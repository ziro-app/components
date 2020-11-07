import { CreditCardPayments } from "@bit/vitorbarbosa19.ziro.firebase.credit-card-payments";

interface FeeDetail {
    amount: string;
    currency: string;
    description: string;
    is_gateway_fee: boolean;
    prepaid: boolean;
    type: string;
}

export default (
    fee_details: FeeDetail[],
    { antiFraud, markup }: CreditCardPayments.SellerZoopPlan.AfterPayment
) => {
    const antifraudObj = {
        amount: "receivable_amount" in antiFraud ? antiFraud.receivable_amount : "0.00",
        type: "antifraud_ziro_fee_brazil",
        description: "Ziro antifraud card-present transaction fee",
    };
    const markupObj = {
        amount: "receivable_amount" in markup ? markup.receivable_amount : "0.00",
        type: "markup_ziro_fee_brazil",
        description: "Ziro markup card-present transaction fee",
    };
    const simplifiedFeeDetails = fee_details.map(({ amount, type, description }) => ({ amount, type, description }));
    simplifiedFeeDetails.push(antifraudObj);
    simplifiedFeeDetails.push(markupObj);
    return simplifiedFeeDetails;
};

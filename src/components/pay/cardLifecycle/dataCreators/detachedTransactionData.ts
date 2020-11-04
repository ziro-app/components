import { UnregisteredCard, UnregisteredTransaction } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { CreditCardPayments } from "@bit/vitorbarbosa19.ziro.firebase.credit-card-payments";

export default (card: UnregisteredCard, installments: string, payment: CreditCardPayments.FirebaseDocument) => {
    const data: UnregisteredTransaction.Request = {
        sendCompleteError: true,
        payment_type: "credit",
        capture: true,
        on_behalf_of: payment.sellerZoopId,
        statement_descriptor: `Ziro ${payment.seller}`,
        source: {
            usage: "single_use",
            amount: payment.charge,
            currency: "BRL",
            type: "card",
            card,
        },
        installment_plan: {
            mode: "interest_free",
            number_installments: installments,
        },
    };
    if (payment.sellerZoopPlan?.markup?.percentage || payment.sellerZoopPlan?.markup?.amount) {
        const formattedPercentage =
            typeof payment.sellerZoopPlan.markup.percentage === "string"
                ? parseFloat(payment.sellerZoopPlan.markup.percentage)
                : payment.sellerZoopPlan.markup.percentage;
        const formattedAmount =
            typeof payment.sellerZoopPlan.markup.amount === "string"
                ? parseFloat(payment.sellerZoopPlan.markup.amount)
                : payment.sellerZoopPlan.markup.amount;
        data.split_rules = [
            {
                recipient: process.env.SELLER_ID_ZIRO,
                percentage: formattedPercentage || 0,
                amount: formattedAmount || 0,
                liable: true,
                charge_processing_fee: false,
            },
        ];
    }
    return data;
};

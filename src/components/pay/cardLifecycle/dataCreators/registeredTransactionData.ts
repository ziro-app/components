import { RegisteredTransaction } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { CreditCardPayments } from "@bit/vitorbarbosa19.ziro.firebase.credit-card-payments";

export default (buyerZoopId: string, cardId: string, installments: string, payment: CreditCardPayments.FirebaseDocument) => {
    const data: RegisteredTransaction.Request = {
        sendCompleteError: true,
        payment_type: "credit",
        capture: !payment.insurance,
        on_behalf_of: payment.sellerZoopId,
        statement_descriptor: `Ziro* ${payment.seller === "Ziro" && payment.onBehalfOfBrand ? payment.onBehalfOfBrand : payment.seller}`,
        customer: buyerZoopId,
        source: {
            usage: "reusable",
            amount: payment.charge,
            currency: "BRL",
            type: "card",
            card: {
                id: cardId,
            },
        },
        installment_plan: {
            mode: "interest_free",
            number_installments: installments,
        },
    };
    if (payment.sellerZoopPlan?.markup?.percentage || payment.sellerZoopPlan?.markup?.amount) {
        data.split_rules = [
            {
                recipient: process.env.SELLER_ID_ZIRO,
                percentage: payment.sellerZoopPlan.markup.percentage || 0,
                amount: payment.sellerZoopPlan.markup.amount || 0,
                liable: true,
                charge_processing_fee: false,
            },
        ];
    }
    if (payment.sellerZoopPlan?.antiFraud?.percentage || payment.sellerZoopPlan?.antiFraud?.amount) {
        if (!data.split_rules) data.split_rules = [];
        data.split_rules.push({
            recipient: process.env.SELLER_ID_ZIRO,
            percentage: payment.sellerZoopPlan.antiFraud.percentage || 0,
            amount: payment.sellerZoopPlan.antiFraud.amount || 0,
            liable: true,
            charge_processing_fee: false,
        });
    }
    return data;
};

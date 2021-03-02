import { RegisteredTransaction, getCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { CreditCardPayments } from "@bit/vitorbarbosa19.ziro.firebase.credit-card-payments";

export default async (buyerZoopId: string, cardId: string, installments: string, payment: any) => {
    const data: RegisteredTransaction.Request = {
        sendCompleteError: true,
        payment_type: "credit",
        capture: !payment.insurance,
        on_behalf_of: payment.sellerZoopId,
        statement_descriptor: `${payment.seller === "Ziro" && payment.onBehalfOfBrand ? payment.onBehalfOfBrand : payment.seller}`,
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
    const { card_brand: cardBrand } = await getCard(cardId);

    const { sellerZoopPlan } = payment;
    const whichPlan = sellerZoopPlan.activePlan;
    const installmentNumber = `installment${installments}`;
    const percentageMarkup = sellerZoopPlan[whichPlan]["ziroMarkupFee"][cardBrand.toLowerCase()][installmentNumber];
    const percentageAntiFraud = sellerZoopPlan[whichPlan]["ziroAntifraudFee"][cardBrand.toLowerCase()][installmentNumber];

    const markupPercentage = typeof percentageMarkup === "string" ? parseFloat(percentageMarkup) : percentageMarkup;
    data.split_rules = [
        {
            recipient: process.env.SELLER_ID_ZIRO,
            percentage: markupPercentage || 0,
            amount: 0,
            liable: true,
            charge_processing_fee: false,
        },
    ];

    const antifraudPercentage = typeof percentageAntiFraud === "string" ? parseFloat(percentageAntiFraud) : percentageAntiFraud;
    if (!data.split_rules) data.split_rules = [];
    data.split_rules.push({
        recipient: process.env.SELLER_ID_ZIRO,
        percentage: antifraudPercentage || 0,
        amount: 0,
        liable: true,
        charge_processing_fee: false,
    });

    return data;
};

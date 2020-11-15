import { getCard, UnregisteredCard, UnregisteredTransaction } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { CreditCardPayments } from "@bit/vitorbarbosa19.ziro.firebase.credit-card-payments";

export default async (card: UnregisteredCard, installments: string, payment: any) => {
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
    // @ts-ignore
    const { card_brand: cardBrand } = await getCard(cardId);
    // @ts-ignore
    if (Object.prototype.hasOwnProperty.call(payment, "isNewPlan") && payment.isNewPlan == true) {
        const { sellerZoopPlan } = payment;
        // @ts-ignore
        const whichPlan = sellerZoopPlan.activePlan;
        const installmentNumber = `installment${installments}`;
        const percentageMarkup = sellerZoopPlan[whichPlan]["ziroMarkupFee"][cardBrand.toLowerCase()][installmentNumber];

        /*let filterSplitAntiFraud =
            Object.prototype.hasOwnProperty.call(payment, "split_rules") && insurance === true
                ? split_rules_transaction.filter((item) => parseFloat(item.percentage) === parseFloat(percentageAntiFraud))
                : [{ percentage: 0, amount: 0 }];
        if (typeof filterSplitAntiFraud[0] === "undefined") filterSplitAntiFraud = [{ percentage: 0, amount: 0 }];
        let filterSplitMarkup = Object.prototype.hasOwnProperty.call(transaction, "split_rules")
            ? split_rules_transaction.filter((item) => parseFloat(item.percentage) === parseFloat(percentageMarkup))
            : [{ percentage: 0, amount: 0 }];
        if (typeof filterSplitMarkup[0] === "undefined") filterSplitMarkup = [{ percentage: 0, amount: 0 }];*/

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
    } else {
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
    }
    return data;
};

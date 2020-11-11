import { RegisteredTransaction, getCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { CreditCardPayments } from "@bit/vitorbarbosa19.ziro.firebase.credit-card-payments";

export default async (buyerZoopId: string, cardId: string, installments: string, payment: CreditCardPayments.FirebaseDocument) => {
    try {
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
        }; // @ts-ignore
        const { card_brand: cardBrand } = await getCard(cardId);
        // @ts-ignore
        if (Object.prototype.hasOwnProperty.call(payment, "isNewPlan") && payment.isNewPlan == true) {
            const { sellerZoopPlan } = payment;
            // @ts-ignore
            const whichPlan = sellerZoopPlan.activePlan;
            const installmentNumber = `installment${installments}`;
            const percentageMarkup = sellerZoopPlan[whichPlan]["ziroMarkupFee"][cardBrand.toLowerCase()][installmentNumber];
            const percentageAntiFraud = sellerZoopPlan[whichPlan]["ziroAntifraudFee"][cardBrand.toLowerCase()][installmentNumber];
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

            const antifraudPercentage = typeof percentageAntiFraud === "string" ? parseFloat(percentageAntiFraud) : percentageAntiFraud;
            if (!data.split_rules) data.split_rules = [];
            data.split_rules.push({
                recipient: process.env.SELLER_ID_ZIRO,
                percentage: antifraudPercentage || 0,
                amount: 0,
                liable: true,
                charge_processing_fee: false,
            });
        } else {
            if (payment.sellerZoopPlan?.markup?.percentage || payment.sellerZoopPlan?.markup?.amount) {
                const markupPercentage =
                    typeof payment.sellerZoopPlan.markup.percentage === "string"
                        ? parseFloat(payment.sellerZoopPlan.markup.percentage)
                        : payment.sellerZoopPlan.markup.percentage;
                const markupAmount =
                    typeof payment.sellerZoopPlan.markup.amount === "string"
                        ? parseFloat(payment.sellerZoopPlan.markup.amount)
                        : payment.sellerZoopPlan.markup.amount;
                data.split_rules = [
                    {
                        recipient: process.env.SELLER_ID_ZIRO,
                        percentage: markupPercentage || 0,
                        amount: markupAmount || 0,
                        liable: true,
                        charge_processing_fee: false,
                    },
                ];
            }
            if (payment.insurance && (payment.sellerZoopPlan?.antiFraud?.percentage || payment.sellerZoopPlan?.antiFraud?.amount)) {
                const antifraudPercentage =
                    typeof payment.sellerZoopPlan.antiFraud.percentage === "string"
                        ? parseFloat(payment.sellerZoopPlan.antiFraud.percentage)
                        : payment.sellerZoopPlan.antiFraud.percentage;
                const antifraudAmount =
                    typeof payment.sellerZoopPlan.antiFraud.amount === "string"
                        ? parseFloat(payment.sellerZoopPlan.antiFraud.amount)
                        : payment.sellerZoopPlan.antiFraud.amount;
                if (!data.split_rules) data.split_rules = [];
                data.split_rules.push({
                    recipient: process.env.SELLER_ID_ZIRO,
                    percentage: antifraudPercentage || 0,
                    amount: antifraudAmount || 0,
                    liable: true,
                    charge_processing_fee: false,
                });
            }
        }
        return data;
    } catch (e) {
        //console.log("error", e);
    }
};

import { CreditCardPayments } from "@bit/vitorbarbosa19.ziro.firebase.credit-card-payments";
import { UnregisteredTransaction } from "@bit/vitorbarbosa19.ziro.pay.zoop";
//@ts-ignore
import { findPlanPercentages } from "@bit/vitorbarbosa19.ziro.split-rule";

interface generic {
    amount: string | number;
    percentage: string | number;
}

const filter = (a: generic) => (b: generic) => a?.amount === b?.amount && a?.percentage === b?.percentage;

const mountSplitRules = ({ sellerZoopPlan, cardBrand, installments, insurance, split_rules }) => {
    try {
        const whichPlan = sellerZoopPlan.activePlan;
        const installmentNumber = `installment${installments}`;
        const percentageMarkup = sellerZoopPlan[whichPlan]["ziroMarkupFee"][cardBrand.toLowerCase()][installmentNumber];
        const percentageAntiFraud = sellerZoopPlan[whichPlan]["ziroAntifraudFee"][cardBrand.toLowerCase()][installmentNumber];
        let objectAntifraud = {};
        let objectMarkup = {};
        const transactionType = insurance ? "withAntiFraud" : "noAntiFraud";
        const { percentageZiroMarkup, percentageZiroAntifraud } = findPlanPercentages({
            cardBrand,
            installments,
            insurance,
            sellerZoopPlan,
        });
        let filterSplitAntiFraud =
            split_rules.length > 0 && insurance === true
                ? split_rules.filter((item) => parseFloat(item.percentage) === parseFloat(percentageAntiFraud))
                : [{ percentage: 0, amount: 0 }];
        if (typeof filterSplitAntiFraud[0] === "undefined") filterSplitAntiFraud = [{ percentage: 0, amount: 0 }];
        let filterSplitMarkup =
            split_rules.length > 0
                ? split_rules.filter((item) => parseFloat(item.percentage) === parseFloat(percentageMarkup))
                : [{ percentage: 0, amount: 0 }];
        if (typeof filterSplitMarkup[0] === "undefined") filterSplitMarkup = [{ percentage: 0, amount: 0 }];
        if (transactionType === "withAntiFraud") {
            if (typeof percentageZiroAntifraud !== "undefined") {
                objectAntifraud = {
                    ...filterSplitAntiFraud[0],
                    type: "antifraud_ziro_fee_brazil",
                    description: "Ziro antifraud card-present transaction fee",
                };
            } else {
                const error = {
                    response: {
                        data: {
                            error: {
                                message: "Transação com antifraude mas não foi encontrada porcentagem",
                                message_display: "Aconteceu um erro de split, contate o suporte!",
                            },
                        },
                        status: 400,
                    },
                };
                throw error;
            }
        } else {
            objectAntifraud = { recipient: process.env.SELLER_ID_ZIRO, percentage: 0, liable: true, charge_processing_fee: false };
        }

        if (typeof percentageZiroMarkup !== "undefined") {
            objectMarkup = {
                ...filterSplitMarkup[0],
                type: "markup_ziro_fee_brazil",
                description: "Ziro markup card-present transaction fee",
            };
        } else {
            const error = {
                response: {
                    data: {
                        error: {
                            message: "Transação com markup na estrutura NOVA, mas não foi encontrada porcentagem",
                            message_display: "Aconteceu um erro de split, contate o suporte!",
                        },
                    },
                    status: 400,
                },
            };
            throw error;
        }
        return [objectAntifraud, objectMarkup];
    } catch (e) {
        throw e;
    }
};

export default mountSplitRules;

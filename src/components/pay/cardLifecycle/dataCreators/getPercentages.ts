// export const getPercentages = ({ sellerZoopPlan, installments, card_brand }) => {
//     const { activePlan } = sellerZoopPlan;
//     const installmentNumber = `installment${installments}`;
//     const percentageMarkup = sellerZoopPlan[activePlan]?.["ziroMarkupFee"]?.[card_brand.toLowerCase()]?.[installmentNumber];
//     const percentageAntifraud = sellerZoopPlan[activePlan]?.["ziroAntifraudFee"]?.[card_brand.toLowerCase()]?.[installmentNumber];
//     if (percentageMarkup === undefined || percentageMarkup === null) throw "NO MARKUP PERCENTAGE";
//     if (percentageAntifraud === undefined || percentageAntifraud === null) throw "NO ANTIFRAUD PERCENTAGE";
//     const markupPercentage = parseFloat(`${percentageMarkup}`);
//     const antifraudPercentage = parseFloat(`${percentageAntifraud}`);
//     return { markupPercentage, antifraudPercentage };
// };

export const getPercentages = ({ sellerZoopPlan, installments, card_brand, receivable }) => {
    const { activePlan } = sellerZoopPlan;
    const installmentNumber = `installment${installments}`;
    const p = sellerZoopPlan[activePlan]?.[receivable]?.[card_brand.toLowerCase()]?.[installmentNumber];
    const parsed = parseFloat(`${p}`);
    if (p === undefined || p === null || Number.isNaN(parsed)) throw "NO_PERCENTAGE";
    return parsed;
};

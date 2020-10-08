export function index({ cardBrand, installments, insurance, sellerZoopPlan }) {
    const activePlan = sellerZoopPlan.activePlan;
    const brand = cardBrand.toLowerCase().replace(/\s/g, "");
    const installment = `installment${installments}`;
    const percentageZiroMarkup = sellerZoopPlan[activePlan]["ziroMarkupFee"][brand][installment];
    const percentageZiroAntifraud = insurance ? sellerZoopPlan[activePlan]["ziroAntifraudFee"][brand][installment] : "N/A";
    return {
        percentageZiroMarkup,
        percentageZiroAntifraud,
    };
}

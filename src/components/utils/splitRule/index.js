export function findPlanPercentages({ cardBrand, installments, insurance, sellerZoopPlan, test = false, selectedPlan = "" }) {
    try {
        let activePlan = "";
        if (test) {
            activePlan = selectedPlan;
        } else {
            activePlan = sellerZoopPlan.activePlan;
        }
        const _brand = cardBrand.toLowerCase().replace(/\s/g, "");
        const brand = _brand.includes("amex") ? "americanexpress" : _brand;
        const installment = `installment${installments}`;
        const percentageZiroMarkup = sellerZoopPlan[activePlan].ziroMarkupFee[brand][installment];
        const percentageZiroAntifraud = insurance ? sellerZoopPlan[activePlan].ziroAntifraudFee[brand][installment] : "N/A";
        return {
            percentageZiroMarkup,
            percentageZiroAntifraud,
        };
    } catch (e) {
        throw "ERROR_GETTING_PERCENTAGES";
    }
}

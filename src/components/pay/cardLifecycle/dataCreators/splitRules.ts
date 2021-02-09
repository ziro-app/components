import { getPercentages } from "./getPercentages";

interface generic {
    percentage: string | number;
    amount?: string | number;
}

const newFinder = (a: number | string, excludeIndex?: number) => (b: generic, index) =>
    parseFloat(`${a}`) === parseFloat(`${b?.percentage}`) && (typeof excludeIndex != "number" || index !== excludeIndex);
const oldFinder = (a: generic, excludeIndex?: number) => (b: generic, index) =>
    parseFloat(`${a?.amount || 0}`) == parseFloat(`${b?.amount || 0}`) &&
    parseFloat(`${a?.percentage || 0}`) == parseFloat(`${b?.percentage || 0}`) &&
    (typeof excludeIndex != "number" || index !== excludeIndex);

const mountSplitRules = ({ sellerZoopPlan, card_brand, installments, insurance, split_rules }) => {
    console.log("CREATING SPLIT RULES", { sellerZoopPlan, split_rules });
    let markupObj = { amount: 0, percentage: 0 };
    let antifraudObj = { amount: 0, percentage: 0 };
    if (sellerZoopPlan !== null) {
        const _split = [...(split_rules || [])];
        let markupIndex = -1;
        let antifraudIndex = -1;
            const markupPercentage = getPercentages({
                sellerZoopPlan,
                installments,
                card_brand,
                receivable: "ziroMarkupFee",
            });
            markupIndex = _split.findIndex(newFinder(markupPercentage));
            if (insurance) {
                console.log("HAS INSURANCE");
                const antifraudPercentage = getPercentages({
                    sellerZoopPlan,
                    installments,
                    card_brand,
                    receivable: "ziroAntifraudFee",
                });
                antifraudIndex = _split.findIndex(newFinder(antifraudPercentage, markupIndex));
            }
        
        if (markupIndex > -1) markupObj = _split[markupIndex];
        if (antifraudIndex > -1) antifraudObj = _split[antifraudIndex];
    }
    console.log("RETURNING", { antifraudObj, markupObj });
    return [antifraudObj, markupObj];
};

export default mountSplitRules;

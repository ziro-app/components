import { GetCard, UnregisteredCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { CreditCardPayments } from "@bit/vitorbarbosa19.ziro.firebase.credit-card-payments";
import { getPercentages } from "../getPercentages";
import { findPlanPercentages } from "@bit/vitorbarbosa19.ziro.split-rule";
import { prompt } from "ziro-messages/dist/src/catalogo/pay/checkout";
import * as Sentry from "@sentry/react";

export const transaction = async (
    installments: string,
    payment: any,
    card: (UnregisteredCard & { card_brand: string }) | GetCard.Response,
    buyerZoopId?: string,
) => {
    let statement_descriptor = "";
    if (payment.seller === "Ziro" && payment.onBehalfOfBrand) statement_descriptor += payment.onBehalfOfBrand;
    else statement_descriptor += payment.seller;
    const data: any = {
        sendCompleteError: true,
        payment_type: "credit",
        capture: !payment.insurance,
        on_behalf_of: payment.sellerZoopId,
        statement_descriptor,
        source: {
            usage: "id" in card ? "reusable" : "single_use",
            amount: payment.charge,
            currency: "BRL",
            type: "card",
            card: "id" in card ? { id: card.id } : card,
        },
        installment_plan: {
            mode: "interest_free",
            number_installments: installments,
        },
        split_rules: [],
    };
    if (buyerZoopId) data.customer = buyerZoopId;
    const { sellerZoopPlan } = payment;
    let markupPercentage = 0;
    let markupAmount = 0;
    let antifraudPercentage = 0;
    let antifraudAmount = 0;
    const insurance = payment.insurance;
    if (payment.isNewPlan) {
        try {
            const { percentageZiroMarkup, percentageZiroAntifraud } = findPlanPercentages({
                cardBrand: card.card_brand,
                installments,
                insurance,
                sellerZoopPlan,
            });
            if (percentageZiroMarkup === undefined || percentageZiroAntifraud === undefined) throw null;
            markupPercentage = percentageZiroMarkup;
            if (payment.insurance) {
                if (Number.isNaN(Number(percentageZiroAntifraud))) throw null;
                antifraudPercentage = percentageZiroAntifraud;
            }
        } catch {
            throw prompt.ERROR_CREATING_SPLIT_OBJECT.withAdditionalData({ error: { message: "ERROR_CREATING_SPLIT_OBJECT" } });
        }
    } else {
        const _markupPercentage = parseFloat(`${sellerZoopPlan?.markup?.percentage}`);
        if (!Number.isNaN(_markupPercentage)) markupPercentage = _markupPercentage;
        const _markupAmount = parseFloat(`${sellerZoopPlan?.markup?.amount}`);
        if (!Number.isNaN(_markupAmount)) markupAmount = _markupAmount;
        if (payment.insurance) {
            const _antifraudPercentage = parseFloat(`${sellerZoopPlan?.antiFraud?.percentage}`);
            if (!Number.isNaN(_antifraudPercentage)) antifraudPercentage = _antifraudPercentage;
            const _antifraudAmount = parseFloat(`${sellerZoopPlan?.antiFraud?.amount}`);
            if (!Number.isNaN(_antifraudAmount)) antifraudAmount = _antifraudAmount;
        }
    }
    if (markupPercentage > 0 || markupAmount > 0) {
        data.split_rules.push({
            recipient: process.env.SELLER_ID_ZIRO,
            percentage: markupPercentage,
            amount: markupAmount,
            liable: true,
            charge_processing_fee: false,
        });
    }
    if (antifraudPercentage > 0 || antifraudAmount > 0) {
        data.split_rules.push({
            recipient: process.env.SELLER_ID_ZIRO,
            percentage: antifraudPercentage,
            amount: antifraudAmount,
            liable: true,
            charge_processing_fee: false,
        });
    }
    return data;
};

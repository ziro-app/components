import { ClassResultsCollection } from "./validator";
import { biometry, fullOCR } from "ziro-messages/dist/src/catalogo/antifraude";
import tuple from "@bit/vitorbarbosa19.ziro.utils.tuple";
import { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";

const manualApproval = tuple(
    fullOCR.prompt.EXPIRED_DOC.code,
    fullOCR.prompt.LAST_NAME_MISMATCH.code,
    fullOCR.prompt.PROBABILITY_UNDER_90.code,
    biometry.prompt.CONFIDENCE_UNDER_90.code,
);

export function approvalType(
    docValidations: FirebaseCard.BeforeSelfiePhase["validations"],
    selfieValidations: ClassResultsCollection,
): "approved" | "pendingManualApproval" {
    if (
        Object.values({ ...docValidations, ...selfieValidations }).some((validation) => {
            if (validation.passed === false && manualApproval.includes(validation.reason.code as any)) return true;
            return false;
        })
    )
        return "pendingManualApproval";
    return "approved";
}

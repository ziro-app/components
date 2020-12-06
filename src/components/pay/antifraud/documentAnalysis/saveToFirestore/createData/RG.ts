import { is } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { RG } from "./types";

export const Frente: RG.Frente = (_, { response: { fileInfo, face }, url, validations }) => {
    const data: ReturnType<RG.Frente> = {
        status: "pendingDocument",
        docStatus: "pendingRGV",
        documentType: "rg",
        face,
        "RG F": { url, fileInfo },
        validations: {
            face: validations.face,
            RGFProbability: validations.docProbability,
        },
    };
    return data;
};

export const Verso: RG.Verso = (
    _,
    { response: { fileInfo, extracted, fieldScores, ...response }, url, validations },
) => {
    const data: ReturnType<RG.Verso> = {
        status: "pendingDocument",
        docStatus: "pendingRGF",
        documentType: "rg",
        extracted,
        "RG V": { url, fileInfo },
        validations: {
            name: validations.name,
            expirationDate: validations.expirationDate,
            RGVProbability: validations.docProbability,
        },
    };
    if (fieldScores) data.fieldScores = fieldScores;
    if (is.BackgroundCheck(response)) {
        data.found = response.found;
        data.passedOn = response.passedOn;
    }
    return data;
};

export const FrenteVerso: RG.FrenteVerso = (
    _,
    { response: { fileInfo, extracted, fieldScores, face, ...response }, url, validations },
) => {
    const data: ReturnType<RG.FrenteVerso> = {
        status: "pendingSelfie",
        documentType: "rg",
        extracted,
        face,
        "RG FV": { fileInfo, url },
        validations: {
            face: validations.face,
            name: validations.name,
            expirationDate: validations.expirationDate,
            RGFVProbability: validations.docProbability,
        },
    };
    if (fieldScores) data.fieldScores = fieldScores;
    if (is.BackgroundCheck(response)) {
        data.found = response.found;
        data.passedOn = response.passedOn;
    }
    return data;
};

export const FrenteMaisVerso: RG.FrenteMaisVerso = (old, { response: { fileInfo, ...response }, url, validations }) => {
    const data: ReturnType<RG.FrenteMaisVerso> = {
        status: "pendingSelfie",
        documentType: "rg",
        extracted: "extracted" in response ? response.extracted : "extracted" in old ? old.extracted : null,
        face: "face" in response ? response.face : "face" in old ? old.face : null,
        fieldScores: "fieldScores" in response ? response.fieldScores : "fieldScores" in old ? old.fieldScores : null,
        "RG F": "RG F" in old ? old["RG F"] : ({ fileInfo, url } as any),
        "RG V": "RG V" in old ? old["RG V"] : ({ fileInfo, url } as any),
        validations: {
            face: "face" in old.validations ? old.validations.face : validations.face,
            name: "name" in old.validations ? old.validations.name : validations.name,
            expirationDate:
                "expirationDate" in old.validations ? old.validations.expirationDate : validations.expirationDate,
            RGFProbability:
                "RGFProbability" in old.validations ? old.validations.RGFProbability : validations.docProbability,
            RGVProbability:
                "RGVProbability" in old.validations ? old.validations.RGVProbability : validations.docProbability,
        },
    };
    if (is.BackgroundCheck(old)) {
        data.found = old.found;
        data.passedOn = old.passedOn;
    }
    if (is.BackgroundCheck(response)) {
        data.found = response.found;
        data.passedOn = response.passedOn;
    }
    return data;
};

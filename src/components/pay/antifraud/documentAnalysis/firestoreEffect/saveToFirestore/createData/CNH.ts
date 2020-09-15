import { is } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { CNH } from "./types";

export const Frente: CNH.Frente = (
    _,
    { response: { extracted, face, fileInfo, fieldScores, ...response }, validations, url },
) => {
    const data: ReturnType<CNH.Frente> = {
        status: "pendingSelfie",
        documentType: "cnh",
        extracted,
        face,
        "CNH F": { url, fileInfo },
        validations: {
            face: validations.face,
            name: validations.name,
            expirationDate: validations.expirationDate,
            CNHFProbability: validations.docProbability,
        },
    };
    if (fieldScores) data.fieldScores = fieldScores;
    if (is.BackgroundCheck(response)) {
        data.found = response.found;
        data.passedOn = response.passedOn;
    }
    return data;
};

export const Verso: CNH.Verso = (_, { response: { fileInfo }, validations, url }) => {
    const data: ReturnType<CNH.Verso> = {
        status: "pendingDocument",
        documentType: "cnh",
        docStatus: "pendingCNHF",
        "CNH V": { url, fileInfo },
        validations: {
            CNHVProbability: validations.docProbability,
        },
    };
    return data;
};

export const FrenteVerso: CNH.FrenteVerso = (
    _,
    { response: { extracted, face, fileInfo, fieldScores, ...response }, validations, url },
) => {
    const data: ReturnType<CNH.FrenteVerso> = {
        status: "pendingSelfie",
        documentType: "cnh",
        extracted,
        face,
        "CNH FV": { url, fileInfo },
        validations: {
            face: validations.face,
            name: validations.name,
            expirationDate: validations.expirationDate,
            CNHFVProbability: validations.docProbability,
        },
    };
    if (fieldScores) data.fieldScores = fieldScores;
    if (is.BackgroundCheck(response)) {
        data.found = response.found;
        data.passedOn = response.passedOn;
    }
    return data;
};

export const FrenteMaisVerso: CNH.FrenteMaisVerso = (
    { ["CNH V"]: cnhv, validations: { CNHVProbability } },
    { response: { fileInfo, extracted, fieldScores, face, ...response }, url, validations },
) => {
    const data: ReturnType<CNH.FrenteMaisVerso> = {
        status: "pendingSelfie",
        documentType: "cnh",
        extracted,
        face,
        "CNH V": cnhv,
        "CNH F": { url, fileInfo },
        validations: {
            face: validations.face,
            expirationDate: validations.expirationDate,
            name: validations.name,
            CNHVProbability,
            CNHFProbability: validations.docProbability,
        },
    };
    if (fieldScores) data.fieldScores = fieldScores;
    if (is.BackgroundCheck(response)) {
        data.found = response.found;
        data.passedOn = response.passedOn;
    }
    return data;
};

import { saveSuccessToFirestore, saveFailureToFirestore } from "..";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/common";
import { validator } from "../../main/validator/validator";
import responses from "../../__test_utils__/nextcodeResponses";
import random from "random-types";

const fv = {
    serverTimestamp: jest.fn(() => {
        const now = Date.now();
        const seconds = Math.round(now / 1000);
        const milisseconds = now % 1000;
        const nanosseconds = milisseconds * 1000;
        return { seconds, nanosseconds };
    }),
    arrayUnion: jest.fn((obj: any) => ({ arrayUnion: obj })),
};

const initialCardData: any = {
    status: "pendingDocument",
    added: fv.serverTimestamp(),
    errors: ["errors"],
    antifraudTransaction: "123",
};

let cardSaves = [];

const card = {
    data: jest.fn(() => cardSaves[cardSaves.length - 1] || initialCardData),
    ref: {
        set: jest.fn((newData: any) => {
            cardSaves.push(newData);
            return Promise.resolve();
        }),
        update: jest.fn((newData: any) => {
            return Promise.resolve();
        }),
    },
};

describe("saving antifraud document data to firestore", () => {
    beforeEach(() => {
        cardSaves = [];
        card.data.mockClear();
        card.ref.set.mockClear();
        card.ref.update.mockClear();
        fv.serverTimestamp.mockClear();
        fv.arrayUnion.mockClear();
    });
    it("should save success RGF result to firestore correctly", async () => {
        const validations = validator(card as any, {} as any, responses.RGF as any);
        const result: any = { url: random.word(), response: responses.RGF, validations };
        await saveSuccessToFirestore(card as any, result as any, fv as any);
        expect(card.ref.set).toHaveBeenCalledTimes(1);
        expect(card.ref.set).toHaveBeenLastCalledWith(
            expect.objectContaining({
                ...initialCardData,
                docStatus: "pendingRGV",
                documentType: "rg",
                face: responses.RGF.face,
                "RG F": { url: result.url, fileInfo: responses.RGF.fileInfo },
                validations: {
                    face: validations.face,
                    RGFProbability: validations.docProbability,
                },
            }),
        );
    });
    it("should save success RGV result to firestore correctly", async () => {
        const holder_name = random.phrase();
        const modRGV = { ...responses.RGV };
        modRGV.found.name = holder_name;
        const validations = validator(card as any, { holder_name } as any, modRGV as any);
        const result: any = { url: random.word(), response: modRGV, validations };
        await saveSuccessToFirestore(card as any, result as any, fv as any);
        expect(card.ref.set).toHaveBeenCalledTimes(1);
        expect(card.ref.set).toHaveBeenCalledWith(
            expect.objectContaining({
                ...initialCardData,
                docStatus: "pendingRGF",
                documentType: "rg",
                extracted: modRGV.extracted,
                "RG V": { url: result.url, fileInfo: modRGV.fileInfo },
                validations: {
                    name: validations.name,
                    expirationDate: validations.expirationDate,
                    RGVProbability: validations.docProbability,
                },
                fieldScores: modRGV.fieldScores,
                found: modRGV.found,
                passedOn: modRGV.passedOn,
            }),
        );
    });
    it("should save RGV after RGF correctly", async () => {
        //first RGF
        const RGFvalidations = validator(card as any, {} as any, responses.RGF as any);
        const RGFresult: any = { url: random.word(), response: responses.RGF, validations: RGFvalidations };
        await saveSuccessToFirestore(card as any, RGFresult as any, fv as any);
        //then RGV
        const holder_name = random.phrase();
        const modRGV = { ...responses.RGV };
        modRGV.found.name = holder_name;
        const RGVvalidations = validator(card as any, { holder_name } as any, modRGV as any);
        const RGVresult: any = { url: random.word(), response: modRGV, validations: RGVvalidations };
        await saveSuccessToFirestore(card as any, RGVresult as any, fv as any);
        expect(card.ref.set).toHaveBeenCalledTimes(2);
        expect(card.ref.set).toHaveBeenLastCalledWith(
            expect.objectContaining({
                ...initialCardData,
                status: "pendingSelfie",
                documentType: "rg",
                extracted: modRGV.extracted,
                face: responses.RGF.face,
                "RG V": { url: RGVresult.url, fileInfo: modRGV.fileInfo },
                "RG F": { url: RGFresult.url, fileInfo: responses.RGF.fileInfo },
                validations: {
                    face: RGFvalidations.face,
                    RGFProbability: RGFvalidations.docProbability,
                    name: RGVvalidations.name,
                    expirationDate: RGVvalidations.expirationDate,
                    RGVProbability: RGVvalidations.docProbability,
                },
                fieldScores: modRGV.fieldScores,
                found: modRGV.found,
                passedOn: modRGV.passedOn,
            }),
        );
    });
    it("should save RGF after RGV correctly", async () => {
        //first RGV
        const holder_name = random.phrase();
        const modRGV = { ...responses.RGV };
        modRGV.found.name = holder_name;
        const RGVvalidations = validator(card as any, { holder_name } as any, modRGV as any);
        const RGVresult: any = { url: random.word(), response: modRGV, validations: RGVvalidations };
        await saveSuccessToFirestore(card as any, RGVresult as any, fv as any);
        //then RGF
        const RGFvalidations = validator(card as any, {} as any, responses.RGF as any);
        const RGFresult: any = { url: random.word(), response: responses.RGF, validations: RGFvalidations };
        await saveSuccessToFirestore(card as any, RGFresult as any, fv as any);
        expect(card.ref.set).toHaveBeenCalledTimes(2);
        expect(card.ref.set).toHaveBeenLastCalledWith(
            expect.objectContaining({
                ...initialCardData,
                status: "pendingSelfie",
                documentType: "rg",
                extracted: modRGV.extracted,
                face: responses.RGF.face,
                "RG V": { url: RGVresult.url, fileInfo: modRGV.fileInfo },
                "RG F": { url: RGFresult.url, fileInfo: responses.RGF.fileInfo },
                validations: {
                    face: RGFvalidations.face,
                    RGFProbability: RGFvalidations.docProbability,
                    name: RGVvalidations.name,
                    expirationDate: RGVvalidations.expirationDate,
                    RGVProbability: RGVvalidations.docProbability,
                },
                fieldScores: modRGV.fieldScores,
                found: modRGV.found,
                passedOn: modRGV.passedOn,
            }),
        );
    });
    it("should save CNHFV correctly", async () => {
        const holder_name = random.phrase();
        const modCNHFV = { ...responses.CNHFV };
        modCNHFV.found.name = holder_name;
        const validations = validator(card as any, { holder_name } as any, modCNHFV as any);
        const result: any = { url: random.word(), response: modCNHFV, validations };
        await saveSuccessToFirestore(card as any, result as any, fv as any);
        expect(card.ref.set).toHaveBeenCalledTimes(1);
        expect(card.ref.set).toHaveBeenLastCalledWith(
            expect.objectContaining({
                ...initialCardData,
                status: "pendingSelfie",
                documentType: "cnh",
                extracted: modCNHFV.extracted,
                face: modCNHFV.face,
                "CNH FV": { url: result.url, fileInfo: modCNHFV.fileInfo },
                validations: {
                    face: validations.face,
                    CNHFVProbability: validations.docProbability,
                    name: validations.name,
                    expirationDate: validations.expirationDate,
                },
                fieldScores: modCNHFV.fieldScores,
                found: modCNHFV.found,
                passedOn: modCNHFV.passedOn,
            }),
        );
    });
    it("should save prompt errors correctly", async () => {
        const url = random.phrase();
        const error = prompt.MISSING_EXTRACTED_DATA.withAdditionalData({ response: responses.RGF, url });
        await saveFailureToFirestore(card as any, error, fv as any);
        expect(fv.arrayUnion).toHaveBeenCalledTimes(1);
        expect(fv.arrayUnion).toHaveBeenCalledWith(
            expect.objectContaining({
                timestamp: expect.any(Number),
                error: error.getData(),
            }),
        );
        expect(card.ref.update).toHaveBeenCalledTimes(1);
        expect(card.ref.update).toHaveBeenCalledWith(
            expect.objectContaining({
                errors: {
                    arrayUnion: {
                        timestamp: expect.any(Number),
                        error: error.getData(),
                    },
                },
            }),
        );
    });
    it("should save Error class objects correctly", async () => {
        const error = new Error(random.word());
        await saveFailureToFirestore(card as any, error, fv as any);
        expect(fv.arrayUnion).toHaveBeenCalledTimes(1);
        expect(fv.arrayUnion).toHaveBeenCalledWith(
            expect.objectContaining({
                timestamp: expect.any(Number),
                error: {
                    name: error.name,
                    message: error.message,
                    stack: expect.anything(),
                },
            }),
        );
        expect(card.ref.update).toHaveBeenCalledTimes(1);
        expect(card.ref.update).toHaveBeenCalledWith(
            expect.objectContaining({
                errors: {
                    arrayUnion: {
                        timestamp: expect.any(Number),
                        error: {
                            name: error.name,
                            message: error.message,
                            stack: expect.anything(),
                        },
                    },
                },
            }),
        );
    });
    it("should save serialazable errors", async () => {
        const error = { ...random.object({ depth: 3, exclude: ["undefined"] }), func: () => {}, undefined: undefined };
        const strippedDownError = error;
        delete strippedDownError.func;
        strippedDownError.undefined = null;
        await saveFailureToFirestore(card as any, error, fv as any);
        expect(fv.arrayUnion).toHaveBeenCalledTimes(1);
        expect(fv.arrayUnion).toHaveBeenCalledWith(
            expect.objectContaining({
                timestamp: expect.any(Number),
                error: strippedDownError,
            }),
        );
        expect(card.ref.update).toHaveBeenCalledTimes(1);
        expect(card.ref.update).toHaveBeenCalledWith(
            expect.objectContaining({
                errors: {
                    arrayUnion: {
                        timestamp: expect.any(Number),
                        error: strippedDownError,
                    },
                },
            }),
        );
    });
});

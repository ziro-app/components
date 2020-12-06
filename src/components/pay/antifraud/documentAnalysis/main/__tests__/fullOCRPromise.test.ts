import { fullOCRPromise } from "..";
import { fullOCR, common } from "ziro-messages/dist/src/catalogo/antifraude";
import mockRGF from "../../__test_utils__/nextcodeResponses/RGF.json";
import mockRGV from "../../__test_utils__/nextcodeResponses/RGV.json";
import mockCNHFV from "../../__test_utils__/nextcodeResponses/CNHFV.json";
import mockCNHFV_compres from "../../__test_utils__/nextcodeResponses/CNHFV_compres.json";
import mockCNHF_faceError from "../../__test_utils__/nextcodeResponses/CNHF_faceError.json";
import { analiseDocument } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { createRandomName, createRandomObject, createRandomWord } from "../../__test_utils__/createRandom";

const mockRandomObject = createRandomObject;

jest.mock("@bit/vitorbarbosa19.ziro.pay.next-code", () => {
    return {
        analiseDocument: jest.fn((url: string, token: any) => {
            switch (url) {
                case "RGF":
                    return Promise.resolve(mockRGF);
                case "RGV":
                    return Promise.resolve(mockRGV);
                case "CNHFV":
                    return Promise.resolve(mockCNHFV);
                case "CNHFV_compres":
                    return Promise.resolve(mockCNHFV_compres);
                case "CNHF_faceError":
                    return Promise.resolve(mockCNHF_faceError);
                case "object":
                    return Promise.resolve(mockRandomObject());
                default:
                    return Promise.resolve();
            }
        }),
        is: require("../../../../NextCode/types/typeChecks"),
    };
});

const uploadPicture = jest.fn((str: string) => Promise.resolve(str));

const fbCard = {
    data: jest.fn(),
};

describe("antifraud document analysis main function", () => {
    beforeEach(() => {
        uploadPicture.mockClear();
        //@ts-ignore
        analiseDocument.mockClear();
        fbCard.data.mockClear();
    });
    it("should fail if picture doesnt exist", async () => {
        await expect(fullOCRPromise({} as any)).rejects.toHaveProperty("code", common.prompt.NO_IMAGE.code);
    });
    it("should fail if card doenst exist", async () => {
        fbCard.data.mockReturnValueOnce({});
        const props: any = { picture: "RGF", uploadPicture, source: { token: "token" }, fbCard };
        await expect(fullOCRPromise(props)).rejects.toHaveProperty("code", common.prompt.MISSING_ZOOP_DATA.code);
    });
    it("should call upload picture if picture exists, and send url to next-code", async () => {
        const props: any = { picture: createRandomWord(), uploadPicture, source: { token: createRandomWord() }, zoopCard: {} };
        await fullOCRPromise(props).catch(() => null);
        expect(uploadPicture).toHaveBeenCalledTimes(1);
        expect(uploadPicture).toHaveBeenCalledWith(props.picture);
        expect(analiseDocument).toHaveBeenCalledTimes(1);
        expect(analiseDocument).toHaveBeenCalledWith(props.picture, props.source.token);
    });
    it("should throw when response is empty", async () => {
        const props: any = { picture: "picture", uploadPicture, source: { token: "token" }, zoopCard: {} };
        await expect(fullOCRPromise(props)).rejects.toHaveProperty("code", fullOCR.prompt.UNRECOGNIZED_RESPONSE.code);
    });
    it("should throw when response is random object", async () => {
        const props: any = { picture: "object", uploadPicture, source: { token: "token" }, zoopCard: {} };
        await expect(fullOCRPromise(props)).rejects.toHaveProperty("code", fullOCR.prompt.UNRECOGNIZED_RESPONSE.code);
    });
    it("should throw when response is not a valid document", async () => {
        const props: any = { picture: "CNHFV_compres", uploadPicture, source: { token: "token" }, zoopCard: {} };
        await expect(fullOCRPromise(props)).rejects.toHaveProperty("code", fullOCR.prompt.UNKNOWN_DOCUMENT_TYPE.code);
    });
    it("should pass if response is a valid RGF", async () => {
        fbCard.data.mockReturnValueOnce({});
        const props: any = { picture: "RGF", uploadPicture, source: { token: "token" }, fbCard, zoopCard: {} };
        const result = await fullOCRPromise(props);
        expect(fbCard.data).toHaveBeenCalledTimes(1);
        expect(result.response).toEqual(mockRGF);
        expect(result.url).toBe("RGF");
    });
    it("should pass if response is a valid RGV", async () => {
        fbCard.data.mockReturnValueOnce({});
        const holder_name = createRandomName();
        const mockRGVwithRandomName = { ...mockRGV };
        mockRGVwithRandomName.found.name = holder_name;
        //@ts-ignore
        analiseDocument.mockReturnValueOnce(mockRGVwithRandomName);
        const props: any = { picture: "RGV", uploadPicture, source: { token: "token" }, fbCard, zoopCard: { holder_name } };
        const result = await fullOCRPromise(props);
        expect(fbCard.data).toHaveBeenCalledTimes(1);
        expect(result.response).toEqual(mockRGVwithRandomName);
        expect(result.url).toBe("RGV");
    });
    it("should pass if response is a valid CNHFV", async () => {
        fbCard.data.mockReturnValueOnce({});
        const holder_name = createRandomName();
        const mockCNHFVwithRandomName = { ...mockCNHFV };
        mockCNHFVwithRandomName.found.name = holder_name;
        //@ts-ignore
        analiseDocument.mockReturnValueOnce(mockCNHFVwithRandomName);
        const props: any = { picture: "CNHFV", uploadPicture, source: { token: "token" }, fbCard, zoopCard: { holder_name } };
        const result = await fullOCRPromise(props);
        expect(fbCard.data).toHaveBeenCalledTimes(1);
        expect(result.response).toEqual(mockCNHFVwithRandomName);
        expect(result.url).toBe("CNHFV");
    });
});

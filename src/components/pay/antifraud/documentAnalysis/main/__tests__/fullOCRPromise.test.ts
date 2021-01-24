import { fullOCRPromise } from "..";
import random from "random-types";
import { fullOCR, common } from "ziro-messages/dist/src/catalogo/antifraude";
import { analiseDocument } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import responses from "../../__test_utils__/nextcodeResponses";

jest.mock("@bit/vitorbarbosa19.ziro.pay.next-code", () => {
    return {
        analiseDocument: jest.fn(),
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
        (analiseDocument as any).mockClear();
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
        const picture = random.word();
        const token = random.word();
        const props: any = { picture, uploadPicture, source: { token }, zoopCard: {} };
        await fullOCRPromise(props).catch(() => null);
        expect(uploadPicture).toHaveBeenCalledTimes(1);
        expect(uploadPicture).toHaveBeenCalledWith(picture);
        expect(analiseDocument).toHaveBeenCalledTimes(1);
        expect(analiseDocument).toHaveBeenCalledWith(picture, token);
    });
    it("should throw when response is empty", async () => {
        const picture = random.word();
        const token = random.word();
        const props: any = { picture, uploadPicture, source: { token }, zoopCard: {} };
        await expect(fullOCRPromise(props)).rejects.toHaveProperty("code", fullOCR.prompt.UNRECOGNIZED_RESPONSE.code);
    });
    it("should throw when response is random object", async () => {
        (analiseDocument as jest.Mock).mockReturnValueOnce(random.object({ depth: 1 }));
        const picture = random.word();
        const token = random.word();
        const props: any = { picture, uploadPicture, source: { token }, zoopCard: {} };
        await expect(fullOCRPromise(props)).rejects.toHaveProperty("code", fullOCR.prompt.UNRECOGNIZED_RESPONSE.code);
    });
    it("should throw when response is not a valid document", async () => {
        (analiseDocument as jest.Mock).mockReturnValueOnce(responses.CNHFV_compres);
        const picture = random.word();
        const props: any = { picture, uploadPicture, source: { token: "token" }, zoopCard: {} };
        await expect(fullOCRPromise(props)).rejects.toHaveProperty("code", fullOCR.prompt.UNKNOWN_DOCUMENT_TYPE.code);
    });
    it("should pass if response is a valid RGF", async () => {
        fbCard.data.mockReturnValueOnce({});
        (analiseDocument as jest.Mock).mockReturnValueOnce(responses.RGF);
        const picture = random.word();
        const props: any = { picture, uploadPicture, source: { token: "token" }, fbCard, zoopCard: {} };
        const result = await fullOCRPromise(props);
        expect(fbCard.data).toHaveBeenCalledTimes(1);
        expect(result.response).toEqual(responses.RGF);
        expect(result.url).toBe(picture);
    });
    it("should pass if response is a valid RGV", async () => {
        fbCard.data.mockReturnValueOnce({});
        const holder_name = random.phrase();
        const picture = random.word();
        const RGVwithRandomName = { ...responses.RGV };
        RGVwithRandomName.found.name = holder_name;
        (analiseDocument as any).mockReturnValueOnce(RGVwithRandomName);
        const props: any = { picture, uploadPicture, source: { token: "token" }, fbCard, zoopCard: { holder_name } };
        const result = await fullOCRPromise(props);
        expect(fbCard.data).toHaveBeenCalledTimes(1);
        expect(result.response).toEqual(RGVwithRandomName);
        expect(result.url).toBe(picture);
    });
    it("should pass if response is a valid CNHFV", async () => {
        fbCard.data.mockReturnValueOnce({});
        const holder_name = random.phrase();
        const picture = random.word();
        const CNHFVwithRandomName = { ...responses.CNHFV };
        CNHFVwithRandomName.found.name = holder_name;
        (analiseDocument as any).mockReturnValueOnce(CNHFVwithRandomName);
        const props: any = { picture, uploadPicture, source: { token: "token" }, fbCard, zoopCard: { holder_name } };
        const result = await fullOCRPromise(props);
        expect(fbCard.data).toHaveBeenCalledTimes(1);
        expect(result.response).toEqual(CNHFVwithRandomName);
        expect(result.url).toBe(picture);
    });
});

import { biometry } from "../index";
import { biometry as bio, common } from "ziro-messages/dist/src/catalogo/antifraude";
import { biometry as analise } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { docClassify, is as isV2 } from "@bit/vitorbarbosa19.ziro.pay.next-code-v2";
import responses from "../../__test_utils__/nextCodeResponses";
import random from "random-types";

jest.mock("@bit/vitorbarbosa19.ziro.pay.next-code", () => {
    return {
        biometry: jest.fn(),
        is: require("../../../../NextCode/types/typeChecks"),
    };
});

jest.mock("@bit/vitorbarbosa19.ziro.pay.next-code-v2", () => {
    return {
        docClassify: jest.fn(),
        is: {
            DocType: jest.fn(() => true),
        },
    };
});

const uploadPicture = jest.fn((str: string) => Promise.resolve(str));

const fbCard = {
    data: jest.fn(),
};

const docClassifyResponse = (type = "SELFIE") => Promise.resolve({ data: [{ classification: { type } }] });

const props = (picture = random.word(), token = random.word()) => ({ picture, fbCard, uploadPicture, source: { token } } as any);

const fbCardData = (type: "none" | "CNH F" | "CNH FV" | "RG F" | "RG FV") => {
    const data: any = { status: "pendingSelfie" };
    if (type === "none") return data;
    data.documentType = type.startsWith("CNH") ? "cnh" : "rg";
    data[type] = { url: random.word() };
    return data;
};

describe("selfie analysis main function", () => {
    beforeEach(() => {
        (analise as jest.Mock).mockClear();
        (docClassify as jest.Mock).mockClear();
        ((isV2.DocType as unknown) as jest.Mock).mockClear();
        uploadPicture.mockClear();
        fbCard.data.mockClear();
    });
    it("should throw if there's no picture", async () => {
        await expect(biometry({} as any)).rejects.toHaveProperty("code", common.prompt.NO_IMAGE.code);
    });
    it("should throw if firebase data has unexpected card status", async () => {
        //create vars
        const status = random.word();
        //mock functions
        fbCard.data.mockReturnValueOnce({ status });
        //assertions
        await expect(biometry(props())).rejects.toHaveProperty("code", bio.prompt.UNEXPECTED_CARD_STATUS.code);
    });
    it("should call uploadPicture if picture exists and send url to next-code", async () => {
        //create vars
        const _props = props();
        const _fbCardData = fbCardData("none");
        //mock functions
        fbCard.data.mockReturnValueOnce(_fbCardData);
        //call function
        await biometry(_props).catch(() => null);
        //assertions
        expect(uploadPicture).toHaveBeenCalledTimes(1);
        expect(uploadPicture).toHaveBeenCalledWith(_props.picture);
        expect(docClassify).toHaveBeenCalledTimes(1);
        expect(docClassify).toHaveBeenCalledWith(_props.picture, _props.source.token);
    });
    it("should throw if picture is not selfie", async () => {
        //create vars
        const _props = props();
        const _docClassifyResponse = docClassifyResponse(random.word());
        const _fbCardData = fbCardData("none");
        //mock functions
        (docClassify as jest.Mock).mockReturnValueOnce(_docClassifyResponse);
        fbCard.data.mockReturnValueOnce(_fbCardData);
        //assertions
        await expect(biometry(_props)).rejects.toHaveProperty("code", bio.prompt.DOC_INSTEAD_SELFIE.code);
    });
    const types = ["CNH F", "CNH FV", "RG F", "RG FV"] as const;
    types.map((type) =>
        it(`should use ${type} url when doctype is ${type}`, async () => {
            //create var
            const _props = props();
            const _docClassifyResponse = docClassifyResponse();
            const _fbCardData = fbCardData(type);
            //mock functions
            (docClassify as jest.Mock).mockReturnValueOnce(_docClassifyResponse);
            fbCard.data.mockReturnValueOnce(_fbCardData);
            //call
            await biometry(_props).catch(() => null);
            //assertions
            expect(analise).toHaveBeenCalledTimes(1);
            expect(analise).toHaveBeenCalledWith(_fbCardData[type].url, _props.picture, _props.source.token);
        }),
    );
    const _responses = [
        ["null", null],
        ["empty", {}],
        ["random", random.object({ depth: 1 })],
    ] as const;
    _responses.map(([type, response]) =>
        it(`should throw if response is ${type}`, async () => {
            //create var
            const _props = props();
            const _docClassifyResponse = docClassifyResponse();
            const _fbCardData = fbCardData("CNH F");
            //mock functions
            (docClassify as jest.Mock).mockReturnValueOnce(_docClassifyResponse);
            fbCard.data.mockReturnValueOnce(_fbCardData);
            (analise as jest.Mock).mockReturnValueOnce(response);
            //assertion
            await expect(biometry(_props)).rejects.toHaveProperty("code", bio.prompt.UNRECOGNIZED_RESPONSE.code);
        }),
    );
    it("should throw on blank image", async () => {
        //create var
        const _props = props();
        const _docClassifyResponse = docClassifyResponse();
        const _fbCardData = fbCardData("CNH F");
        //mock functions
        (docClassify as jest.Mock).mockReturnValueOnce(_docClassifyResponse);
        fbCard.data.mockReturnValueOnce(_fbCardData);
        (analise as jest.Mock).mockReturnValueOnce(responses.BlankImage);
        //assertion
        await expect(biometry(_props)).rejects.toHaveProperty("code", bio.prompt.FAILED_COMPARISON.code);
    });
    it("should throw on wrong face", async () => {
        //create var
        const _props = props();
        const _docClassifyResponse = docClassifyResponse();
        const _fbCardData = fbCardData("CNH F");
        //mock functions
        (docClassify as jest.Mock).mockReturnValueOnce(_docClassifyResponse);
        fbCard.data.mockReturnValueOnce(_fbCardData);
        (analise as jest.Mock).mockReturnValueOnce(responses.WrongFace);
        //assertion
        await expect(biometry(_props)).rejects.toHaveProperty("code", bio.prompt.NOT_IDENTICAL.code);
    });
    it("should pass on right face", async () => {
        //create var
        const _props = props();
        const _docClassifyResponse = docClassifyResponse();
        const _fbCardData = fbCardData("CNH F");
        //mock functions
        (docClassify as jest.Mock).mockReturnValueOnce(_docClassifyResponse);
        fbCard.data.mockReturnValueOnce(_fbCardData);
        (analise as jest.Mock).mockReturnValueOnce(responses.RightFace);
        //assertion
        await expect(biometry(_props)).resolves.toHaveProperty("response");
    });
});

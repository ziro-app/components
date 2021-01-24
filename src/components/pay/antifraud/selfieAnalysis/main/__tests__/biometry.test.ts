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
        is: require("../../../../NextCodeV2/types/typeChecks"),
    };
});

const uploadPicture = jest.fn((str: string) => Promise.resolve(str));

const fbCard = {
    data: jest.fn(),
};

describe("selfie analysis main function", () => {
    it("should throw if there's no picture", async () => {
        await expect(biometry({} as any)).rejects.toHaveProperty("code", common.prompt.NO_IMAGE.code);
    });
    it("should throw if firebase data has unexpected card status", async () => {
        const picture = random.word();
        const status = random.word();
        fbCard.data.mockReturnValueOnce({ status });
        const props: any = { picture, fbCard, uploadPicture };
        await expect(biometry(props)).rejects.toHaveProperty("code", bio.prompt.UNEXPECTED_CARD_STATUS.code);
    });
    it("should call uploadPicture if picture exists and send url to next-code", async () => {
        const picture = random.word();
        const token = random.word();
        fbCard.data.mockReturnValueOnce({ status: "pendingSelfie" });
        const props: any = { picture, fbCard, uploadPicture, source: { token } };
        await biometry(props).catch(() => null);
        expect(uploadPicture).toHaveBeenCalledTimes(1);
        expect(uploadPicture).toHaveBeenCalledWith(picture);
        expect(docClassify).toHaveBeenCalledTimes(1);
        expect(docClassify).toHaveBeenCalledWith(picture, token);
    });
});

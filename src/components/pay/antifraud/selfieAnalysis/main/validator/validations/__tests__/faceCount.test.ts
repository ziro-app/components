import { faceCount } from "../faceCount";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";
import * as common from "ziro-messages/dist/src/catalogo/antifraude/common";
import random from "random-types";

describe("faceCount validation", () => {
    it("should fail if response is null", () => {
        const result = faceCount(null as any, null as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], common.prompt.MISSING_EXTRACTED_DATA.code);
    });
    it("should fail if response is empty", () => {
        const result = faceCount(null as any, {} as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], common.prompt.MISSING_EXTRACTED_DATA.code);
    });
    it("should fail if response is random", () => {
        const response: any = random.object({ depth: 1 });
        const result = faceCount(null as any, response);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], common.prompt.MISSING_EXTRACTED_DATA.code);
    });
    it("should fail if faceCount is empty", () => {
        const response: any = { faceCount: {} };
        const result = faceCount(null as any, response);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], common.prompt.MISSING_EXTRACTED_DATA.code);
    });
    it("should fail if img1 has no face", () => {
        const response: any = { faceCount: { img1: 0, img2: 1 } };
        const result = faceCount(null as any, response);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.DOC_NO_FACE.code);
        expect(result).toHaveProperty(["reason", "additionalData"], response);
    });
    it("should fail if img1 has more than one face", () => {
        const img1 = random.integer({ min: 2 });
        const response: any = { faceCount: { img1, img2: 1 } };
        const result = faceCount(null as any, response);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.DOC_TOO_MANY_FACES.code);
        expect(result).toHaveProperty(["reason", "additionalData"], response);
    });
    it("should fail if img2 has no face", () => {
        const response: any = { faceCount: { img1: 1, img2: 0 } };
        const result = faceCount(null as any, response);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.SELFIE_NO_FACE.code);
        expect(result).toHaveProperty(["reason", "additionalData"], response);
    });
    it("should fail if img2 has more than one face", () => {
        const img2 = random.integer({ min: 2 });
        const response: any = { faceCount: { img1: 1, img2 } };
        const result = faceCount(null as any, response);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.SELFIE_TOO_MANY_FACES.code);
        expect(result).toHaveProperty(["reason", "additionalData"], response);
    });
    it("should pass if both have one face", () => {
        const response: any = { faceCount: { img1: 1, img2: 1 } };
        const result = faceCount(null as any, response);
        expect(result).toHaveProperty("passed", true);
    });
});

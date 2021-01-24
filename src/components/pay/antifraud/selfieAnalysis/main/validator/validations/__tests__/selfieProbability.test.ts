import { selfieProbability } from "../selfieProbability";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";
import * as common from "ziro-messages/dist/src/catalogo/antifraude/common";
import random from "random-types";

describe("selfie probability validation", () => {
    it("should fail if response is null", () => {
        const result = selfieProbability(null as any, null as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], common.prompt.MISSING_EXTRACTED_DATA.code);
    });
    it("should fail if response is empty", () => {
        const result = selfieProbability(null as any, {} as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], common.prompt.MISSING_EXTRACTED_DATA.code);
    });
    it("should fail if response is random", () => {
        const response: any = random.object({ depth: 1 });
        const result = selfieProbability(null as any, response);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], common.prompt.MISSING_EXTRACTED_DATA.code);
    });
    it("should fail if confidence is lower than 0.6", () => {
        const confidence = random.decimal({ max: 0.59 });
        const response: any = { confidence };
        const result = selfieProbability(null as any, response);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.CONFIDENCE_UNDER_60.code);
        expect(result).toHaveProperty(["reason", "additionalData"], response);
    });
    it("should fail if confidence is lower than 0.9", () => {
        const confidence = random.decimal({ min: 0.6, max: 0.89 });
        const response: any = { confidence };
        const result = selfieProbability(null as any, response);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.CONFIDENCE_UNDER_90.code);
        expect(result).toHaveProperty(["reason", "additionalData"], response);
    });
    it("should pass if confidence is greater than 0.9", () => {
        const confidence = random.decimal({ min: 0.9 });
        const result = selfieProbability(null as any, { confidence } as any);
        expect(result).toHaveProperty("passed", true);
    });
});

import { docProbability } from "../docProbability";
import * as c from "ziro-messages/dist/src/catalogo/antifraude/common";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR";
import random from "random-types";

describe("antifraud docProbability validation", () => {
    it("should fail if response is null", () => {
        const result = docProbability(null as any, null as any, null as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", c.prompt.MISSING_EXTRACTED_DATA);
    });
    it("should fail if response is empty", () => {
        const result = docProbability(null as any, null as any, {} as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", c.prompt.MISSING_EXTRACTED_DATA);
    });
    it("should fail if response is random", () => {
        const response: any = random.object({ depth: 1 });
        const result = docProbability(null as any, null as any, response);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", c.prompt.MISSING_EXTRACTED_DATA);
    });
    it("should fail if classifiedAs is missing", () => {
        const result = docProbability(null as any, null as any, { fileInfo: {} } as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", c.prompt.MISSING_EXTRACTED_DATA);
    });
    it("should fail if probability is missing", () => {
        const result = docProbability(null as any, null as any, { fileInfo: { classifiedAs: {} } } as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", c.prompt.MISSING_EXTRACTED_DATA);
    });
    it("should fail if probability is under 60", () => {
        const probability = random.decimal({ max: 0.59 });
        const result = docProbability(null as any, null as any, { fileInfo: { classifiedAs: { probability } } } as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.PROBABILITY_UNDER_60.code);
        expect(result).toHaveProperty(["reason", "additionalData", "probability"], probability);
    });
    it("should fail if probability is under 90", () => {
        const probability = random.decimal({ min: 0.6, max: 0.89 });
        const result = docProbability(null as any, null as any, { fileInfo: { classifiedAs: { probability } } } as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.PROBABILITY_UNDER_90.code);
        expect(result).toHaveProperty(["reason", "additionalData", "probability"], probability);
    });
    it("should pass if probability is over 90", () => {
        const probability = random.decimal({ min: 0.9 });
        const result = docProbability(null as any, null as any, { fileInfo: { classifiedAs: { probability } } } as any);
        expect(result).toHaveProperty("passed", true);
    });
});

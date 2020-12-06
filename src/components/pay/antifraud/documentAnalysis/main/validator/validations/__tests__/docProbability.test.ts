import { docProbability } from "../docProbability";
import * as c from "ziro-messages/dist/src/catalogo/antifraude/common";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR";

describe("antifraud docProbability validation", () => {
    it("should fail if fileinfo is missing", () => {
        const result = docProbability(null as any, null as any, {} as any);
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
        const result = docProbability(null as any, null as any, { fileInfo: { classifiedAs: { probability: 0.5 } } } as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.PROBABILITY_UNDER_60.code);
        expect(result).toHaveProperty(["reason", "additionalData", "probability"], 0.5);
    });
    it("should fail if probability is under 90", () => {
        const result = docProbability(null as any, null as any, { fileInfo: { classifiedAs: { probability: 0.7 } } } as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.PROBABILITY_UNDER_90.code);
        expect(result).toHaveProperty(["reason", "additionalData", "probability"], 0.7);
    });
    it("should pass if probability is over 90", () => {
        const result = docProbability(null as any, null as any, { fileInfo: { classifiedAs: { probability: 0.91 } } } as any);
        expect(result).toHaveProperty("passed", true);
    });
});

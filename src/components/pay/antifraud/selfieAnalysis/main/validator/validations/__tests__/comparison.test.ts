import { comparison } from "../comparison";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";
import * as common from "ziro-messages/dist/src/catalogo/antifraude/common";
import random from "random-types";

describe("comparison selfie analysis validation", () => {
    it("should fail if response doesnt exist", () => {
        const result = comparison(null as any, null as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], common.prompt.MISSING_EXTRACTED_DATA.code);
    });
    it("should fail if response is blank", () => {
        const result = comparison(null as any, {} as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], common.prompt.MISSING_EXTRACTED_DATA.code);
    });
    it("should fail if response is random", () => {
        const response: any = random.object({ depth: 1 });
        const result = comparison(null as any, response);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], common.prompt.MISSING_EXTRACTED_DATA.code);
    });
    it("should fail if response has no compared variable", () => {
        const result = comparison(null as any, { success: true } as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], common.prompt.MISSING_EXTRACTED_DATA.code);
    });
    it("should fail if respones has no success variable", () => {
        const result = comparison(null as any, { compared: true } as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], common.prompt.MISSING_EXTRACTED_DATA.code);
    });
    it("should fail if compared variable is false", () => {
        const result = comparison(null as any, { success: true, compared: false } as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.FAILED_COMPARISON.code);
    });
    it("should fail if success variable is false", () => {
        const result = comparison(null as any, { success: false, compared: true } as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.FAILED_COMPARISON.code);
    });
    it("should pass if both compared and success are true", () => {
        const result = comparison(null as any, { success: true, compared: true } as any);
        expect(result).toHaveProperty("passed", true);
    });
});

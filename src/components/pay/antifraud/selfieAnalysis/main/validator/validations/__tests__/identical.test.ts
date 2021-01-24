import { identical } from "../identical";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";
import * as common from "ziro-messages/dist/src/catalogo/antifraude/common";
import random from "random-types";

describe("identical selfie validation", () => {
    it("should fail if response is null", () => {
        const result = identical(null as any, null as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], common.prompt.MISSING_EXTRACTED_DATA.code);
    });
    it("should fail if response is empty", () => {
        const result = identical(null as any, {} as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], common.prompt.MISSING_EXTRACTED_DATA.code);
    });
    it("should fail if response is random", () => {
        const response: any = random.object({ depth: 1 });
        const result = identical(null as any, response);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], common.prompt.MISSING_EXTRACTED_DATA.code);
    });
    it("should fail if isIdentical is false", () => {
        const result = identical(null as any, { isIdentical: false } as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.NOT_IDENTICAL.code);
    });
    it("should pass if isIdentical is true", () => {
        const result = identical(null as any, { isIdentical: true } as any);
        expect(result).toHaveProperty("passed", true);
    });
});

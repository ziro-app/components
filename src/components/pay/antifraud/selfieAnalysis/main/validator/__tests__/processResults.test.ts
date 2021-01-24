import { processResults } from "../processResults";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";
import * as common from "ziro-messages/dist/src/catalogo/antifraude/common";

describe("process results of selfie analysis", () => {
    it("should throw messages that are set to throw and pass message that are not", () => {
        const _processResults = (reason: any) => processResults(null as any, null as any, { result: { passed: false, reason } } as any);

        //should throw
        expect(() => _processResults(prompt.CONFIDENCE_UNDER_60)).toThrow();
        expect(() => _processResults(prompt.DOC_NO_FACE)).toThrow();
        expect(() => _processResults(prompt.DOC_TOO_MANY_FACES)).toThrow();
        expect(() => _processResults(prompt.SELFIE_NO_FACE)).toThrow();
        expect(() => _processResults(prompt.SELFIE_TOO_MANY_FACES)).toThrow();
        expect(() => _processResults(prompt.FAILED_COMPARISON)).toThrow();
        expect(() => _processResults(prompt.NOT_IDENTICAL)).toThrow();
        expect(() => _processResults(common.prompt.MISSING_EXTRACTED_DATA)).toThrow();

        //should not throw
        expect(() => _processResults(prompt.CONFIDENCE_UNDER_90)).not.toThrow();
    });
});

import { processResults } from "../processResults";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR";
import * as c from "ziro-messages/dist/src/catalogo/antifraude/common";

describe("process results of antifraud validation", () => {
    it("should throw messages that are set to throw and pass message that are not", () => {
        const _processResults = (reason: any) => processResults(null as any, null as any, { result: { passed: false, reason } } as any);

        //should throw
        expect(() => _processResults(prompt.CANNOT_ANALYZE_FACE)).toThrow();
        expect(() => _processResults(prompt.NO_FACE_OBJECT)).toThrow();
        expect(() => _processResults(prompt.FIRST_NAME_MISMATCH)).toThrow();
        expect(() => _processResults(prompt.SAME_DOC_CNHV)).toThrow();
        expect(() => _processResults(prompt.SAME_DOC_RGF)).toThrow();
        expect(() => _processResults(prompt.SAME_DOC_RGV)).toThrow();
        expect(() => _processResults(prompt.PROBABILITY_UNDER_60)).toThrow();
        expect(() => _processResults(c.prompt.MISSING_EXTRACTED_DATA)).toThrow();

        //should not throw
        expect(() => _processResults(prompt.EXPIRED_DOC)).not.toThrow();
        expect(() => _processResults(prompt.LAST_NAME_MISMATCH)).not.toThrow();
        expect(() => _processResults(prompt.MISSING_EXP_DATE)).not.toThrow();
        expect(() => _processResults(prompt.PROBABILITY_UNDER_90)).not.toThrow();
        expect(() => _processResults(prompt.UNRECOGNIZED_FACE_OBJECT)).not.toThrow();
    });
});

import * as c from "ziro-messages/dist/src/catalogo/antifraude/common";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR";
import { expirationDate } from "../expirationDate";
import RGF from "../../../../__test_utils__/nextcodeResponses/RGF.json";
import RGV from "../../../../__test_utils__/nextcodeResponses/RGV.json";
import CNHFV from "../../../../__test_utils__/nextcodeResponses/CNHFV.json";

describe("expirationDate antifraud validation", () => {
    it("should not apply if document is RGF", () => {
        const result = expirationDate(null as any, null as any, RGF as any);
        expect(result).toHaveProperty("passed", "dontApply");
    });
    it("should fail if response doesnt contain extracted field", () => {
        const result = expirationDate(null as any, null as any, {} as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", c.prompt.MISSING_EXTRACTED_DATA);
    });
    it("should fail if RGV expDate is blank", () => {
        const modRGV = { ...RGV };
        modRGV.extracted.dataExpedicao = "";
        const result = expirationDate(null as any, null as any, modRGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", prompt.MISSING_EXP_DATE);
    });
    it("should fail if CNHFV expData is blank", () => {
        const modCNHFV = { ...CNHFV };
        modCNHFV.extracted.dataEmissao = "";
        const result = expirationDate(null as any, null as any, modCNHFV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", prompt.MISSING_EXP_DATE);
    });
    it("should fail if RGV is more than 10 years old", () => {
        const modRGV = { ...RGV };
        modRGV.extracted.dataExpedicao = "01/01/2010";
        const result = expirationDate(null as any, null as any, modRGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.EXPIRED_DOC.code);
        expect(result).toHaveProperty(["reason", "additionalData", "threshold"], 10);
    });
    it("should pass if RGV is less than 10 years old", () => {
        const modRGV = { ...RGV };
        modRGV.extracted.dataExpedicao = "01/01/2015";
        const result = expirationDate(null as any, null as any, modRGV as any);
        expect(result).toHaveProperty("passed", true);
    });
    it("should fail if CNHFV is more than 10 years old", () => {
        const modCNHFV = { ...CNHFV };
        modCNHFV.extracted.dataEmissao = "01/01/2010";
        const result = expirationDate(null as any, null as any, modCNHFV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.EXPIRED_DOC.code);
        expect(result).toHaveProperty(["reason", "additionalData", "threshold"], 10);
    });
    it("should pass if CNHFV is less than 10 years old", () => {
        const modCNHFV = { ...CNHFV };
        modCNHFV.extracted.dataEmissao = "01/01/2015";
        const result = expirationDate(null as any, null as any, modCNHFV as any);
        expect(result).toHaveProperty("passed", true);
    });
});

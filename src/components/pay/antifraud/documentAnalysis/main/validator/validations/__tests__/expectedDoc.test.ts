import { expectedDoc } from "../expectedDoc";
import { prompt, FullOCRPromptMessage } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR";
import CNHFV from "../../../../__test_utils__/nextcodeResponses/CNHFV.json";
import CNHF from "../../../../__test_utils__/nextcodeResponses/CNHF_faceError.json";
import RGV from "../../../../__test_utils__/nextcodeResponses/RGV.json";
import RGF from "../../../../__test_utils__/nextcodeResponses/RGF.json";

describe("antifraud expectedDoc validation", () => {
    it("should not apply if document is CNHFV", () => {
        const result = expectedDoc(null as any, null as any, CNHFV as any);
        expect(result).toHaveProperty("passed", "dontApply");
    });
    it("should not apply if document is CNHF", () => {
        const result = expectedDoc(null as any, null as any, CNHF as any);
        expect(result).toHaveProperty("passed", "dontApply");
    });
    it("should not apply if firebase has no docStatus", () => {
        const result = expectedDoc({} as any, null as any, {} as any);
        expect(result).toHaveProperty("passed", "dontApply");
    });
    it("should fail if docStatus is pendingRGF and user send RGV", () => {
        const result = expectedDoc({ docStatus: "pendingRGF" } as any, null as any, RGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", prompt.SAME_DOC_RGV);
    });
    it("should fail if docStatus is pendingRGV and user send RGF", () => {
        const result = expectedDoc({ docStatus: "pendingRGV" } as any, null as any, RGF as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", prompt.SAME_DOC_RGF);
    });
    it("should pass if docStatus is pendingRGF and user send RGF", () => {
        const result = expectedDoc({ docStatus: "pendingRGF" } as any, null as any, RGF as any);
        expect(result).toHaveProperty("passed", true);
    });
    it("should pass if docStatus is pendingRGV and user send RGV", () => {
        const result = expectedDoc({ docStatus: "pendingRGV" } as any, null as any, RGV as any);
        expect(result).toHaveProperty("passed", true);
    });
});

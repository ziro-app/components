import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR";
import { face } from "../face";
import RGV from "../../../../__test_utils__/nextcodeResponses/RGV.json";
import RGF from "../../../../__test_utils__/nextcodeResponses/RGF.json";
import CNHF_ERROR_FACE from "../../../../__test_utils__/nextcodeResponses/CNHF_faceError.json";
import CNHFV from "../../../../__test_utils__/nextcodeResponses/CNHFV.json";

describe("face antifraud validation", () => {
    it("should not apply to RGV", () => {
        const result = face(null as any, null as any, RGV as any);
        expect(result).toHaveProperty("passed", "dontApply");
    });
    it("should fail if no face object was provided", () => {
        const result = face(null as any, null as any, {} as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", prompt.NO_FACE_OBJECT);
    });
    it("should fail if face object has error", () => {
        const result = face(null as any, null as any, CNHF_ERROR_FACE as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.CANNOT_ANALYZE_FACE.code);
        expect(result).toHaveProperty(["reason", "additionalData", "face"], CNHF_ERROR_FACE.face);
    });
    it("should pass if RGF have a valid face object", () => {
        const result = face(null as any, null as any, RGF as any);
        expect(result).toHaveProperty("passed", true);
    });
    it("should pass if CNHFV have a valid face object", () => {
        const result = face(null as any, null as any, CNHFV as any);
        expect(result).toHaveProperty("passed", true);
    });
});

import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR";
import { face } from "../face";
import responses from "../../../../__test_utils__/nextcodeResponses";

describe("face antifraud validation", () => {
    it("should not apply to RGV", () => {
        const result = face(null as any, null as any, responses.RGV as any);
        expect(result).toHaveProperty("passed", "dontApply");
    });
    it("should fail if no face object was provided", () => {
        const result = face(null as any, null as any, {} as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", prompt.NO_FACE_OBJECT);
    });
    it("should fail if face object has error", () => {
        const result = face(null as any, null as any, responses.CNHF_faceError as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.CANNOT_ANALYZE_FACE.code);
        expect(result).toHaveProperty(["reason", "additionalData", "face"], responses.CNHF_faceError.face);
    });
    it("should pass if RGF have a valid face object", () => {
        const result = face(null as any, null as any, responses.RGF as any);
        expect(result).toHaveProperty("passed", true);
    });
    it("should pass if CNHFV have a valid face object", () => {
        const result = face(null as any, null as any, responses.CNHFV as any);
        expect(result).toHaveProperty("passed", true);
    });
});

import { validator } from "../validator";
import responses from "../../../__test_utils__/nextCodeResponses";
import random from "random-types";

describe("selfie analysis validator", () => {
    it("should validate correctly null response", () => {
        const result = validator(null as any, null as any);
        expect(result).toHaveProperty(["comparison", "passed"], false);
        expect(result).toHaveProperty(["faceCount", "passed"], false);
        expect(result).toHaveProperty(["identical", "passed"], false);
        expect(result).toHaveProperty(["selfieProbability", "passed"], false);
    });
    it("should validate correctly empty response", () => {
        const result = validator(null as any, {} as any);
        expect(result).toHaveProperty(["comparison", "passed"], false);
        expect(result).toHaveProperty(["faceCount", "passed"], false);
        expect(result).toHaveProperty(["identical", "passed"], false);
        expect(result).toHaveProperty(["selfieProbability", "passed"], false);
    });
    it("should validate correctly random response", () => {
        const response: any = random.object({ depth: 1 });
        const result = validator(null as any, response);
        expect(result).toHaveProperty(["comparison", "passed"], false);
        expect(result).toHaveProperty(["faceCount", "passed"], false);
        expect(result).toHaveProperty(["identical", "passed"], false);
        expect(result).toHaveProperty(["selfieProbability", "passed"], false);
    });
    it("should validate correctly blank image", () => {
        const result = validator(null as any, responses.BlankImage as any);
        expect(result).toHaveProperty(["comparison", "passed"], false);
        expect(result).toHaveProperty(["faceCount", "passed"], false);
        expect(result).toHaveProperty(["identical", "passed"], false);
        expect(result).toHaveProperty(["selfieProbability", "passed"], false);
    });
    it("should validate correctly wrong face", () => {
        const result = validator(null as any, responses.WrongFace as any);
        expect(result).toHaveProperty(["comparison", "passed"], true);
        expect(result).toHaveProperty(["faceCount", "passed"], true);
        expect(result).toHaveProperty(["identical", "passed"], false);
        expect(result).toHaveProperty(["selfieProbability", "passed"], true);
    });
    it("should validate correctly right face", () => {
        const result = validator(null as any, responses.RightFace as any);
        expect(result).toHaveProperty(["comparison", "passed"], true);
        expect(result).toHaveProperty(["faceCount", "passed"], true);
        expect(result).toHaveProperty(["identical", "passed"], true);
        expect(result).toHaveProperty(["selfieProbability", "passed"], true);
    });
});

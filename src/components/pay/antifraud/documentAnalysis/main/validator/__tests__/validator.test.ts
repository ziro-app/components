import { validator } from "../validator";
import random from "random-types";
import responses from "../../../__test_utils__/nextcodeResponses";

describe("antifraud document validator", () => {
    it("should validate correct RGF", () => {
        const results1 = validator({} as any, {} as any, responses.RGF as any);
        expect(results1).toHaveProperty(["docProbability", "passed"], true);
        expect(results1).toHaveProperty(["face", "passed"], true);
        expect(results1).not.toHaveProperty("expectedDoc");
        expect(results1).not.toHaveProperty("expirationDate");
        expect(results1).not.toHaveProperty("name");

        const results2 = validator({ docStatus: "pendingRGF" } as any, {} as any, responses.RGF as any);
        expect(results2).toHaveProperty(["docProbability", "passed"], true);
        expect(results2).toHaveProperty(["face", "passed"], true);
        expect(results2).toHaveProperty(["expectedDoc", "passed"], true);
        expect(results2).not.toHaveProperty("expirationDate");
        expect(results2).not.toHaveProperty("name");

        const results3 = validator({ docStatus: "pendingRGV" } as any, {} as any, responses.RGF as any);
        expect(results3).toHaveProperty(["docProbability", "passed"], true);
        expect(results3).toHaveProperty(["face", "passed"], true);
        expect(results3).toHaveProperty(["expectedDoc", "passed"], false);
        expect(results3).not.toHaveProperty("expirationDate");
        expect(results3).not.toHaveProperty("name");
    });
    it("should validate correct RGV", () => {
        const holder_name = random.phrase();
        const modRGV = { ...responses.RGV };
        modRGV.found.name = holder_name;

        const results1 = validator({} as any, { holder_name } as any, modRGV as any);
        expect(results1).toHaveProperty(["docProbability", "passed"], true);
        expect(results1).toHaveProperty(["expirationDate", "passed"], true);
        expect(results1).toHaveProperty(["name", "passed"], true);
        expect(results1).not.toHaveProperty("expectedDoc");
        expect(results1).not.toHaveProperty("face");

        const results2 = validator({ docStatus: "pendingRGV" } as any, { holder_name } as any, modRGV as any);
        expect(results2).toHaveProperty(["docProbability", "passed"], true);
        expect(results2).toHaveProperty(["expirationDate", "passed"], true);
        expect(results2).toHaveProperty(["name", "passed"], true);
        expect(results2).toHaveProperty(["expectedDoc", "passed"], true);
        expect(results2).not.toHaveProperty("face");

        const results3 = validator({ docStatus: "pendingRGF" } as any, { holder_name } as any, modRGV as any);
        expect(results3).toHaveProperty(["docProbability", "passed"], true);
        expect(results3).toHaveProperty(["expirationDate", "passed"], true);
        expect(results3).toHaveProperty(["name", "passed"], true);
        expect(results3).toHaveProperty(["expectedDoc", "passed"], false);
        expect(results3).not.toHaveProperty("face");
    });
    it("should validate correct CNHFV", () => {
        const holder_name = random.phrase();
        const modCNHFV = { ...responses.CNHFV };
        modCNHFV.found.name = holder_name;

        const results = validator({} as any, { holder_name } as any, modCNHFV as any);
        expect(results).toHaveProperty(["docProbability", "passed"], true);
        expect(results).toHaveProperty(["expirationDate", "passed"], true);
        expect(results).toHaveProperty(["name", "passed"], true);
        expect(results).toHaveProperty(["face", "passed"], true);
        expect(results).not.toHaveProperty("expectedDoc");
    });
});

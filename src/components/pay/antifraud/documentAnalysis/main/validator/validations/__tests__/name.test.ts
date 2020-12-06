import { prompt, FullOCRPromptMessage } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR";
import { prompt as cprompt } from "ziro-messages/dist/src/catalogo/antifraude/common";
import { name } from "../name";
import RGF from "../../../../__test_utils__/nextcodeResponses/RGF.json";
import RGV from "../../../../__test_utils__/nextcodeResponses/RGV.json";
import { createRandomName } from "../../../../__test_utils__/createRandom";

describe("name antifraud validation", () => {
    it("should not apply if document is RGF", () => {
        const result = name(null as any, {} as any, RGF as any);
        expect(result).toHaveProperty("passed", "dontApply");
    });
    it("should fail if extracted is missing", () => {
        const result = name(null as any, {} as any, {} as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", cprompt.MISSING_EXTRACTED_DATA);
    });
    it("should fail if holder_name is missing", () => {
        const result = name(null as any, {} as any, RGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", cprompt.MISSING_EXTRACTED_DATA);
    });
    it("should use found name if available", () => {
        const modRGV = { ...RGV };
        const randomName = createRandomName();
        modRGV.found.name = randomName;
        const result = name(null as any, { holder_name: randomName } as any, modRGV as any);
        expect(result).toHaveProperty("passed", true);
    });
    it("should use extracted if found not available", () => {
        const modRGV = { ...RGV };
        const randomName = createRandomName();
        delete modRGV.found;
        modRGV.extracted.nome = randomName;
        const result = name(null as any, { holder_name: randomName } as any, modRGV as any);
        expect(result).toHaveProperty("passed", true);
    });
    it("should fail if first names are different", () => {
        const modRGV = { ...RGV };
        const [firstName1, lastName1] = createRandomName().split(" ");
        const [firstName2] = createRandomName().split(" ");
        const holder_name = firstName1 + " " + lastName1;
        const docName = firstName2 + " " + lastName1;
        modRGV.found.name = docName;
        const result = name(null as any, { holder_name } as any, modRGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.FIRST_NAME_MISMATCH.code);
        expect(result).toHaveProperty(["reason", "additionalData", "holder_name"], holder_name);
        expect(result).toHaveProperty(["reason", "additionalData", "docName"], docName);
    });
    it("should fail if last names are different", () => {
        const modRGV = { ...RGV };
        const [firstName1, lastName1] = createRandomName().split(" ");
        const [, lastName2] = createRandomName().split(" ");
        const holder_name = firstName1 + " " + lastName1;
        const docName = firstName1 + " " + lastName2;
        modRGV.found.name = docName;
        const result = name(null as any, { holder_name } as any, modRGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.LAST_NAME_MISMATCH.code);
        expect(result).toHaveProperty(["reason", "additionalData", "holder_name"], holder_name);
        expect(result).toHaveProperty(["reason", "additionalData", "docName"], docName);
    });
    it("should fail if holder_name has only one name", () => {
        const modRGV = { ...RGV };
        const [firstName1, lastName1] = createRandomName().split(" ");
        const holder_name = firstName1;
        const docName = firstName1 + " " + lastName1;
        modRGV.found.name = docName;
        const result = name(null as any, { holder_name } as any, modRGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", cprompt.MISSING_EXTRACTED_DATA);
    });
    it("should fail if holder_name's first name is less than 3 chars", () => {
        const modRGV = { ...RGV };
        const [firstName1, lastName1] = createRandomName().split(" ");
        const [firstName2, lastName2] = createRandomName(2).split(" ");
        const holder_name = firstName2 + " " + lastName1;
        const docName = firstName1 + " " + lastName1;
        modRGV.found.name = docName;
        const result = name(null as any, { holder_name } as any, modRGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", cprompt.MISSING_EXTRACTED_DATA);
    });
    it("should fail if docName has only one name", () => {
        const modRGV = { ...RGV };
        const [firstName1, lastName1] = createRandomName().split(" ");
        const docName = firstName1;
        const holder_name = firstName1 + " " + lastName1;
        modRGV.found.name = docName;
        const result = name(null as any, { holder_name } as any, modRGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", cprompt.MISSING_EXTRACTED_DATA);
    });
    it("should fail if docName's first name is less than 3 chars", () => {
        const modRGV = { ...RGV };
        const [firstName1, lastName1] = createRandomName().split(" ");
        const [firstName2, lastName2] = createRandomName(2).split(" ");
        const holder_name = firstName1 + " " + lastName1;
        const docName = firstName2 + " " + lastName1;
        modRGV.found.name = docName;
        const result = name(null as any, { holder_name } as any, modRGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", cprompt.MISSING_EXTRACTED_DATA);
    });
});

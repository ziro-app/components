import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR";
import { prompt as cprompt } from "ziro-messages/dist/src/catalogo/antifraude/common";
import { name } from "../name";
import responses from "../../../../__test_utils__/nextcodeResponses";
import random from "random-types";

describe("name antifraud validation", () => {
    it("should not apply if document is RGF", () => {
        const result = name(null as any, {} as any, responses.RGF as any);
        expect(result).toHaveProperty("passed", "dontApply");
    });
    it("should fail if extracted is missing", () => {
        const result = name(null as any, {} as any, {} as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", cprompt.MISSING_EXTRACTED_DATA);
    });
    it("should fail if holder_name is missing", () => {
        const result = name(null as any, {} as any, responses.RGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", cprompt.MISSING_EXTRACTED_DATA);
    });
    it("should use found name if available", () => {
        const modRGV = { ...responses.RGV };
        const randomName = random.phrase();
        modRGV.found.name = randomName;
        const result = name(null as any, { holder_name: randomName } as any, modRGV as any);
        expect(result).toHaveProperty("passed", true);
    });
    it("should use extracted if found not available", () => {
        const modRGV = { ...responses.RGV };
        const randomName = random.phrase();
        delete modRGV.found;
        modRGV.extracted.nome = randomName;
        const result = name(null as any, { holder_name: randomName } as any, modRGV as any);
        expect(result).toHaveProperty("passed", true);
    });
    it("should fail if first names are different", () => {
        const modRGV = { ...responses.RGV };
        const firstName1 = random.word();
        const firstName2 = random.word();
        const lastName = random.word();
        const holder_name = firstName1 + " " + lastName;
        const docName = firstName2 + " " + lastName;
        modRGV.found.name = docName;
        const result = name(null as any, { holder_name } as any, modRGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.FIRST_NAME_MISMATCH.code);
        expect(result).toHaveProperty(["reason", "additionalData", "holder_name"], holder_name);
        expect(result).toHaveProperty(["reason", "additionalData", "docName"], docName);
    });
    it("should fail if last names are different", () => {
        const modRGV = { ...responses.RGV };
        const firstName = random.word();
        const lastName1 = random.word();
        const lastName2 = random.word();
        const holder_name = firstName + " " + lastName1;
        const docName = firstName + " " + lastName2;
        modRGV.found.name = docName;
        const result = name(null as any, { holder_name } as any, modRGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty(["reason", "code"], prompt.LAST_NAME_MISMATCH.code);
        expect(result).toHaveProperty(["reason", "additionalData", "holder_name"], holder_name);
        expect(result).toHaveProperty(["reason", "additionalData", "docName"], docName);
    });
    it("should fail if holder_name has only one name", () => {
        const modRGV = { ...responses.RGV };
        const firstName = random.word();
        const lastName = random.word();
        const holder_name = firstName;
        const docName = firstName + " " + lastName;
        modRGV.found.name = docName;
        const result = name(null as any, { holder_name } as any, modRGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", cprompt.MISSING_EXTRACTED_DATA);
    });
    it("should fail if holder_name's first name is less than 3 chars", () => {
        const modRGV = { ...responses.RGV };
        const firstName1 = random.word({ length: 2 });
        const firstName2 = random.word();
        const lastName = random.word();
        const holder_name = firstName1 + " " + lastName;
        const docName = firstName2 + " " + lastName;
        modRGV.found.name = docName;
        const result = name(null as any, { holder_name } as any, modRGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", cprompt.MISSING_EXTRACTED_DATA);
    });
    it("should fail if docName has only one name", () => {
        const modRGV = { ...responses.RGV };
        const firstName = random.word();
        const lastName = random.word();
        const docName = firstName;
        const holder_name = firstName + " " + lastName;
        modRGV.found.name = docName;
        const result = name(null as any, { holder_name } as any, modRGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", cprompt.MISSING_EXTRACTED_DATA);
    });
    it("should fail if docName's first name is less than 3 chars", () => {
        const modRGV = { ...responses.RGV };
        const firstName1 = random.word();
        const firstName2 = random.word({ length: 2 });
        const lastName = random.word();
        const holder_name = firstName1 + " " + lastName;
        const docName = firstName2 + " " + lastName;
        modRGV.found.name = docName;
        const result = name(null as any, { holder_name } as any, modRGV as any);
        expect(result).toHaveProperty("passed", false);
        expect(result).toHaveProperty("reason", cprompt.MISSING_EXTRACTED_DATA);
    });
});

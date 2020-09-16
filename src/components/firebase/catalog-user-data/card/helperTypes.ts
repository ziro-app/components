import { FullOCR } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { ZiroPromptFullData } from "ziro-messages";

export interface File<T extends FullOCR.File.KnownTAG> {
    url: string;
    fileInfo: FullOCR.File.Info<T>;
}

export interface ValidationResultSuccess {
    passed: true;
}

export interface ValidationResultFail {
    passed: false;
    reason: ZiroPromptFullData<string, any>;
}

export type ValidationResult = ValidationResultSuccess | ValidationResultFail;

export type ValidationsKeys =
    | "expirationDate"
    | "name"
    | "face"
    | "CNHFProbability"
    | "CNHVProbability"
    | "CNHFVProbability"
    | "RGFProbability"
    | "RGVProbability"
    | "RGFVProbability"
    | "comparison"
    | "faceCount"
    | "identical"
    | "selfieProbability";

export type Validations<V extends ValidationsKeys> = Record<V, ValidationResult>;

export interface DataFields<E extends "RG" | "CNH"> {
    extracted: E extends "RG" ? FullOCR.Extracted.RG : FullOCR.Extracted.CNH;
    found?: FullOCR.BackgroundCheck.Found;
    passedOn?: FullOCR.BackgroundCheck.PassedOn;
    fieldScores?: FullOCR.Scores.Fields;
}

export interface ImageFields {
    face: FullOCR.Face.Success;
}

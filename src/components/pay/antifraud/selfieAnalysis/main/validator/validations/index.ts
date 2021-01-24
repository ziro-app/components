import { comparison, ComparisonReason } from "./comparison";
import { faceCount, FaceCountReason } from "./faceCount";
import { identical, IdenticalReason } from "./identical";
import { selfieProbability, SelfieProbabilityReason } from "./selfieProbability";
import { Validation } from "./types";

export type { Validation };
export const validations = { comparison, faceCount, identical, selfieProbability };
export type Collection = typeof validations;
export type ClassResultsCollection = Validation.ClassResultsCollection<Collection>;
export type DataResultsCollection = Validation.DataResultsCollection<Collection>;
export type ValidationsErrorReasons = ComparisonReason | FaceCountReason | IdenticalReason | SelfieProbabilityReason;

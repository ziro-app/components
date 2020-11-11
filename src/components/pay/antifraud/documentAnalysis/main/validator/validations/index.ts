import { expirationDate, ExpirationDateReason } from "./expirationDate";
import { expectedDoc, ExpectedDocReason } from "./expectedDoc";
import { docProbability, DocProbabilityReason } from "./docProbability";
import { face, FaceReason } from "./face";
import { name, NameReason } from "./name";
import { Validation } from "./types";

export type { Validation };
export const validations = { expirationDate, expectedDoc, face, name, docProbability };
export type Collection = typeof validations;
export type ClassResultsCollection = Validation.ClassResultsCollection<Collection>;
export type DataResultsCollection = Validation.DataResultsCollection<Collection>;
export type ValidationsErrorReasons = ExpirationDateReason | ExpectedDocReason | FaceReason | NameReason | DocProbabilityReason;

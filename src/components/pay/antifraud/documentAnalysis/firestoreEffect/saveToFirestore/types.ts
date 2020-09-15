import { FirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import firebase from "firebase";
import { UseFullOCR } from "../../main";

export type SaveSuccessToFirestore = (
    card: FirebaseCardDocument,
    result: UseFullOCR.ClassResult,
    FV: typeof firebase.firestore.FieldValue,
) => Promise<void>;

export type SaveFailureToFirestore = (
    card: FirebaseCardDocument,
    error: UseFullOCR.Errors.Generic,
    FV: typeof firebase.firestore.FieldValue,
) => Promise<void>;

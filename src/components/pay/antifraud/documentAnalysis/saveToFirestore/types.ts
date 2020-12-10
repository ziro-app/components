import { FirebaseCardDocument, FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import type firebase from "firebase";
import { UseFullOCR } from "../main";

type FV = typeof firebase.firestore.FieldValue;

export type SaveSuccessToFirestore = (card: FirebaseCardDocument, result: UseFullOCR.ClassResult, fv: FV) => Promise<FirebaseCard.Generic>;
export type SaveFailureToFirestore = (card: FirebaseCardDocument, error: any, fv: FV) => Promise<void>;

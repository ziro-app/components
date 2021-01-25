import { FirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { UseBiometry } from "../main";
import { createFirebaseData } from "./createData";
import type firebase from "firebase";
import { isPrompt } from "ziro-messages";
import * as Sentry from "@sentry/react";

type SaveToFirestore = (c: FirebaseCardDocument, r: UseBiometry.ClassResult, FV: typeof firebase.firestore.FieldValue) => Promise<any>;

export const saveSuccessToFirestore: SaveToFirestore = async (card, result, FV) => {
    const resultData = UseBiometry.transformResult(result);
    const oldData = card.data();
    if (oldData.status !== "pendingSelfie") throw "UNEXPECTED_CARD_STATUS";
    const newData = {
        ...createFirebaseData(oldData, resultData),
        added: oldData.added,
        updated: FV.serverTimestamp(),
    };
    if (oldData.errors) newData.errors = oldData.errors;
    if (oldData.antifraudTransaction) newData.antifraudTransaction = oldData.antifraudTransaction;
    await card.ref.set(newData as any);
    return newData as any;
};

const stripNonFirebaseValues = (obj: object) => {
    if (typeof obj === "string" || typeof obj === "number") return obj;
    if (Array.isArray(obj)) return obj.map(stripNonFirebaseValues);
    if (typeof obj !== "object") return null;
    if (obj === null) return null;
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (typeof value === "string" || typeof value === "number") return { ...acc, [key]: value };
        if (typeof value === "object") return { ...acc, [key]: stripNonFirebaseValues(value) };
        else return acc;
    }, {});
};

export const saveFailureToFirestore: SaveToFirestore = async (card, error, FV) => {
    let errorObj: any = "Unknown";
    try {
        if (isPrompt(error)) {
            const maybeSeriazable = error.getData();
            //try to serialize it
            JSON.stringify(maybeSeriazable);
            //if everything is fine set errorObj
            errorObj = maybeSeriazable;
        } else if (error instanceof Error) {
            const maybeSeriazable: any = {
                name: error.name,
                message: error.message,
            };
            if (error.stack) maybeSeriazable.stack = error.stack;
            //try to serialize it
            JSON.stringify(maybeSeriazable);
            //if everything is fine set errorObj
            errorObj = maybeSeriazable;
        } else {
            //try to serialize entire error
            JSON.stringify(error);
            //if everything is fine set errorObj
            errorObj = error;
        }
    } catch (error) {
        Sentry.captureException(error);
    }
    const errorData = {
        timestamp: Date.now(),
        error: stripNonFirebaseValues(errorObj),
    };
    await card.ref.update({ errors: FV.arrayUnion(errorData) });
};

//@ts-ignore
import { formatDateUTC3 } from "@ziro/format-date-utc3";
import createURL from "@bit/vitorbarbosa19.ziro.utils.create-firestore-url";
import { hyperlink } from "@bit/vitorbarbosa19.ziro.utils.sheets";
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { FirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { UseBiometry, useBiometry } from "../main";
import { Storeowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { extractData } from "./extractData";
import { formatExpiry } from "./formatExpiry";
import { UseFirestoreEffect } from "../firestoreEffect";

const isDev = process.env.NODE_ENV === "development";

const createSheetData = (firebaseCard: FirebaseCardDocument, zoopCardData: ZoopCard, userData: Storeowner) => {
    const firebaseData = firebaseCard.data();
    const date = formatDateUTC3(new Date());
    const cnpj = userData?.cnpj;
    const razao = userData?.razao;
    const name = `${userData?.fname || ""} ${userData?.lname || ""}`;
    const holderName = zoopCardData.holder_name;
    const cardNumber = `${zoopCardData.first4_digits}...${zoopCardData.last4_digits}`;
    const expiry = formatExpiry(zoopCardData);

    const extractedData =
        firebaseData.status !== "pendingDocument" && !("userInputAmount" in firebaseData)
            ? extractData(firebaseData)
            : Array.from(Array(11).keys()).map(() => "");

    return [date, cnpj, razao, name, holderName, cardNumber, expiry, ...extractedData];
};

export const createSheetErrorData = (
    firebaseCard: FirebaseCardDocument,
    zoopCardData: ZoopCard,
    error: UseBiometry.Errors.Generic | UseFirestoreEffect.Error,
    userData: Storeowner,
) => {
    const errorName = hyperlink(createURL(firebaseCard.ref.path, isDev ? "ziro-homolog" : "ziro-app-data"), error.title);
    const [date, ...rest] = createSheetData(firebaseCard, zoopCardData, userData);
    const probSelfie = UseBiometry.Errors.hasKnownResponse(error) ? `${error.additionalData.response.confidence}`.replace(".", ",") : "";
    const selfie = UseBiometry.Errors.hasResponse(error) ? hyperlink(error.additionalData.url, "SELFIE") : "";
    const allData = [[date, error.code, errorName, error.internalDescription, ...rest, probSelfie, selfie]];
    return allData;
};

export const createDevSheetErrorData = (
    firebaseCard: FirebaseCardDocument,
    zoopCardData: ZoopCard,
    error: UseBiometry.Errors.Generic | UseFirestoreEffect.Error,
    userData: Storeowner,
) => {
    const errorName = hyperlink(createURL(firebaseCard.ref.path, isDev ? "ziro-homolog" : "ziro-app-data"), error.title);
    const [date, ...rest] = createSheetData(firebaseCard, zoopCardData, userData);
    const probSelfie = UseBiometry.Errors.hasKnownResponse(error) ? `${error.additionalData.response.confidence}`.replace(".", ",") : "";
    const selfie = UseBiometry.Errors.hasResponse(error) ? hyperlink(error.additionalData.url, "SELFIE") : "";
    return [[date, error.code, errorName, JSON.stringify(error.getData(), null, 4), ...rest, probSelfie, selfie]];
};

export const createSheetSuccessData = (
    firebaseCard: FirebaseCardDocument,
    zoopCardData: ZoopCard,
    result: UseBiometry.ClassResult,
    userData: Storeowner,
) => {
    const data = createSheetData(firebaseCard, zoopCardData, userData);
    const probSelfie = `${result.response.confidence}`.replace(".", ",");
    const selfie = hyperlink(result.url, "SELFIE");
    const approved = result.status === "approved" ? "sim" : "não";
    const allData = [[...data, probSelfie, selfie, approved]];
    return allData;
};

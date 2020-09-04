//@ts-ignore
import { formatDateUTC3 } from "@ziro/format-date-utc3";
import createURL from "@bit/vitorbarbosa19.ziro.utils.create-firestore-url";
import { hyperlink } from "@bit/vitorbarbosa19.ziro.utils.sheets";
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { FirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { UseFullOCR } from "../main";
import { Storeowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { extractData } from "./extractData";
import { formatExpiry } from "./formatExpiry";
import { UseFirestoreEffect } from "../firestoreEffect";

const isDev = process.env.NODE_ENV === "development";

export const createSheetData = (
    firebaseCard: FirebaseCardDocument,
    zoopCardData: ZoopCard,
    error: UseFullOCR.Errors.Generic | UseFirestoreEffect.Error,
    userData: Storeowner,
) => {
    const date = formatDateUTC3(new Date());
    const errorName = hyperlink(
        createURL(firebaseCard.ref.path, isDev ? "ziro-homolog" : "ziro-app-data"),
        error.title,
    );
    const cnpj = userData?.cnpj;
    const razao = userData?.razao;
    const name = `${userData?.fname || ""} ${userData?.lname || ""}`;
    const holderName = zoopCardData.holder_name;
    const cardNumber = `${zoopCardData.first4_digits}...${zoopCardData.last4_digits}`;
    const expiry = formatExpiry(zoopCardData);

    const extractedData = extractData(firebaseCard.data(), error);

    return [
        [
            date,
            error.code,
            errorName,
            error.internalDescription,
            cnpj,
            razao,
            name,
            holderName,
            cardNumber,
            expiry,
            ...extractedData,
        ],
    ];
};

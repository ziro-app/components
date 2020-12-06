//@ts-ignore
import { formatDateUTC3 } from "@ziro/format-date-utc3";
import createURL from "@bit/vitorbarbosa19.ziro.utils.create-firestore-url";
import { hyperlink } from "@bit/vitorbarbosa19.ziro.utils.sheets";
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { FirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { Storeowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { extractData } from "./extractData";
import { formatExpiry, filterNonStringFields, secureStringify, joinStrings } from "./utils";
import { isPrompt } from "ziro-messages";

const isDev = process.env.NODE_ENV === "development";

type SheetData = [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
];

//[0 - date,1 - errorCode,2 - errorName,3 - errorDescription,4 - cnpj,5 - name,6 - holderName,7 - cardNumber,8 - expiry]
const _createSheetData = (firebaseCard: FirebaseCardDocument, zoopCardData: ZoopCard, error: unknown, userData: Storeowner): SheetData => {
    const arr: SheetData = ["", "", "", "", "", "", "", "", "", "", ...extractData(firebaseCard.data(), error)];
    arr[0] = formatDateUTC3(new Date());
    const docURL = createURL(firebaseCard.ref.path, isDev ? "ziro-homolog" : "ziro-app-data");
    if (isPrompt(error)) {
        arr[1] = error.code;
        arr[2] = hyperlink(docURL, error.title);
        arr[3] = error.internalDescription;
    } else if (error instanceof Error) {
        arr[2] = hyperlink(docURL, error.name);
        arr[3] = error.message;
    } else if (typeof error === "string") arr[2] = hyperlink(docURL, error);
    if (userData) {
        arr[4] = userData.cnpj;
        arr[5] = userData.razao;
        arr[6] = joinStrings([userData.fname, userData.lname]);
    }
    if (zoopCardData) {
        arr[7] = zoopCardData.holder_name;
        arr[8] = joinStrings([zoopCardData.first4_digits, zoopCardData.last4_digits], "...");
        arr[9] = formatExpiry(zoopCardData);
    }
    return arr;
};

export const createSheetData = filterNonStringFields(_createSheetData);

const _createDevSheetData = (firebaseCard: FirebaseCardDocument, zoopCardData: ZoopCard, error: unknown, userData: Storeowner): SheetData => {
    const arr: SheetData = ["", "", "", "", "", "", "", "", "", "", ...extractData(firebaseCard.data(), error)];
    arr[0] = formatDateUTC3(new Date());
    const docURL = createURL(firebaseCard.ref.path, isDev ? "ziro-homolog" : "ziro-app-data");
    if (isPrompt(error)) {
        arr[1] = error.code;
        arr[2] = hyperlink(docURL, error.title);
        arr[3] = secureStringify(error.getData());
    } else if (error instanceof Error) {
        arr[1] = hyperlink(docURL, error.name);
        arr[2] = error.message;
        if (error.stack) arr[3] = error.stack;
    } else if (typeof error === "string") arr[2] = hyperlink(docURL, error);
    if (userData) {
        arr[4] = userData.cnpj;
        arr[5] = userData.razao;
        arr[6] = joinStrings([userData.fname, userData.lname]);
    }
    if (zoopCardData) {
        arr[7] = zoopCardData.holder_name;
        arr[8] = joinStrings([zoopCardData.first4_digits, zoopCardData.last4_digits], "...");
        arr[9] = formatExpiry(zoopCardData);
    }
    return arr;
};

export const createDevSheetData = filterNonStringFields(_createDevSheetData);

//@ts-ignore
import { formatDateUTC3 } from "@ziro/format-date-utc3";
import createURL from "@bit/vitorbarbosa19.ziro.utils.create-firestore-url";
import { hyperlink } from "@bit/vitorbarbosa19.ziro.utils.sheets";
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { FirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { UseBiometry } from "../main";
import { Storeowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { extractData } from "./extractData";
import { formatExpiry, joinStrings, secureStringify, filterNonStringFields } from "./utils";
import type { FixedArray } from "./types";
import { isPrompt } from "ziro-messages";

const isDev = process.env.NODE_ENV === "development";

//aliases
type Result = UseBiometry.ClassResult;
type FbCard = FirebaseCardDocument;

//returns
type SheetData = FixedArray<string, 18>;
type SheetErrorData = FixedArray<string, 23>;
type SheetSuccessData = FixedArray<string, 21>;

const _createSheetData = (fbCard: FbCard, zoop: ZoopCard, user: Storeowner): SheetData => {
    const arr: SheetData = ["", "", "", "", "", "", "", ...extractData(fbCard.data())];
    arr[0] = formatDateUTC3(new Date());
    if (user) {
        arr[1] = user.cnpj;
        arr[2] = user.razao;
        arr[3] = joinStrings([user.fname, user.lname]);
    }
    if (zoop) {
        arr[4] = zoop.holder_name;
        arr[5] = joinStrings([zoop.first4_digits, zoop.last4_digits], "...");
        arr[6] = formatExpiry(zoop);
    }
    return arr;
};

const _createSheetErrorData = (fbCard: FbCard, zoop: ZoopCard, error: unknown, user: Storeowner) => {
    const [date, ...rest] = _createSheetData(fbCard, zoop, user);
    const arr: SheetErrorData = [date, "", "", "", ...rest, "", ""];
    const docURL = createURL(fbCard.ref.path, isDev ? "ziro-homolog" : "ziro-app-data");
    if (isPrompt(error)) {
        arr[1] = error.code;
        arr[2] = hyperlink(docURL, error.title);
        arr[3] = error.internalDescription;
        if (error.additionalData?.response?.confidence && error.additionalData?.url) {
            arr[21] = `${error.additionalData.response.confidence}`.replace(".", ",");
            arr[22] = hyperlink(error.additionalData.url, "SELFIE");
        }
    } else if (error instanceof Error) {
        arr[2] = hyperlink(docURL, error.name);
        arr[3] = error.message;
    } else if (typeof error === "string") arr[2] = hyperlink(docURL, error);
    return arr;
};

export const createSheetErrorData = filterNonStringFields(_createSheetErrorData);

const _createDevSheetErrorData = (fbCard: FbCard, zoop: ZoopCard, error: unknown, user: Storeowner) => {
    const [date, ...rest] = _createSheetData(fbCard, zoop, user);
    const arr: SheetErrorData = [date, "", "", "", ...rest, "", ""];
    const docURL = createURL(fbCard.ref.path, isDev ? "ziro-homolog" : "ziro-app-data");
    if (isPrompt(error)) {
        arr[1] = error.code;
        arr[2] = hyperlink(docURL, error.title);
        arr[3] = secureStringify(error.getData());
        if (error.additionalData?.response?.confidence && error.additionalData?.url) {
            arr[21] = `${error.additionalData.response.confidence}`.replace(".", ",");
            arr[22] = hyperlink(error.additionalData.url, "SELFIE");
        }
    } else if (error instanceof Error) {
        arr[2] = hyperlink(docURL, error.name);
        arr[3] = error.message;
    } else if (typeof error === "string") arr[2] = hyperlink(docURL, error);
    return arr;
};

export const createDevSheetErrorData = filterNonStringFields(_createDevSheetErrorData);

const _createSheetSuccessData = (fbCard: FbCard, zoop: ZoopCard, result: Result, user: Storeowner): SheetSuccessData => {
    const arr: SheetSuccessData = [..._createSheetData(fbCard, zoop, user), "", "", ""];
    if (result) {
        arr[18] = `${result.response.confidence}`.replace(".", ",");
        arr[19] = hyperlink(result.url, "SELFIE");
        arr[20] = result.status === "approved" ? "sim" : "não";
    }
    return arr;
};

export const createSheetSuccessData = filterNonStringFields(_createSheetSuccessData);

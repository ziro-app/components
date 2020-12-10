import { ZiroPromptFullData } from "ziro-messages";
import { File, Validations, DataFields, ImageFields } from "./helperTypes";
import { Replace } from "@bit/vitorbarbosa19.ziro.utils.check-against-template";
import type firebase from "firebase";

export namespace FirebaseCard {
    export type Status = "pendingDocument" | "pendingSelfie" | "pendingManualApproval" | "approved";

    export interface Common<S extends Status> {
        status: S;
        antifraudTransaction?: string;
        added: firebase.firestore.Timestamp;
        updated: firebase.firestore.Timestamp;
        errors?: {
            timestamp: number;
            error: ZiroPromptFullData<string, any>;
        }[];
    }

    /**
     * RG
     */
    interface RGCommon<S extends Status> extends Common<S> {
        documentType: "rg";
    }

    export interface RGF extends RGCommon<"pendingDocument">, ImageFields {
        docStatus: "pendingRGV";
        "RG F": File<"RG F">;
        validations: Validations<"RGFProbability" | "face">;
    }

    export interface RGV extends RGCommon<"pendingDocument">, DataFields<"RG"> {
        docStatus: "pendingRGF";
        "RG V": File<"RG V">;
        validations: Validations<"RGVProbability" | "expirationDate" | "name">;
    }

    export interface RGFV extends RGCommon<"pendingSelfie">, DataFields<"RG">, ImageFields {
        "RG FV": File<"RG FV">;
        validations: Validations<"RGFVProbability" | "expirationDate" | "name" | "face">;
    }

    export interface RGFeV extends RGCommon<"pendingSelfie">, DataFields<"RG">, ImageFields {
        "RG F": File<"RG F">;
        "RG V": File<"RG V">;
        validations: Validations<"RGFProbability" | "RGVProbability" | "face" | "name" | "expirationDate">;
    }

    export type RG = RGF | RGV | RGFV | RGFeV;

    /**
     * CNH
     */

    interface CNHCommon<S extends Status> extends Common<S> {
        documentType: "cnh";
    }

    export interface CNHF extends CNHCommon<"pendingSelfie">, DataFields<"CNH">, ImageFields {
        "CNH F": File<"CNH F">;
        validations: Validations<"CNHFProbability" | "name" | "face" | "expirationDate">;
    }

    export interface CNHV extends CNHCommon<"pendingDocument"> {
        docStatus: "pendingCNHF";
        "CNH V": File<"CNH V">;
        validations: Validations<"CNHVProbability">;
    }

    export interface CNHFV extends CNHCommon<"pendingSelfie">, DataFields<"CNH">, ImageFields {
        "CNH FV": File<"CNH FV">;
        validations: Validations<"CNHFVProbability" | "name" | "face" | "expirationDate">;
    }

    export interface CNHFeV extends CNHCommon<"pendingSelfie">, DataFields<"CNH">, ImageFields {
        "CNH F": File<"CNH F">;
        "CNH V": File<"CNH V">;
        validations: Validations<"CNHVProbability" | "CNHFProbability" | "name" | "face" | "expirationDate">;
    }

    export type CNH = CNHF | CNHV | CNHFV | CNHFeV;

    export type BeforeDocPhase = Common<"pendingDocument"> | RGF | RGV | CNHV;

    export type BeforeSelfiePhase = RGFV | RGFeV | CNHF | CNHFV | CNHFeV;

    export type AfterAntifraud = Replace<BeforeSelfiePhase, "status", "approved" | "pendingManualApproval"> & {
        selfie: {
            url: string;
        };
        validations: Validations<"selfieProbability" | "comparison" | "faceCount" | "identical">;
    };

    export interface AfterAntifraudTransaction extends Common<"approved"> {
        userInputAmount: string;
    }

    export type Generic = BeforeDocPhase | BeforeSelfiePhase | AfterAntifraud | AfterAntifraudTransaction;
}

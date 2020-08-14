import { ZiroPromptFullData } from "ziro-messages"
import { File, ImageValidation, DataValidation, ValidationResult, DataFields, ImageFields } from "./helperTypes"

export namespace Card {
    export type Status = "pendingDoc"|"pendingSelfie"|"pendingManualApproval"|"approved"

    interface Common<S extends Status> {
        id: string
        status: S
        added: firebase.firestore.Timestamp
        updated: firebase.firestore.Timestamp
        error?: ZiroPromptFullData<string,any>
    }

    /**
     * RG
     */
    interface RGCommon<S extends Status> extends Common<S> {
        documentType: "rg"
    }

    export interface RGF extends RGCommon<"pendingDoc">,ImageFields {
        docStatus: "pendingRGV"
        "RG F": File<"RG F">
        validations: Record<ImageValidation,ValidationResult>
    }

    export interface RGV extends RGCommon<"pendingDoc">,DataFields<"RG"> {
        docStatus: "pendingRGF"
        "RG V": File<"RG V">
        validations: Record<DataValidation,ValidationResult>
    }

    export interface RGFV extends RGCommon<"pendingSelfie">,DataFields<"RG">,ImageFields {
        "RG FV": File<"RG FV">
        validations: Record<ImageValidation|DataValidation,ValidationResult>
    }

    export interface RGFeV extends RGCommon<"pendingSelfie">,DataFields<"RG">,ImageFields {
        "RG F": File<"RG F">
        "RG V": File<"RG V">
        validations: Record<ImageValidation|DataValidation,ValidationResult>
    }

    export type RG = RGF|RGV|RGFV|RGFeV

    /**
     * CNH
     */

    interface CNHCommon<S extends Status> extends Common<S> {
        documentType: "cnh"
    }

    export interface CNHF extends CNHCommon<"pendingSelfie">,DataFields<"CNH">,ImageFields {
        "CNH F": File<"CNH F">
        validations: Record<ImageValidation|DataValidation,ValidationResult>
    }

    export interface CNHV extends CNHCommon<"pendingDoc"> {
        "CNH V": File<"CNH V">
    }

    export interface CNHFV extends CNHCommon<"pendingSelfie">,DataFields<"CNH">,ImageFields {
        "CNH FV": File<"CNH FV">
        validations: Record<ImageValidation|DataValidation,ValidationResult>
    }

    export interface CNHFeV extends CNHCommon<"pendingSelfie">,DataFields<"CNH">,ImageFields {
        "CNH F": File<"CNH F">
        "CNH V": File<"CNH V">
        validations: Record<ImageValidation|DataValidation,ValidationResult>
    }

    export type CNH = CNHF|CNHV|CNHFV|CNHFeV

    export type Generic = Common<"pendingDoc">|RG|CNH
}
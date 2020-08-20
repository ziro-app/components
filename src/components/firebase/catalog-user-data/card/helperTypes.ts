export interface File<T extends import("@bit/vitorbarbosa19.ziro.pay.next-code").FullOCR.File.KnownTAG> {
    url: string,
    fileInfo: import("@bit/vitorbarbosa19.ziro.pay.next-code").FullOCR.File.Info<T>
}

export interface ValidationResultSuccess {
    passed: true
}

export interface ValidationResultFail {
    passed: false
    reason: import("ziro-messages").ZiroPromptFullData<string,any>
}

export type ValidationResult = ValidationResultSuccess | ValidationResultFail

export type ImageValidation = "face"
export type DataValidation = "expirationDate"|"expectedDoc"|"name"

export interface DataFields<E extends "RG"|"CNH"> {
    extracted: E extends "RG" ?
        import("@bit/vitorbarbosa19.ziro.pay.next-code").FullOCR.Extracted.RG
        : import("@bit/vitorbarbosa19.ziro.pay.next-code").FullOCR.Extracted.CNH
    found?: import("@bit/vitorbarbosa19.ziro.pay.next-code").FullOCR.BackgroundCheck.Found
    passedOn?: import("@bit/vitorbarbosa19.ziro.pay.next-code").FullOCR.BackgroundCheck.PassedOn
    fieldScores?: import("@bit/vitorbarbosa19.ziro.pay.next-code").FullOCR.Scores.Fields
}

export interface ImageFields {
    face: import("@bit/vitorbarbosa19.ziro.pay.next-code").FullOCR.Face.Success
}
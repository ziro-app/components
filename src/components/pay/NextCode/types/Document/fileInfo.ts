const template = {
  originalname: "",
  size: "",
  md5: "",
  extension: "",
  height: "",
  width: "",
  classifiedAs: "",
};

type Template = typeof template;
export const templateKeys = Object.keys(template);
export const classifiedAsKeys = ["probability", "tagName"];

export namespace File {
  export type TAG =
    | "CNH F"
    | "CNH V"
    | "CNH FV"
    | "RG F"
    | "RG V"
    | "RG FV"
    | "CPF"
    | "COMPRES"
    | "IMPRESSOS"
    | "CARTAOCREDITO"
    | "OUTROS"
    | "SELFIE"

  export type CNHTAG = "CNH F"|"CNH V"|"CNH FV"
  export type RGTAG = "RG F"|"RG V"|"RG FV"
  export type KnownTAG = CNHTAG|RGTAG
  export type UnknownTAG = Exclude<TAG,KnownTAG>

  export type ClassifiedAs<T extends TAG> = {
    probability: number;
    tagName: T;
  };

  export type Info<T extends TAG> = {
    [K in keyof Template]: K extends "classifiedAs"
      ? ClassifiedAs<T>
      : Template[K];
  };
}

export type TypeCheck = {
  (obj: any): obj is File.Info<File.TAG>;
  ClassifiedAs: (obj: any) => obj is File.ClassifiedAs<File.TAG>;
};

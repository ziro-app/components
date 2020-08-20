import { Replace } from "@bit/vitorbarbosa19.ziro.utils.check-against-template";

export const FileInfoTemplate = {
  originalname: "",
  size: 0,
  md5: "",
  extension: "",
  height: 0,
  width: 0,
  classifiedAs: {
    probability: 0,
    tagName: ""
  },
};

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
  export type ClassifiedAs<T extends TAG> = Replace<typeof FileInfoTemplate.classifiedAs,"tagName",T>;
  export type Info<T extends TAG> = Replace<typeof FileInfoTemplate,"classifiedAs",ClassifiedAs<T>>;
}

export type TypeCheck = {
  (obj: any): obj is File.Info<File.TAG>;
  ClassifiedAs: (obj: any) => obj is File.ClassifiedAs<File.TAG>;
};

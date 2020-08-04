import Refresh from "../refresh";
import Stats from "../stats";
import { File } from "./fileInfo";
import { Face } from "./face";
import { Extracted } from "./extracted";
import { Scores } from "./scores";
import { BackgroundCheck } from "./backgroundCheck";

export namespace Response {
  /**
   * RG
   */
  export type RGF = {
    fileInfo: File.Info<"RG F">;
    face: Face.Generic;
  };

  export type UncheckedRGV = {
    fileInfo: File.Info<"RG V">;
    extracted: Extracted.RG;
    fieldScores?: Scores.Fields;
  };

  export type CheckedRGV = UncheckedRGV & BackgroundCheck.BackgroundCheck;

  export type RGV = UncheckedRGV | CheckedRGV;

  export type UncheckedRGFV = {
    fileInfo: File.Info<"RG FV">;
    face: Face.Generic;
    extracted: Extracted.RG;
    fieldScores?: Scores.Fields;
  };

  export type CheckedRGFV = UncheckedRGFV & BackgroundCheck.BackgroundCheck;

  export type RGFV = UncheckedRGFV | CheckedRGFV;

  export type RG = RGF | RGV | RGFV;

  /**
   * CNH
   */

  export type CNHV = {
    fileInfo: File.Info<"CNH V">;
  };

  export type UncheckedCNHForFV<T extends "CNH F" | "CNH FV"> = {
    fileInfo: File.Info<T>;
    face: Face.Generic;
    extracted: Extracted.CNH;
    fieldScores?: Scores.Fields;
  };

  export type CheckedCNHForFV<T extends "CNH F" | "CNH FV"> = UncheckedCNHForFV<
    T
  > &
    BackgroundCheck.BackgroundCheck;

  export type CNHForFV<T extends "CNH F" | "CNH FV"> =
    | UncheckedCNHForFV<T>
    | CheckedCNHForFV<T>;

  export type CNHF = CNHForFV<"CNH F">;
  export type CNHFV = CNHForFV<"CNH FV">;

  export type CNH = CNHV | CNHF | CNHFV;

  /**
   * General Response
   */

  export type KnownDocument = RG | CNH;


  /**
   * Unknown Type Response
   */

   export type UnknownDocument = { fileInfo: File.Info<File.UnknownTAG> }
   export type Selfie = { fileInfo: File.Info<"SELFIE"> }
}

/**
 * Generic Response with BackgroundCheck
 */

type GenericWithBGCheck<T,CheckedT> = {
  (obj: any): obj is T
  BackgroundChecked: (obj: any) => obj is CheckedT
}

export type RGTypeCheck = {
  (obj: any): obj is Response.RG
  Frente: (obj: any) => obj is Response.RGF
  Verso: GenericWithBGCheck<Response.RGV,Response.CheckedRGV>
  FrenteVerso: GenericWithBGCheck<Response.RGFV,Response.CheckedRGFV>
}

export type CNHTypeCheck = {
  (obj: any): obj is Response.CNH
  Frente: GenericWithBGCheck<Response.CNHF,Response.CheckedCNHForFV<"CNH F">>
  Verso: (obj: any) => obj is Response.CNHV
  FrenteVerso: GenericWithBGCheck<Response.CNHFV,Response.CheckedCNHForFV<"CNH FV">>
}

export type TypeCheck = {
  (obj: any): obj is Response.KnownDocument|Response.UnknownDocument
  KnownDocument: (obj: any) => obj is Response.KnownDocument
  UnknownDocument: (obj: any) => obj is Response.UnknownDocument
  Selfie: (obj: any) => obj is Response.Selfie
}
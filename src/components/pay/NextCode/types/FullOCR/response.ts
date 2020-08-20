import { File } from "./fileInfo";
import { Face } from "./face";
import { Extracted } from "./extracted";
import { Scores } from "./scores";
import { BackgroundCheck } from "./backgroundCheck";
import { Identity } from "@bit/vitorbarbosa19.ziro.utils.check-against-template";

export namespace Response {
  /**
   * Technically every response will have a fileInfo object
   */
  export interface Generic<T extends File.TAG> {
    fileInfo: File.Info<T>
  }
  /**
   * RG
   */
  export interface RGForFV<T extends "RG F"|"RG FV"> extends Generic<T> {
    face: Face.Generic;
  }

  export interface UncheckedRG {
    extracted: Extracted.RG
    fieldScores?: Scores.Fields
  }

  export type RGF = RGForFV<"RG F">
  export type UncheckedRGV = Identity<UncheckedRG & Generic<"RG V">>
  export type CheckedRGV = Identity<UncheckedRGV & BackgroundCheck.Collection>;
  export type RGV = UncheckedRGV | CheckedRGV;
  export type UncheckedRGFV = Identity<UncheckedRG & RGForFV<"RG FV">>
  export type CheckedRGFV = Identity<UncheckedRGFV & BackgroundCheck.Collection>;
  export type RGFV = UncheckedRGFV | CheckedRGFV;
  export type RG = RGF | RGV | RGFV;

  /**
   * CNH
   */

  export interface UncheckedCNHForFV<T extends "CNH F" | "CNH FV"> extends Generic<T> {
    face: Face.Generic;
    extracted: Extracted.CNH;
    fieldScores?: Scores.Fields;
  };

  export type CheckedCNHForFV<T extends "CNH F" | "CNH FV"> = Identity<UncheckedCNHForFV<T> & BackgroundCheck.Collection>;

  export type CNHForFV<T extends "CNH F" | "CNH FV"> =
    | UncheckedCNHForFV<T>
    | CheckedCNHForFV<T>;

  export type CNHV = Generic<"CNH V">;
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

   export type UnknownDocument = Generic<File.UnknownTAG>
   export type Selfie = Generic<"SELFIE">
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
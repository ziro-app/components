import checkAgainstTemplate from "@bit/vitorbarbosa19.ziro.utils.check-against-template";
import * as _BGCheck from "./backgroundCheck";
import * as _Extracted from "./extracted";
import * as _Face from "./face";
import * as _File from "./fileInfo";
import * as _Scores from "./scores";
import * as _Response from "./response";

/**
 * BackgroundCheck
 */

export const BackgroundCheck: _BGCheck.TypeCheck = function (obj): obj is _BGCheck.BackgroundCheck.Collection {
  return checkAgainstTemplate(_BGCheck.BackgroundCheckTemplates,obj)
};

BackgroundCheck.Found = function (obj): obj is _BGCheck.BackgroundCheck.Found {
  return checkAgainstTemplate(_BGCheck.BackgroundCheckTemplates.found,obj)
};

BackgroundCheck.PassedOn = function (obj): obj is _BGCheck.BackgroundCheck.PassedOn {
  return checkAgainstTemplate(_BGCheck.BackgroundCheckTemplates.passedOn,obj)
};

/**
 * Extracted
 */

export const Extracted: _Extracted.TypeCheck = function (obj: any): obj is _Extracted.Extracted.Generic {
  return checkAgainstTemplate(_Extracted.ExtractedTemplates.common,obj)
};

Extracted.CNH = function (obj: any): obj is _Extracted.Extracted.CNH {
  return Extracted(obj) &&
    checkAgainstTemplate(_Extracted.ExtractedTemplates.cnh,obj) &&
    obj.documentType === "cnh"
};

Extracted.RG = function (obj: any): obj is _Extracted.Extracted.RG {
  return Extracted(obj) &&
    checkAgainstTemplate(_Extracted.ExtractedTemplates.rg,obj) &&
    obj.documentType === "rg"
};

/**
 * Face
 */

export const Face: _Face.TypeCheck = function (obj: any): obj is _Face.Face.Generic {
  return Face.Success(obj) || Face.Error(obj);
};

Face.Error = function (obj: any): obj is _Face.Face.Error {
  return checkAgainstTemplate(_Face.FaceTemplates.error,obj)
};

Face.Success = function (obj: any): obj is _Face.Face.Success {
  return checkAgainstTemplate(_Face.FaceTemplates.success,obj)
};

/**
 * FileInfo
 */

export const FileInfo: _File.TypeCheck = function <T extends _File.File.TAG>(obj: any): obj is _File.File.Info<T> {
  return checkAgainstTemplate(_File.FileInfoTemplate,obj);
};

FileInfo.ClassifiedAs = function <T extends _File.File.TAG>(obj: any): obj is _File.File.ClassifiedAs<T> {
  return checkAgainstTemplate(_File.FileInfoTemplate.classifiedAs,obj)
};

/**
 * Scores
 */
export const Scores: _Scores.TypeCheck = function (obj: any): obj is _Scores.Scores.Fields {
  return checkAgainstTemplate(_Scores.FieldsTemplate,obj)
};

Scores.Score = function (obj: any): obj is _Scores.Scores.Score {
  return checkAgainstTemplate(_Scores.ScoreTemplate,obj)
};

/**
 * RG
 */
export const RG: _Response.RGTypeCheck = function (obj: any): obj is _Response.Response.RG {
  const { fileInfo } = obj ?? {};
  if (!FileInfo(fileInfo)) return false;
  const { tagName } = fileInfo.classifiedAs;
  return tagName.includes("RG");
};

RG.Frente = function (obj: any): obj is _Response.Response.RGF {
  if (!RG(obj)) return false;
  if (!("face" in obj)) return false;
  if (!Face(obj.face)) return false;
  if (obj.fileInfo.classifiedAs.tagName !== "RG F") return false;
  return true;
};

function RGVorRGFV(
  obj: any
): obj is _Response.Response.RGV | _Response.Response.RGFV {
  if (!RG(obj)) return false;
  if (!("extracted" in obj)) return false;
  if (!Extracted.RG(obj.extracted)) return false;
  return true;
}

const rgVerso: _Response.RGTypeCheck["Verso"] = function (
  obj: any
): obj is _Response.Response.RGV {
  if (!RGVorRGFV(obj)) return false;
  if (obj.fileInfo.classifiedAs.tagName !== "RG V") return false;
  return true;
};

rgVerso.BackgroundChecked = function (
  obj: any
): obj is _Response.Response.CheckedRGV {
  return RG.Verso(obj) && BackgroundCheck(obj);
};

RG.Verso = rgVerso;

const rgFrenteVerso: _Response.RGTypeCheck["FrenteVerso"] = function (
  obj: any
): obj is _Response.Response.RGFV {
  if (!RGVorRGFV(obj)) return false;
  if (!("face" in obj)) return false;
  if (!Face(obj.face)) return false;
  if (obj.fileInfo.classifiedAs.tagName !== "RG FV") return false;
  return true;
};

rgFrenteVerso.BackgroundChecked = function (
  obj: any
): obj is _Response.Response.CheckedRGFV {
  if (!RG.FrenteVerso(obj)) return false;
  if (!BackgroundCheck(obj)) return false;
  return true;
};

RG.FrenteVerso = rgFrenteVerso;

/**
 * CNH
 */
export const CNH: _Response.CNHTypeCheck = function (
  obj: any
): obj is _Response.Response.CNH {
  const { fileInfo } = obj ?? {};
  if (!FileInfo(fileInfo)) return false;
  const { tagName } = fileInfo.classifiedAs;
  return tagName.includes("CNH");
};

function CNHForFV(
  obj: any
): obj is _Response.Response.CNHForFV<"CNH F" | "CNH FV"> {
  if (!CNH(obj)) return false;
  if (!("extracted" in obj)) return false;
  if (!Extracted.CNH(obj.extracted)) return false;
  if (!("face" in obj)) return false;
  if (!Face(obj.face)) return false;
  return true;
}

const cnhFrente: _Response.CNHTypeCheck["Frente"] = function (
  obj: any
): obj is _Response.Response.CNHF {
  if (!CNHForFV(obj)) return false;
  if (obj.fileInfo.classifiedAs.tagName !== "CNH F") return false;
  return true;
};

cnhFrente.BackgroundChecked = function (
  obj: any
): obj is _Response.Response.CheckedCNHForFV<"CNH F"> {
  if (!CNH.Frente(obj)) return false;
  if (!BackgroundCheck(obj)) return false;
  return true;
};

CNH.Frente = cnhFrente;

CNH.Verso = function (obj: any): obj is _Response.Response.CNHV {
  if (!CNH(obj)) return false;
  if (obj.fileInfo.classifiedAs.tagName !== "CNH V") return false;
  return true;
};

const cnhFrenteVerso: _Response.CNHTypeCheck["FrenteVerso"] = function (
  obj: any
): obj is _Response.Response.CNHFV {
  if (!CNHForFV(obj)) return false;
  if (obj.fileInfo.classifiedAs.tagName !== "CNH FV") return false;
  return true;
};

cnhFrenteVerso.BackgroundChecked = function (
  obj: any
): obj is _Response.Response.CheckedCNHForFV<"CNH FV"> {
  if (!CNH.FrenteVerso(obj)) return false;
  if (!BackgroundCheck(obj)) return false;
  return true;
};

CNH.FrenteVerso = cnhFrenteVerso;

/**
 * Response
 */
export const Response: _Response.TypeCheck = function (obj: any): obj is _Response.Response.KnownDocument|_Response.Response.UnknownDocument {
  return Response.KnownDocument(obj)||Response.UnknownDocument(obj)
}

Response.KnownDocument = function (obj: any): obj is _Response.Response.KnownDocument {
  return RG(obj)||CNH(obj)
}

Response.UnknownDocument = function (obj: any): obj is _Response.Response.UnknownDocument {
  return (FileInfo(obj.fileInfo))&&!Response.KnownDocument(obj)
}

Response.Selfie = function (obj: any): obj is _Response.Response.Selfie {
  return (FileInfo(obj.fileInfo)&&obj.fileInfo.classifiedAs.tagName==="SELFIE")
}
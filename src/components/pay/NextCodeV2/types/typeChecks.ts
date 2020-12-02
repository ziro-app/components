import checkAgainstTemplate from "@bit/vitorbarbosa19.ziro.utils.check-against-template";
import * as _DocType from "./DocType";

/**
 * DocType
 */
export const DocType: _DocType.TypeCheck = function (obj: any): obj is _DocType.Response {
  return checkAgainstTemplate(_DocType.docTypeResponseTemplate, obj);
};
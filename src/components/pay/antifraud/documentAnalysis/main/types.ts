import { FullOCRPromptMessage } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR";
import { CommonPromptMessage } from "ziro-messages/dist/src/catalogo/antifraude/common";
import { ZiroPromptMessage } from "ziro-messages";
import { FullOCR, is } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { ReasonsThatShouldThrow, ClassResultsCollection, DataResultsCollection } from "./validator";
import { UsePromiseState } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { Replace } from "@bit/vitorbarbosa19.ziro.utils.check-against-template";

export * from "./validator";

/**
 * Errors that will throw inside useFullOCR
 */
type UnknownDocumentError = FullOCRPromptMessage<"UNKNOWN_DOCUMENT_TYPE", { response: FullOCR.Response.UnknownDocument; url: string }>;
type SelfieError = FullOCRPromptMessage<"SELFIE_TYPE", { response: FullOCR.Response.Selfie; url: string }>;
type UnrecognizedResponseError = FullOCRPromptMessage<"UNRECOGNIZED_RESPONSE", { response: any; url: string }>;
type NoImageError = CommonPromptMessage<"NO_IMAGE", { where: string }>;
type TooManyAttemptsError = CommonPromptMessage<"TOO_MANY_ATTEMPTS", { where: string }>;
type CannotUploadPictureError = CommonPromptMessage<"CANNOT_UPLOAD_PICTURE_TO_STORAGE", { where: string; error: any }>;

/**
 * Aliases
 */
type KnownDocument = FullOCR.Response.KnownDocument;
type RGF = FullOCR.Response.RGF;
type RGFV = FullOCR.Response.RGFV;
type CNHF = FullOCR.Response.CNHF;
type CNHFV = FullOCR.Response.CNHFV;

export namespace UseFullOCR {
    /**
     * callback argument
     */
    export interface Argument {
        picture: string;
    }
    /**
     * callback class result
     */
    export interface ClassResult<Response extends KnownDocument = KnownDocument> {
        validations: ClassResultsCollection;
        response: Response extends RGF | RGFV | CNHF | CNHFV ? Replace<Response, "face", FullOCR.Face.Success> : Response;
        url: string;
    }
    /**
     * callback data result
     */
    export interface DataResult<Response extends KnownDocument = KnownDocument> {
        validations: Partial<DataResultsCollection>;
        response: Response extends RGF | RGFV | CNHF | CNHFV ? Replace<Response, "face", FullOCR.Face.Success> : Response;
        url: string;
    }
    /**
     * Utility transformation type
     */
    type ClassToData<R extends ClassResult> = R extends ClassResult<infer Response> ? DataResult<Response> : never;
    /**
     * Transforma um resultado contendo instancias da classe ZiroPromptMessage em objetos puros para serem armazenados
     * no firestore.
     * @param result fullOCR result
     */
    export function transformResult<R extends ClassResult>(result: R): ClassToData<R> {
        const { validations: v, ...rest } = result;
        const validations = Object.entries(v).reduce((acc, [vName, vResult]) => {
            const result = vResult.passed === true ? { passed: true } : { passed: false, reason: vResult.reason.getData() };
            return { ...acc, [vName]: result };
        }, {});
        return { ...rest, validations } as any;
    }
    /**
     * Discrimaneted data results
     */
    type Discriminated =
        | { type: "RGF"; result: DataResult<FullOCR.Response.RGF> }
        | { type: "RGV"; result: DataResult<FullOCR.Response.RGV> }
        | { type: "RGFV"; result: DataResult<FullOCR.Response.RGFV> }
        | { type: "CNHF"; result: DataResult<FullOCR.Response.CNHF> }
        | { type: "CNHV"; result: DataResult<FullOCR.Response.CNHV> }
        | { type: "CNHFV"; result: DataResult<FullOCR.Response.CNHFV> };
    /**
     * Essa função discrimina qual o tipo de resultado dado uma função para checagem
     * @param obj dataResult object
     * @param checker function to check which type
     */
    export function discriminator<R extends KnownDocument>(obj: DataResult, checker: (obj: any) => obj is R): obj is DataResult<R> {
        return checker(obj.response);
    }
    /**
     * Essa funçao retorna o resultado do useFullOCR discriminado
     * @param result resultado retornando pelo useFullOCR
     */
    export function discriminateResult(result: DataResult): Discriminated {
        if (discriminator(result, is.RG.Frente)) return { type: "RGF", result };
        if (discriminator(result, is.RG.Verso)) return { type: "RGV", result };
        if (discriminator(result, is.RG.FrenteVerso)) return { type: "RGFV", result };
        if (discriminator(result, is.CNH.Frente)) return { type: "CNHF", result };
        if (discriminator(result, is.CNH.Verso)) return { type: "CNHV", result };
        if (discriminator(result, is.CNH.FrenteVerso)) return { type: "CNHFV", result };
    }
    /**
     * callback errors
     */
    export namespace Errors {
        export type WithKnownResponse = ReasonsThatShouldThrow;
        export type WithResponse = ReasonsThatShouldThrow | UnknownDocumentError | SelfieError | UnrecognizedResponseError;
        export type Generic = WithResponse | NoImageError | TooManyAttemptsError | CannotUploadPictureError;
        /**
         * TypeChecks
         */
        /**
         * Essa função determina se o erro possui um objeto resposta ou não
         * @param error o erro a ser verificado
         */
        export function hasResponse(error: ZiroPromptMessage<string, string, any>): error is WithResponse {
            return "response" in error.additionalData;
        }
        /**
         * Essa função determina se o erro possui uma resposta de um documento conhecido ou não
         * @param error o erro a ser verificado
         */
        export function hasKnownResponse(error: ZiroPromptMessage<string, string, any>): error is WithKnownResponse {
            return hasResponse(error) && is.Response.KnownDocument(error.additionalData.response);
        }
    }
    /**
     * callback state
     */
    export type State = UsePromiseState<ClassResult, Errors.Generic>;
}

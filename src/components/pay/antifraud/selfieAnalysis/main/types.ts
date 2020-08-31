import { BiometryPromptMessage } from "ziro-messages/dist/src/catalogo/antifraude/biometry";
import { CommonPromptMessage } from "ziro-messages/dist/src/catalogo/antifraude/common";
import { ZiroPromptMessage } from "ziro-messages";
import { Biometry, is } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { ReasonsThatShouldThrow, ClassResultsCollection, DataResultsCollection } from "./validator";
import { UsePromiseState } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";

export * from "./validator";

/**
 * Errors that will throw inside useFullOCR
 */
type UnrecognizedResponseError = BiometryPromptMessage<"UNRECOGNIZED_RESPONSE", { response: any; url: string }>;
type NoImageError = CommonPromptMessage<"NO_IMAGE", { where: string }>;
type TooManyAttemptsError = CommonPromptMessage<"TOO_MANY_ATTEMPTS", { where: string }>;
type CannotUploadPictureError = CommonPromptMessage<"CANNOT_UPLOAD_PICTURE_TO_STORAGE", { where: string; error: any }>;

export namespace UseBiometry {
    /**
     * callback argument
     */
    export interface Argument {
        picture: string;
    }
    /**
     * callback class result
     */
    export interface ClassResult<Response extends Biometry.Response = Biometry.Response> {
        validations: ClassResultsCollection;
        response: Response;
        status: "approved" | "pendingManualApproval";
        url: string;
    }
    /**
     * callback data result
     */
    export interface DataResult<Response extends Biometry.Response = Biometry.Response> {
        validations: DataResultsCollection;
        response: Response;
        status: "approved" | "pendingManualApproval";
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
            const result =
                vResult.passed === true ? { passed: true } : { passed: false, reason: vResult.reason.getData() };
            return { ...acc, [vName]: result };
        }, {});
        return { ...rest, validations } as any;
    }
    /**
     * callback errors
     */
    export namespace Errors {
        export type WithKnownResponse = ReasonsThatShouldThrow;
        export type WithResponse = ReasonsThatShouldThrow | UnrecognizedResponseError;
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

        export function hasKnownResponse(error: ZiroPromptMessage<string, string, any>): error is WithKnownResponse {
            return "response" in error.additionalData && is.Biometry(error.additionalData.response);
        }
    }
    /**
     * callback state
     */
    export type State = UsePromiseState<ClassResult, Errors.Generic>;
}

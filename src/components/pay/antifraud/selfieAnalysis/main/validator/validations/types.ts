import { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { Biometry } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { ZiroPromptMessage, ZiroPromptFullData } from "ziro-messages";
/**
 * Validation Types
 */
export namespace Validation {
    /**
     * Validation Result
     */
    export namespace Result {
        export type Neutral = { passed: "dontApply" };
        export type Success<Data = Object> = { passed: true; additionalData?: Data };
        export type Fail<Reason = Object> = { passed: false; reason: Reason };
        export type Final<Data = Object, Reason = Object> = Success<Data> | Fail<Reason>;
    }

    /**
     * Validation Function
     */
    export type Function<Data = Object, Reason = Object> = (
        firebaseCardData: FirebaseCard.BeforeSelfiePhase,
        response: Biometry.Response,
    ) => Result.Final<Data, Reason>;

    /**
     * Validations Collection
     */
    export interface Collection {
        [key: string]: Function;
    }

    /**
     * Class Results Collection
     */
    export type ClassResultsCollection<V extends Collection> = {
        [K in keyof V]: V[K] extends Function<infer Data, infer Reason> ? Result.Final<Data, Reason> : never;
    };

    /**
     * Data Results Collection
     */
    export type DataResultsCollection<V extends Collection> = {
        [K in keyof V]: V[K] extends Function<infer Data, infer Reason>
            ? Reason extends ZiroPromptMessage<infer C, string, infer D>
                ? Result.Final<Data, ZiroPromptFullData<C, D>>
                : never
            : never;
    };
}

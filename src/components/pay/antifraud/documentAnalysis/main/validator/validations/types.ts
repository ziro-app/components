/**
 * Validation Types
 */
export namespace Validation {
    /**
     * Validation Result
     */
    export namespace Result {
        export type Neutral = { passed: "dontApply" }
        export type Success<Data = Object> = { passed: true, additionalData?: Data }
        export type Fail<Reason = Object> = { passed: false, reason: Reason }
        export type Partial<Data = Object,Reason = Object> = Neutral|Success<Data>|Fail<Reason>
        export type Final<Data = Object,Reason = Object> = Success<Data>|Fail<Reason>
    }

    /**
     * Validation Function
     */
    export type Function<Data = Object,Reason = Object> = (
        firebaseCardData: import("@bit/vitorbarbosa19.ziro.firebase.catalog-user-data").FirebaseCard.Generic,
        zoopCardData: import("@bit/vitorbarbosa19.ziro.pay.zoop").ZoopCard.Info,
        response: import("@bit/vitorbarbosa19.ziro.pay.next-code").FullOCR.Response.KnownDocument
    ) => Result.Partial<Data,Reason>

    /**
     * Validations Collection
     */
    export interface Collection {
        [key: string]: Function
    }

    /**
     * Class Results Collection
     */
    export type ClassResultsCollection<V extends Collection> = {
        [K in keyof V]: V[K] extends Function<infer Data,infer Reason> ? Result.Final<Data,Reason> : never
    }

    /**
     * Data Results Collection
     */
    export type DataResultsCollection<V extends Collection> = {
        [K in keyof V]: V[K] extends Function<infer Data,infer Reason> ?
            Reason extends import("ziro-messages").ZiroPromptMessage<infer C,string,infer D> ?
                Result.Final<Data,import("ziro-messages").ZiroPromptFullData<C,D>> : never : never
    }
}
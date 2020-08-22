import { CommonPromptMessage } from "ziro-messages/dist/src/catalogo/antifraude/common"
import { UseEffectState } from "@bit/vitorbarbosa19.ziro.utils.async-hooks"

export namespace UseFirestoreEffect {
    export type Error = CommonPromptMessage<"CANNOT_SAVE_TO_FIRESTORE",{ error: any }>
    export type State = UseEffectState<void,Error>
}
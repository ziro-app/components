import { is, Document } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import { Validation, PM } from "./types"
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude"

//possible ZiroMessage types that this validation can return with their respective data type
type R = PM<"NO_FACE_OBJECT",{}>|PM<"CANNOT_ANALYZE_FACE",{ face: Document.Face.Error }>|PM<"UNRECOGNIZED_FACE_OBJECT",{ face: object }>

export const face: Validation<R> = (_, response) => {
    //if document type is RG verso or CNH verso this validation doesnt apply
    if(is.RG.Verso(response)||is.CNH.Verso(response)) return { passed: "dontApply" }
    //if response doesnt contain a face object we consider that the image doesnt have a face
    if(!("face" in response)) return { passed: false, reason: prompt.NO_FACE_OBJECT }
    //if the face object is correctly identified
    if(is.Face(response.face)) {
        //we can either have a successfull identification, meaning that we can send it back to be compared with the selfie
        if(is.Face.Success(response.face)) return { passed: true }
        //or we can have a failed identification, meaning that nextcode will not be able to compare it with the selfie
        if(is.Face.Error(response.face))
            return { passed: false, reason: prompt.CANNOT_ANALYZE_FACE.withAdditionalData({ face: response.face }) }
    }
    //if we receive an extraneous face object we can be optimistic and try to send it to be compared
    return { passed: false, reason: prompt.UNRECOGNIZED_FACE_OBJECT.withAdditionalData({ face: response.face }) }
}
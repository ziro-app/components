import { Document, is } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import checkFace from "../face"
import checkScores from "../fieldScores"
import backgroundCheck from "../backgroundCheck"

export default (response: Document.Response.CNHF) => {
    console.log('document is CNH Frente')
    checkFace(response.face)
    checkScores(response.fieldScores)
    backgroundCheck(response)
}
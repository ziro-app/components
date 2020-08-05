import { Document } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import checkFace from "../face"
import checkScores from "../fieldScores"
import backgroundCheck from "../backgroundCheck"

export default (response: Document.Response.RGFV) => {
    console.log('document is RG FrenteVerso')
    checkFace(response.face)
    checkScores(response.fieldScores)
    backgroundCheck(response)
}
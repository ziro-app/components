import checkFace from "../face"
import checkScores from "../fieldScores"
import backgroundCheck from "../backgroundCheck"

export default (response: import("@bit/vitorbarbosa19.ziro.pay.next-code").FullOCR.Response.CNHF) => {
    console.log('document is CNH Frente')
    checkFace(response.face)
    checkScores(response.fieldScores)
    backgroundCheck(response)
}
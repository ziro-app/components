import checkScores from "../fieldScores"
import backgroundCheck from "../backgroundCheck"

export default (response: import("@bit/vitorbarbosa19.ziro.pay.next-code").FullOCR.Response.RGV) => {
    console.log('document is RG Verso')
    checkScores(response.fieldScores)
    backgroundCheck(response)
}
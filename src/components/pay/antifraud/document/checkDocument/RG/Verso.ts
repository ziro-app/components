import { Document } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import checkScores from "../fieldScores"
import backgroundCheck from "../backgroundCheck"

export default (response: Document.Response.RGV) => {
    console.log('document is RG Verso')
    checkScores(response.fieldScores)
    backgroundCheck(response)
}
import { is } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import checkRG from "./RG"
import checkCNH from "./CNH"

export default (response: any) => {
    console.log(response)
    if(is.Response(response)) console.log('is valid response')
    if(is.RG(response)) checkRG(response)
    if(is.CNH(response)) checkCNH(response)
}
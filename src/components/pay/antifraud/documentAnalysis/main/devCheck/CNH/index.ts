import { FullOCR, is } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import checkFrente from "./Frente"
import checkVerso from "./Verso"
import checkFrenteVerso from "./FrenteVerso"

export default (response: FullOCR.Response.CNH) => {
    console.log('document is CNH')
    if(is.CNH.Frente(response)) checkFrente(response)
    if(is.CNH.Verso(response)) checkVerso(response)
    if(is.CNH.FrenteVerso(response)) checkFrenteVerso(response)
}
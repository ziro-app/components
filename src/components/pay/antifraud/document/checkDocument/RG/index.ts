import { Document, is } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import checkFrente from "./Frente"
import checkVerso from "./Verso"
import checkFrenteVerso from "./FrenteVerso"

export default (response: Document.Response.RG) => {
    console.log('document is RG')
    if(is.RG.Frente(response)) checkFrente(response)
    if(is.RG.Verso(response)) checkVerso(response)
    if(is.RG.FrenteVerso(response)) checkFrenteVerso(response)
}
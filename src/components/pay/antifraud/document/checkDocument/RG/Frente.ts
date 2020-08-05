import { Document } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import checkFace from "../face"

export default ({ face }: Document.Response.RGF) => {
    console.log('document is RG Frente')
    checkFace(face)
}
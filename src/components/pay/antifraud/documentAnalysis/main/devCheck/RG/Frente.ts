import checkFace from "../face"

export default ({ face }: import("@bit/vitorbarbosa19.ziro.pay.next-code").FullOCR.Response.RGF) => {
    console.log('document is RG Frente')
    checkFace(face)
}
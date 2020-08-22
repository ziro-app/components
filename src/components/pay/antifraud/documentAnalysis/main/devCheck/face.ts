import { FullOCR, is} from "@bit/vitorbarbosa19.ziro.pay.next-code"

export default (face?: FullOCR.Face.Generic) => {
    if(is.Face(face)) {
        console.log('document has face')
        if(is.Face.Success(face)) console.log('face identified')
        if(is.Face.Error(face)) console.log('face not identified')
    }
    else console.log('document doesnt have face')
}
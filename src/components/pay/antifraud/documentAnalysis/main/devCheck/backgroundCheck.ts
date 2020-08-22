import { FullOCR, is } from "@bit/vitorbarbosa19.ziro.pay.next-code"

export default (response: FullOCR.Response.KnownDocument) => {
    if(is.BackgroundCheck(response)) {
        const { found, passedOn } = response
        console.log("response is background checked",{ found, passedOn })
    }
    else console.log("response is not background checked")
}
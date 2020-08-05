//@ts-expect-error
import { usePromiseShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks"
import { useCancelToken } from "@bit/vitorbarbosa19.ziro.utils.axios"
import { prompt, waiting } from "ziro-messages/dist/src/catalogo/antifraude"
import { A, R, E } from "./types"

export const useDocAnalysis = () => {
    const source = useCancelToken()
    const [cbk,state] = usePromiseShowingMessage<A, R, E>(waiting.ANALYZING_DOC, async ({ picture }) => {
    if(!picture) throw { skipAttempt: true, error: prompt.NO_IMAGE.withAdditionalData({ where: "useUploadDocument" }) }
    if(state.attempts===3) throw { skipAttempt: true, error: prompt.TOO_MANY_ATTEMPTS.withAdditionalData({ where: "useUploadDocument" }) }

    const url = await uploadFile(card, picture)
    const response = await analiseDocument(url, source.token)

    if(isDev) checkDocument(response)
    if(is.Response(response)) {
      if(is.Response.KnownDocument(response)) {
        const validation = validator(card, response)
        processResult(response, url, validation)
        return { validation, response, url }
      }
      if(is.Response.UnknownDocument(response)) {
        if(is.Response.Selfie(response)) throw prompt.SELFIE_TYPE.withAdditionalData({ response, url })
        throw prompt.UNKNOWN_DOCUMENT_TYPE.withAdditionalData({ response, url })
      }
    }
    throw prompt.UNRECOGNIZED_RESPONSE.withAdditionalData({ response, url })
  }, [analiseDocument, uploadFile, checkDocument, is]);
}





// import axios from "axios";
// import { analiseDocument, is } from "@bit/vitorbarbosa19.ziro.pay.next-code";
// import { useCancelToken } from "@bit/vitorbarbosa19.ziro.utils.axios"
// import { useAsyncEffect, usePromiseShowingMessage, useMountState } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
// import { useCards, useDeleteCard, uploadFile } from "../antifraude";
// import { useUserData, useCartIDfromPaymentID } from "../useInfo";
// import {
//   useSubmitModal,
//   useAnimatedLocation,
//   //@ts-ignore
// } from "@bit/vitorbarbosa19.ziro.flow-manager";
// import { useState, useEffect, useMemo, useCallback } from "react";
// import checkDocument from './checkDocument'
// import { validator, processResult } from "./validations"
// import { prompt, waiting } from "ziro-messages/dist/src/catalogo/antifraude";
// import { useMessage, useMessagePromise } from "@bit/vitorbarbosa19.ziro.message-modal";
// import { A, R, E } from "./types"
// import { useCardBeenRegistered, useFirebaseCards, useStoreowner } from "../ziro_pay/hooks"

// const isDev = process.env.NODE_ENV === "development";

// export default (id: string) => {
//   const card = useCardBeenRegistered()
//   const data = useStoreowner()
//   const cards = useFirebaseCards(data.storeownerId)

//   // console.log({ cards, card })

//   // messagesDeps
//   const [, setLocation] = useAnimatedLocation();
//   const cartId = useCartIDfromPaymentID(id);
//   const [isCameraOpen, setIsCameraOpen] = useState(false);

//   const setMessage = useMessage()
//   const setMessagePromise = useMessagePromise()

//   const closeLocation = useMemo(() => cartId ? `/carrinho/${cartId}` : `/galeria`,[cartId])

//   const leftButton = useMemo(() => ({
//       icon: "close",
//       onClick: () => setMessagePromise(prompt.CLOSE)
//         .then(() => setLocation('converge', closeLocation))
//         .catch(() => null)
//     }),
//     [setMessage,setLocation,closeLocation]
//   );

//   const source = useCancelToken()

//   const [next, uploadState] = usePromiseShowingMessage<A, R, E>(waiting.ANALYZING_DOC, async ({ picture }) => {
//     if(!picture) throw { skipAttempt: true, error: prompt.NO_IMAGE.withAdditionalData({ where: "useUploadDocument" }) }
//     if(uploadState.attempts===3) throw { skipAttempt: true, error: prompt.TOO_MANY_ATTEMPTS.withAdditionalData({ where: "useUploadDocument" }) }

//     const url = await uploadFile(card, picture)
//     const response = await analiseDocument(url, source.token)

//     if(isDev) checkDocument(response)
//     if(is.Response(response)) {
//       if(is.Response.KnownDocument(response)) {
//         const validation = validator(card, response)
//         processResult(response, url, validation)
//         return { validation, response, url }
//       }
//       if(is.Response.UnknownDocument(response)) {
//         if(is.Response.Selfie(response)) throw prompt.SELFIE_TYPE.withAdditionalData({ response, url })
//         throw prompt.UNKNOWN_DOCUMENT_TYPE.withAdditionalData({ response, url })
//       }
//     }
//     throw prompt.UNRECOGNIZED_RESPONSE.withAdditionalData({ response, url })
//   }, [analiseDocument, uploadFile, checkDocument, is]);

//   const previous = useCallback(() => uploadState.reset(),[id]);

//   // console.log(uploadState)

//   useEffect(() => {
//     switch(uploadState.status) {
//       case "failed":
//         if(uploadState.error.name==="FIRST_NAME_MISMATCH") {
//           // uploadState.error.additionalData.
//         }
//         return
//       case "success":
//         return
//       case "stale":
//         setIsCameraOpen(false)
//         setMessage(prompt.INITIAL_DOCUMENT.withButtons([{
//           title: "ok",
//           action: () => prompt.DOC_READABILITY.withButtons([{
//             title: "ok",
//             action: () => setIsCameraOpen(true)
//           }])
//         }]))
//       default:
//         return
//     }
//   },[uploadState.status])

//   // useEffect(() => uploadState.reset(),[card?.docStatus])

//   return {
//     next,
//     previous,
//     leftButton,
//     sending: uploadState.status === "running",
//     card,
//     isCameraOpen,
//   };
// };

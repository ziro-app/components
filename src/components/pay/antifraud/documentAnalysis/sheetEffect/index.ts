import { useCallback } from "react";
import { useAsyncEffect } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { useSheet } from "@bit/vitorbarbosa19.ziro.utils.sheets"
import { FirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import tuple from "@bit/vitorbarbosa19.ziro.utils.tuple";
import { fullOCR } from "ziro-messages/dist/src/catalogo/antifraude"
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop"
import { Storeowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners"
import { UseFullOCR } from "../FullOCRMain"
import { UseFirestoreEffect } from "../FirestoreEffect"
import { createSheetData } from "./createData";

const devErrors = tuple(
    fullOCR.prompt.UNRECOGNIZED_RESPONSE.name,
    fullOCR.prompt.UNRECOGNIZED_FACE_OBJECT.name,
    fullOCR.prompt.UNKNOWN_DOCUMENT_TYPE.name
)

export const useSheetEffect = (
    firebaseCard: FirebaseCardDocument,
    zoopCardData: ZoopCard.Info,
    fullOCRState: UseFullOCR.State,
    firestoreState: UseFirestoreEffect.State,
    userData: Storeowner
) => {
    const sheet = useSheet(process.env.SHEET_ID_TRANSACTIONS)

    const fullOCRSentinel = useAsyncEffect(async () => {
        if(fullOCRState.status==="failed") {
            if(fullOCRState.error.name==="NO_IMAGE") return
            const values = createSheetData(firebaseCard, zoopCardData, fullOCRState.error, userData)
            await sheet.write({ range: "Antifraude_Erros!A1", values })
            if(devErrors.includes(fullOCRState.error.name as any)) await sheet.write({ range: "Antifraude_Erros_Dev!A1", values })
        }
    },[fullOCRState.status])

    const firestoreSentinel = useAsyncEffect(async () => {
        if(firestoreState.status==="failed") {
            const values = createSheetData(firebaseCard, zoopCardData, firestoreState.error, userData)
            await sheet.write({ range: "Antifraude_Erros!A1", values })
        }
    },[firestoreState.status])

    return useCallback(() => {
        fullOCRSentinel.reset()
        firestoreSentinel.reset()
    },[fullOCRSentinel,firestoreSentinel])
}
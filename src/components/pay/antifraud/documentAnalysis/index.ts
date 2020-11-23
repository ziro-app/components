import { useMemo, MutableRefObject, useRef, useEffect } from "react";
import { useFirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { useFullOCR } from "./main";
import { useFirestoreEffect } from "./firestoreEffect";
import { useSheetEffect } from "./sheetEffect";
import { useWhatsAppEffect } from "./whatsAppEffect";
import { useAsyncEffectShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR";
import { Button } from "ziro-messages";

export const useDocumentAnalysis = (
    zoopCardData: ZoopCard,
    recipients: string[],
    cameraRef: MutableRefObject<Record<"openCamera" | "closeCamera", () => void>>,
    onSuccess: () => void,
) => {
    const userData = useStoreowner();
    const firebaseCard = useFirebaseCardDocument(zoopCardData.id);

    const [cbk, fullOCRState] = useFullOCR(firebaseCard, zoopCardData);
    const firestoreState = useFirestoreEffect(firebaseCard, fullOCRState);
    const sheetState = useSheetEffect(firebaseCard, zoopCardData, fullOCRState, firestoreState, userData);
    const whatsAppEffect = useWhatsAppEffect(recipients, fullOCRState, userData);

    const docStatus = useMemo(() => {
        const data = firebaseCard.data();
        return data && "docStatus" in data ? data.docStatus : "document";
    }, [firebaseCard]);

    useAsyncEffectShowingMessage(
        null,
        async () => {
            //reset everything
            fullOCRState.reset();
            firestoreState.reset();
            sheetState.reset();
            whatsAppEffect.reset();
            //choose button to start
            cameraRef.current?.closeCamera();
            const docReadabilityButtons: [Button] = [{ title: "ok", action: () => cameraRef.current?.openCamera() }];
            const buttons: [Button] = [{ title: "ok", action: () => prompt.DOC_READABILITY.withButtons(docReadabilityButtons) }];
            return {
                document: prompt.INITIAL_DOCUMENT,
                pendingRGF: prompt.INITIAL_RG_FRENTE,
                pendingRGV: prompt.INITIAL_RG_VERSO,
                pendingCNHF: prompt.INITIAL_CNH_FRENTE,
            }[docStatus].withButtons(buttons);
        },
        [docStatus],
    );

    const analizing = useMemo(() => fullOCRState.status === "running" || firestoreState.status === "running", [
        fullOCRState.status,
        firestoreState.status,
    ]);

    useEffect(() => {
        if (fullOCRState.status === "success" && firestoreState.status === "success") onSuccess();
    }, [fullOCRState.status, firestoreState.status]);

    return [cbk, analizing] as [typeof cbk, typeof analizing];
};

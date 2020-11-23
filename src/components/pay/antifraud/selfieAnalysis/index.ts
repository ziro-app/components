import { useMemo, MutableRefObject, useEffect } from "react";
import { useFirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { useBiometry } from "./main";
import { useFirestoreEffect } from "./firestoreEffect";
import { useSheetEffect } from "./sheetEffect";
import { useWhatsAppEffect } from "./whatsAppEffect";
import { useAsyncEffectShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";

export const useSelfieAnalysis = (
    zoopCardData: ZoopCard,
    recipients: string[],
    cameraRef: MutableRefObject<Record<"openCamera" | "closeCamera", () => void>>,
    onSuccess: (result: ReturnType<typeof useBiometry>[1]["result"]) => void,
) => {
    const userData = useStoreowner();
    const firebaseCard = useFirebaseCardDocument(zoopCardData.id);

    const [cbk, biometryState] = useBiometry(firebaseCard);
    const firestoreState = useFirestoreEffect(firebaseCard, biometryState);
    const sheetState = useSheetEffect(firebaseCard, zoopCardData, biometryState, firestoreState, userData);
    const whatsAppState = useWhatsAppEffect(recipients, biometryState, userData);

    useAsyncEffectShowingMessage(
        null,
        async () => {
            //reset everything
            biometryState.reset();
            firestoreState.reset();
            sheetState.reset();
            whatsAppState.reset();
            //choose button to start
            cameraRef.current?.closeCamera();
            return prompt.INITIAL_SELFIE.withButtons([{ title: "ok", action: () => cameraRef.current?.openCamera() }]);
        },
        [],
    );

    const analizing = useMemo(() => biometryState.status === "running" || firestoreState.status === "running", [
        biometryState.status,
        firestoreState.status,
    ]);

    useEffect(() => {
        if (biometryState.status === "success" && firestoreState.status === "success") onSuccess(biometryState.result);
    }, [biometryState.status, firestoreState.status]);

    return [cbk, analizing] as [typeof cbk, typeof analizing];
};

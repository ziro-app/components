import { useMemo } from "react";
import { useFirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { useBiometry } from "./main";
import { useFirestoreEffect } from "./firestoreEffect";
import { useSheetEffect } from "./sheetEffect";
import { useWhatsAppEffect } from "./whatsAppEffect";
import { useAsyncEffectShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";

export const useSelfieAnalysis = (zoopCardData: ZoopCard, setCamera: (open: boolean) => void) => {
    const userData = useStoreowner();
    const firebaseCard = useFirebaseCardDocument(zoopCardData.id);

    const [cbk, biometryState] = useBiometry(firebaseCard);
    const firestoreState = useFirestoreEffect(firebaseCard, biometryState);
    const sheetState = useSheetEffect(firebaseCard, zoopCardData, biometryState, firestoreState, userData);
    const whatsAppState = useWhatsAppEffect(biometryState, userData);

    useAsyncEffectShowingMessage(
        null,
        async () => {
            //reset everything
            biometryState.reset();
            firestoreState.reset();
            sheetState.reset();
            whatsAppState.reset();
            //choose button to start
            setCamera(false);
            return prompt.INITIAL_SELFIE.withButtons([{ title: "ok", action: () => setCamera(true) }]);
        },
        [],
    );

    const analizing = useMemo(() => biometryState.status === "running" || firestoreState.status === "running", [
        biometryState.status,
        firestoreState.status,
    ]);

    return [cbk, analizing] as [typeof cbk, typeof analizing];
};

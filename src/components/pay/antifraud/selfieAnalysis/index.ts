import { useMemo } from "react";
import { useFirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { useBiometry } from "./main";
import { useFirestoreEffect } from "./firestoreEffect";
import { useSheetEffect } from "./sheetEffect";
import { useAsyncEffectShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";

export const useSelfieAnalysis = (zoopCardData: ZoopCard, setCamera: (open: boolean) => void) => {
    const userData = useStoreowner();
    const firebaseCard = useFirebaseCardDocument(zoopCardData.id);

    const [cbk, biometryState] = useBiometry(firebaseCard);
    const firestoreState = useFirestoreEffect(firebaseCard, biometryState);
    const sheetState = useSheetEffect(firebaseCard, zoopCardData, biometryState, firestoreState, userData);

    useAsyncEffectShowingMessage(
        null,
        async () => {
            //reset everything
            biometryState.reset();
            firestoreState.reset();
            sheetState.reset();
            //choose button to start
            setCamera(false);
            return prompt.INITIAL_SELFIE.withButtons([{ title: "ok", action: () => setCamera(true) }]);
        },
        [],
    );

    const analizing = useMemo(() => biometryState.status === "running", [biometryState.status]);

    return [cbk, analizing] as [typeof cbk, typeof analizing];
};

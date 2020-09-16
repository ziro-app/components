import { useCallback } from "react";
import { useAsyncEffect } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { useSheet } from "@bit/vitorbarbosa19.ziro.utils.sheets";
import { FirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import tuple from "@bit/vitorbarbosa19.ziro.utils.tuple";
import { biometry } from "ziro-messages/dist/src/catalogo/antifraude";
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { Storeowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { UseBiometry } from "../main";
import { UseFirestoreEffect } from "../firestoreEffect";
import { createDevSheetErrorData, createSheetErrorData, createSheetSuccessData } from "./createData";

const devErrors = tuple(biometry.prompt.UNRECOGNIZED_RESPONSE.name);

export const useSheetEffect = (
    firebaseCard: FirebaseCardDocument,
    zoopCardData: ZoopCard,
    biometryState: UseBiometry.State,
    firestoreState: UseFirestoreEffect.State,
    userData: Storeowner,
) => {
    const sheet = useSheet(process.env.SHEET_ID_TRANSACTIONS);

    return useAsyncEffect(async () => {
        if (firestoreState.status === "success") {
            if (biometryState.status === "failed") {
                if (biometryState.error.name === "NO_IMAGE") return;
                const values = createSheetErrorData(firebaseCard, zoopCardData, biometryState.error, userData);
                await sheet.write({ range: "Antifraude_Erros!A1", values });
                if (devErrors.includes(biometryState.error.name as any)) {
                    const devValues = createDevSheetErrorData(
                        firebaseCard,
                        zoopCardData,
                        biometryState.error,
                        userData,
                    );
                    await sheet.write({ range: "Antifraude_Erros_Dev!A1", values: devValues });
                }
            }
            if (biometryState.status === "success") {
                const values = createSheetSuccessData(firebaseCard, zoopCardData, biometryState.result, userData);
                await sheet.write({ range: "Antifraude!A1", values });
            }
        } else if (firestoreState.status === "failed") {
            const values = createSheetErrorData(firebaseCard, zoopCardData, firestoreState.error, userData);
            await sheet.write({ range: "Antifraude_Erros!A1", values });
            const devValues = createDevSheetErrorData(firebaseCard, zoopCardData, firestoreState.error, userData);
            await sheet.write({ range: "Antifraude_Erros_Dev!A1", values: devValues });
        }
    }, [firestoreState.status]);
};

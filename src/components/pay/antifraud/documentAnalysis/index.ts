import { useMemo, MutableRefObject, useRef, useState } from "react";
import {
    FirebaseCard,
    useCatalogUserDataDocument,
    useFirebaseCardDocument,
    useUploadFirebaseCardPicture,
} from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { fullOCRPromise } from "./main";
import { createWhatsData } from "./whatsApp";
import { useAsyncEffectShowingMessage, usePromiseShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { Button, isPrompt } from "ziro-messages";
import { useCancelToken } from "@bit/vitorbarbosa19.ziro.utils.axios";
import { saveFailureToFirestore, saveSuccessToFirestore } from "./saveToFirestore";
import { useFirestore } from "reactfire";
import { createDevSheetData, createSheetData } from "./sheet";
import { useSheet } from "@bit/vitorbarbosa19.ziro.utils.sheets";
import tuple from "@bit/vitorbarbosa19.ziro.utils.tuple";
import { fullOCR, common } from "ziro-messages/dist/src/catalogo/antifraude";
import { sendWhats } from "@bit/vitorbarbosa19.ziro.utils.whatsapp";
//@ts-ignore
import { supportPhoneNumber } from "@bit/vitorbarbosa19.ziro.utils.support-phone-number";
import * as Sentry from "@sentry/react";

const supportAction = () => {
    window.open(`https://api.whatsapp.com/send?phone=${supportPhoneNumber.replace(/\+|\s|\(|\)|-/g, "")}`, "_blank");
};

interface Configuration {
    zoopCard: ZoopCard;
    recipients: string[];
    camera: MutableRefObject<Record<"openCamera" | "closeCamera", () => void>>;
    onSuccess?: (newData: FirebaseCard.Generic) => void;
    onError?: (error: any) => void;
}

interface Arg {
    picture: string;
}

const devErrors = tuple(
    fullOCR.prompt.UNRECOGNIZED_RESPONSE.code,
    fullOCR.prompt.UNRECOGNIZED_FACE_OBJECT.code,
    fullOCR.prompt.UNKNOWN_DOCUMENT_TYPE.code,
    common.prompt.CANNOT_SAVE_TO_FIRESTORE.code,
);

export const useDocumentAnalysis = ({ recipients, zoopCard, onSuccess, onError, camera }: Configuration) => {
    const storeowner = useStoreowner();
    const user = useCatalogUserDataDocument();
    const fbCard = useFirebaseCardDocument(zoopCard.id);
    const [uploadPicture] = useUploadFirebaseCardPicture(zoopCard.id);
    const source = useCancelToken();
    const sheet = useSheet(process.env.SHEET_ID_TRANSACTIONS);

    const FV = useFirestore.FieldValue;

    const onSuccessRef = useRef(onSuccess);
    const onErrorRef = useRef(onError);
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;

    const [cbk, state] = usePromiseShowingMessage<Arg, void, any>(
        fullOCR.waiting.ANALYZING_DOC,
        async ({ picture }) => {
            try {
                if (state.attempts === 3) throw common.prompt.TOO_MANY_ATTEMPTS.withAdditionalData({ where: "fullOCR" });
                const props = { picture, uploadPicture, fbCard, zoopCard, source };
                const result = await fullOCRPromise(props).catch(async (error) => {
                    //save error to firestore
                    await saveFailureToFirestore(fbCard, error, FV);
                    throw error;
                });
                //save success to firestore
                const newData = await saveSuccessToFirestore(fbCard, result, FV);
                //update user status
                if (user.data().status !== "paid") await user.ref.update({ status: "docAdded" });
                //on success
                onSuccessRef?.current(newData);
            } catch (error) {
                try {
                    //save error to sheet
                    const values = createSheetData(fbCard, zoopCard, error, storeowner);
                    await sheet.write({ range: "Antifraude_Erros!A1", values });
                    if (!isPrompt(error) || devErrors.includes(error.code as any)) {
                        const devValues = createDevSheetData(fbCard, zoopCard, error, storeowner);
                        await sheet.write({ range: "Antifraude_Erros_Dev!A1", values: devValues });
                    }
                    //send whats
                    await sendWhats(createWhatsData(recipients, storeowner, error));
                } catch (e) {
                    //send error to sentry
                    Sentry.captureException(e);
                }
                onErrorRef?.current(error);
                if (!isPrompt(error)) throw error;
                switch (error.code) {
                    case common.prompt.TOO_MANY_ATTEMPTS.code: {
                        const button = { title: "Falar com suporte", action: supportAction };
                        throw { skipAttempt: true, error: error.withButtons([button]) };
                    }
                    case common.prompt.NO_IMAGE.code: {
                        const button = { title: "Enviar novamente", action: () => null };
                        throw { skipAttempt: true, error: error.withButtons([button]) };
                    }
                    default:
                        const button = { title: "Enviar novamente", action: () => null };
                        throw error.withButtons([button]);
                }
            }
        },
        [uploadPicture, fbCard, zoopCard, source, FV, user, sheet, recipients, storeowner],
    );

    const [runs, setRuns] = useState(0);

    useAsyncEffectShowingMessage(
        null,
        async () => {
            const data = fbCard.data();
            setRuns((r) => r + 1);
            if (data.status === "pendingSelfie" && runs > 0) return;
            const docStatus = "docStatus" in data ? data.docStatus : "document";
            //reset state
            state.reset();
            //choose button to start
            camera.current?.closeCamera();
            const docReadButtons: [Button] = [{ title: "ok", action: () => camera.current?.openCamera() }];
            const buttons: [Button] = [{ title: "ok", action: () => fullOCR.prompt.DOC_READABILITY.withButtons(docReadButtons) }];
            return {
                document: fullOCR.prompt.INITIAL_DOCUMENT,
                pendingRGF: fullOCR.prompt.INITIAL_RG_FRENTE,
                pendingRGV: fullOCR.prompt.INITIAL_RG_VERSO,
                pendingCNHF: fullOCR.prompt.INITIAL_CNH_FRENTE,
            }[docStatus].withButtons(buttons);
        },
        [fbCard],
    );

    return [cbk, state.status === "running"] as const;
};

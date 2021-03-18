import { MutableRefObject, useRef } from "react";
import {
    FirebaseCard,
    useCatalogUserDataDocument,
    useFirebaseCardDocument,
    useUploadFirebaseCardPicture,
} from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { biometry } from "./main";
import { createWhatsErrorData, createWhatsSuccessData } from "./whatsApp";
import { useAsyncEffectShowingMessage, usePromiseShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { Button, isPrompt } from "ziro-messages";
import { useCancelToken } from "@bit/vitorbarbosa19.ziro.utils.axios";
import { saveFailureToFirestore, saveSuccessToFirestore } from "./saveToFirestore";
import { useFirestore } from "reactfire";
import { createDevSheetErrorData, createSheetErrorData, createSheetSuccessData } from "./sheet";
import { useSheet } from "@bit/vitorbarbosa19.ziro.utils.sheets";
import tuple from "@bit/vitorbarbosa19.ziro.utils.tuple";
import { fullOCR, common, biometry as bio } from "ziro-messages/dist/src/catalogo/antifraude";
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
    onSuccess?: (newData: FirebaseCard.AfterAntifraud) => void;
    onError?: (error: any) => void;
    onChangeValidationType: () => void;
}

interface Arg {
    picture: string;
}

const devErrors = tuple(bio.prompt.UNRECOGNIZED_RESPONSE.code, common.prompt.CANNOT_SAVE_TO_FIRESTORE.code);

export const useSelfieAnalysis = ({ recipients, zoopCard, onSuccess, onError, onChangeValidationType, camera }: Configuration) => {
    const storeowner = useStoreowner();
    const user = useCatalogUserDataDocument();
    const fbCard = useFirebaseCardDocument(zoopCard.id);
    const [uploadPicture] = useUploadFirebaseCardPicture(zoopCard.id);
    const source = useCancelToken();
    const sheet = useSheet(process.env.SHEET_ID_TRANSACTIONS);

    const FV = useFirestore.FieldValue;

    const onSuccessRef = useRef(onSuccess);
    const onErrorRef = useRef(onError);
    const onChangeValidationTypeRef = useRef(onChangeValidationType);
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    onChangeValidationTypeRef.current = onChangeValidationType;

    const [cbk, state] = usePromiseShowingMessage<Arg, void, any>(bio.waiting.ANALYZING_FACE, async ({ picture }) => {
        try {
            if (state.attempts === 3) throw common.prompt.TOO_MANY_ATTEMPTS.withAdditionalData({ where: "biometry" });
            const props = { picture, uploadPicture, fbCard, zoopCard, source };
            const result = await biometry(props).catch(async (error) => {
                //save error to firestore
                await saveFailureToFirestore(fbCard, error, FV);
                throw error;
            });
            //save success to firestore
            const newData = await saveSuccessToFirestore(fbCard, result, FV);
            //update user status
            if (!user.exists) user.ref.set({ cnpj: storeowner.cnpj, razao: storeowner.razao, status: "selfieAdded" });
            else if (user.data()?.status !== "paid") await user.ref.update({ status: "selfieAdded" });
            //save on sheet
            const values = createSheetSuccessData(fbCard, zoopCard, result, storeowner);
            await sheet.write({ range: "Antifraude!A1", values });
            //if manual send whats
            if (result.status === "pendingManualApproval") {
                await sendWhats(createWhatsSuccessData(recipients, storeowner));
            }
            //on success
            onSuccessRef.current?.(newData);
        } catch (error) {
            try {
                //save error to sheet
                const values = createSheetErrorData(fbCard, zoopCard, error, storeowner);
                await sheet.write({ range: "Antifraude_Erros!A1", values });
                if (!isPrompt(error) || devErrors.includes(error.code as any)) {
                    const devValues = createDevSheetErrorData(fbCard, zoopCard, error, storeowner);
                    await sheet.write({ range: "Antifraude_Erros_Dev!A1", values: devValues });
                }
                if (!isPrompt(error)) Sentry.captureException(error);
                //send whats
                await sendWhats(createWhatsErrorData(recipients, storeowner, error));
                onErrorRef.current?.(error);
            } catch (e) {
                //send error to sentry
                Sentry.captureException(e);
            }
            if (!isPrompt(error)) throw error;

            const genericButton = { title: "Validar de outra forma", action: onChangeValidationTypeRef.current };

            switch (error.code) {
                case common.prompt.TOO_MANY_ATTEMPTS.code: {
                    const button = { title: "Falar com suporte", action: supportAction };
                    throw { skipAttempt: true, error: error.withButtons([button]).withGenericButton(genericButton) };
                }
                case common.prompt.NO_IMAGE.code: {
                    const button = { title: "Enviar novamente", action: () => null };
                    throw { skipAttempt: true, error: error.withButtons([button]).withGenericButton(genericButton) };
                }
                default:
                    const button = { title: "Enviar novamente", action: () => null };
                    throw error.withButtons([button]).withGenericButton(genericButton);
            }
        }
    });

    useAsyncEffectShowingMessage(
        null,
        async () => {
            if (status === "pendingSelfie" && state.status !== "firstRender") return;
            //reset state
            state.reset();
            //choose button to start
            camera.current?.closeCamera();
            const docReadButtons: [Button] = [{ title: "ok", action: () => camera.current?.openCamera() }];
            const buttons: [Button] = [{ title: "ok", action: () => fullOCR.prompt.DOC_READABILITY.withButtons(docReadButtons) }];
            return bio.prompt.INITIAL_SELFIE.withButtons(buttons);
        },
        [],
    );

    return [cbk, state.status === "running"] as const;
};

import * as delMessages from "ziro-messages/dist/src/catalogo/pay/chooseCard";
import * as regMessages from "ziro-messages/dist/src/catalogo/antifraude/registerCard";
import * as commonMessages from "ziro-messages/dist/src/catalogo/antifraude/common";

export const deleteFirestore = (error: any) => {
    throw delMessages.prompt.CANNOT_DELETE_FROM_FIRESTORE.withAdditionalData({ error });
};

export const saveFirestore = (where: string) => (error: any) => {
    throw commonMessages.prompt.CANNOT_SAVE_TO_FIRESTORE.withAdditionalData({ error, where });
};

import { useAsyncEffect } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { UseBiometry } from "../main";
import { sendWhats } from "@bit/vitorbarbosa19.ziro.utils.whatsapp";
import { Storeowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";

export const useWhatsAppEffect = (recipients: string[], state: UseBiometry.State, userData: Storeowner) => {
    return useAsyncEffect(async () => {
        if (state.status === "failed") {
            await sendWhats({
                recipients,
                template_name: "antifraud-trouble",
                template_parameters: { razao: userData.razao, errorName: state.error.title },
            });
        }
        if (state.status === "success" && state.result.status === "pendingManualApproval") {
            await sendWhats({
                recipients,
                template_name: "antifraud-manual-approval",
                template_parameters: { razao: userData.razao },
            });
        }
    }, [state.status]);
};

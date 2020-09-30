import { useAsyncEffect } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { UseFullOCR } from "../main";
import { sendWhats } from "@bit/vitorbarbosa19.ziro.utils.whatsapp";
import { Storeowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";

export const useWhatsAppEffect = (state: UseFullOCR.State, userData: Storeowner) => {
    return useAsyncEffect(async () => {
        if (state.status === "failed") {
            await sendWhats({
                recipients: ["15306017334", "971558399235", "5511962237883", "5511999280824"],
                template_name: "antifraud-trouble",
                template_parameters: { razao: userData.razao, errorName: state.error.title },
            });
        }
    }, [state.status]);
};

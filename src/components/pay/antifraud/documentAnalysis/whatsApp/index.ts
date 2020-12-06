import { Storeowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { isPrompt } from "ziro-messages";

export const createWhatsData = (recipients: string[], userData: Storeowner, error: any) => {
    const template_parameters = { razao: "não há", errorName: "desconhecido" };
    if (userData) template_parameters.razao = userData.razao;
    if (isPrompt(error)) template_parameters.errorName = error.title;
    else if (error instanceof Error) template_parameters.errorName = error.name;
    return {
        recipients,
        template_name: "antifraud-trouble" as const,
        template_parameters,
    };
};

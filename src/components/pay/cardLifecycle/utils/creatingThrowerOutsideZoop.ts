import { ZiroPromptMessage } from "ziro-messages";

export const createThrowerOutsideZoop = ({ title, userDescription, userResolution, error, internalDescription }) => {
    const FailureMessage = new ZiroPromptMessage({
        name: "failure",
        type: "destructive",
        code: "400",
        title: title, //"Ocorreu um erro no pagamento",
        userDescription: userDescription, //"Fique tranquilo, você não foi cobrado!",
        userResolution: userResolution, //"Aconteceu um erro de split, contate o suporte!",
        internalDescription: internalDescription,
        illustration: "errorLoading",
        additionalData: {
            data: {
                error: {
                    message: error,
                    message_display: `${userDescription} ${userResolution}`,
                    status: 400,
                },
            },
        },
    });

    return FailureMessage;
};

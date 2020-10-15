import { formatDateUTC3 } from "@ziro/format-date-utc3";
import { sheet } from "@bit/vitorbarbosa19.ziro.utils.sheets";

const writeError = async (error) => {
    if (error.additionalData) {
        console.log(error.additionalData);
        const { message, message_display } = error.additionalData.data?.error ?? { message: "" };
        const errorMessage = message ? message : error.additionalData.data;
        const userMessage = message_display ?? "";
        const authorizer = error.additionalData.data?.gateway_authorizer ?? "";
        const [creation, authorization] = error.additionalData.data?.history ?? [null, null];
        const zoopStatus = creation?.status ?? "";
        const { response_code, response_message } = authorization ?? { response_code: "", response_message: "" };
        try {
            const values = [
                [
                    formatDateUTC3(new Date()),
                    "Pagamento sem cadastro",
                    "-",
                    errorMessage,
                    userMessage,
                    authorizer,
                    zoopStatus,
                    response_code,
                    response_message,
                ],
            ];
            await sheet(process.env.SHEET_ID_TRANSACTIONS).write({ values, range: "Transacoes_Erros!A1" });
            await db.collection("credit-card-errors").add({
                date: new Date(),
                buyerRazao: "Pagamento sem cadastro",
                errorMessage,
                userMessage,
                authorizer,
                zoopStatus,
                acquirerStatus: response_code,
                acquirerMsg: response_message,
            });
            if (message_display) return { msg: message_display, customError: true };
            return errorMessage;
        } catch (error) {
            return error;
        }
    }
    return error;
};

export default writeError;

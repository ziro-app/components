import { formatDateUTC3 } from "@ziro/format-date-utc3";
import { DetachedCheckoutError } from "../types";

export default (error: DetachedCheckoutError) => {
    const { message, message_display } = error.additionalData.data?.error ?? { message: "" };
    const errorMessage = message ? message : error.additionalData.data;
    const userMessage = message_display ?? "";
    const authorizer = error.additionalData.data?.gateway_authorizer ?? "";
    const [creation, authorization] = error.additionalData.data?.history ?? [null, null];
    const zoopStatus = creation?.status ?? "";
    const { response_code, response_message } = authorization ?? { response_code: "", response_message: "" };
    const sheetData = [
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
    const dbData = {
        date: new Date(),
        buyerRazao: "Pagamento sem cadastro",
        errorMessage,
        userMessage,
        authorizer,
        zoopStatus,
        acquirerStatus: response_code,
        acquirerMsg: response_message,
    };
    return [sheetData, dbData] as [typeof sheetData, typeof dbData];
};

import { CreateCardToken } from "./types";

export const createCardTokenParser: CreateCardToken.Request.Parser = ({
    cardholder: holder_name,
    number,
    cvv: security_code,
    expiry,
}) => {
    const [expiration_month, expiration_year] = expiry.replace("/", "/20").split("/");
    const card_number = number.replace(" ", "");
    return { holder_name, expiration_month, expiration_year, card_number, security_code };
};

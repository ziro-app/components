import { GetCard } from "./GetCard";

export namespace CreateCardToken {
    export interface Response {
        id: string;
        resource: string;
        used: boolean;
        type: string;
        card: GetCard.Response;
        uri: string;
        created_at: string;
        updated_at: string;
    }
    export namespace Request {
        export interface Parsed {
            holder_name: string;
            expiration_month: string;
            expiration_year: string;
            card_number: string;
            security_code: string;
        }
        export interface Unparsed {
            cardholder: string;
            number: string;
            cvv: string;
            expiry: string;
        }
        export type Parser = (unparsed: Unparsed) => Parsed;
    }
}

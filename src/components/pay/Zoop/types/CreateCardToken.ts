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
    export interface Request {
        holder_name: string;
        expiration_month: string;
        expiration_year: string;
        card_number: string;
        security_code: string;
    }
}

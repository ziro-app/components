import { VerificationChecklist } from "./VerificationCheckList";

export namespace GetCard {
    export interface Response {
        id: string;
        resource: string;
        description: string | null;
        card_brand: string;
        first4_digits: string;
        last4_digits: string;
        expiration_month: string;
        expiration_year: string;
        holder_name: string;
        is_active: boolean;
        is_valid: boolean;
        is_verified: boolean;
        customer: string;
        fingerprint: string;
        address: string | null;
        verification_checklist: VerificationChecklist;
        metadata: Object;
        uri: string;
        created_at: string;
        updated_at: string;
    }
}

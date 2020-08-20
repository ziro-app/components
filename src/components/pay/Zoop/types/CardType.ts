export namespace ZoopCard {

    export interface VerificationChecklist {
        postal_code_check: string;
        security_code_check: string;
        address_line1_check: string;
    }

    export interface Info {
        id: string;
        resource: string;
        description: string|null;
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
        address: string|null;
        verification_checklist: VerificationChecklist;
        metadata: Object;
        uri: string;
        created_at: string;
        updated_at: string;
    }

}
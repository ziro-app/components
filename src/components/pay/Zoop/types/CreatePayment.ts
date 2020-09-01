export namespace CreatePayment {
    export interface UnregisteredCard {
        holder_name: string;
        expiration_month: number;
        expiration_year: number;
        card_number: number;
        security_code: number;
    }

    export interface RegisteredCard {
        id: string;
    }

    export interface CreditSource {
        usage: string;
        amount: number;
        currency: string;
        type: "card";
        card: UnregisteredCard | RegisteredCard;
    }

    export interface InstallmentPlan {
        mode: "interest_free";
        number_installments: number;
    }

    export interface SplitRule {
        recipient: string;
        percentage: number;
        amount: number;
        liable: boolean;
        charge_processing_fee: boolean;
    }

    export interface CreditRequest {
        sendCompleteError?: boolean;
        payment_type: "credit";
        capture: boolean;
        on_behalf_of: string;
        customer?: string;
        statement_descriptor?: string;
        source: CreditSource;
        installment_plan: InstallmentPlan;
        split_rules?: SplitRule[];
    }
}

declare module namespace {
    export interface VerificationChecklist {
        postal_code_check: string;
        security_code_check: string;
        address_line1_check: string;
    }

    export interface Metadata {}

    export interface PaymentMethod {
        id: string;
        resource: string;
        description?: any;
        card_brand: string;
        first4_digits: string;
        last4_digits: string;
        expiration_month: string;
        expiration_year: string;
        holder_name: string;
        is_active: boolean;
        is_valid: boolean;
        is_verified: boolean;
        customer?: any;
        fingerprint: string;
        address?: any;
        verification_checklist: VerificationChecklist;
        metadata: Metadata;
        uri: string;
        created_at: Date;
        updated_at: Date;
    }

    export interface VerificationChecklist2 {
        postal_code_check: string;
        security_code_check: string;
        address_line1_check: string;
    }

    export interface Metadata2 {}

    export interface Card {
        id: string;
        resource: string;
        description?: any;
        card_brand: string;
        first4_digits: string;
        last4_digits: string;
        expiration_month: string;
        expiration_year: string;
        holder_name: string;
        is_active: boolean;
        is_valid: boolean;
        is_verified: boolean;
        customer?: any;
        fingerprint: string;
        address?: any;
        verification_checklist: VerificationChecklist2;
        metadata: Metadata2;
        uri: string;
        created_at: Date;
        updated_at: Date;
        amount: string;
    }

    export interface Source {
        id: string;
        status: string;
        usage: string;
        amount: string;
        currency: string;
        description?: any;
        statement_descriptor?: any;
        type: string;
        card: Card;
    }

    export interface PointOfSale {
        entry_mode: string;
        identification_number?: any;
    }

    export interface Metadata3 {}

    export interface PaymentAuthorization {
        authorizer_id: string;
        authorization_code: string;
        authorization_nsu: string;
    }

    export interface History {
        id: string;
        transaction: string;
        amount: string;
        operation_type: string;
        status: string;
        response_code: string;
        response_message: string;
        authorization_code: string;
        authorizer_id: string;
        authorization_nsu: string;
        gatewayResponseTime: string;
        authorizer: string;
        created_at: string;
    }

    export interface RootObject {
        id: string;
        resource: string;
        status: string;
        amount: string;
        original_amount: string;
        currency: string;
        description?: any;
        payment_type: string;
        transaction_number: string;
        gateway_authorizer: string;
        app_transaction_uid?: any;
        refunds?: any;
        rewards?: any;
        discounts?: any;
        pre_authorization?: any;
        sales_receipt: string;
        on_behalf_of: string;
        customer?: any;
        statement_descriptor: string;
        payment_method: PaymentMethod;
        source: Source;
        point_of_sale: PointOfSale;
        installment_plan?: any;
        refunded: boolean;
        voided: boolean;
        captured: boolean;
        fees: string;
        fee_details?: any;
        location_latitude?: any;
        location_longitude?: any;
        uri: string;
        metadata: Metadata3;
        expected_on: Date;
        created_at: Date;
        updated_at: Date;
        payment_authorization: PaymentAuthorization;
        history: History[];
    }
}

import type { VerificationChecklist } from "./VerificationCheckList";

export namespace UnregisteredTransaction {
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
        metadata: object;
        uri: string;
        created_at: Date;
        updated_at: Date;
    }

    export interface SplitRule {
        recipient: string;
        percentage: number;
        amount: number;
        liable: boolean;
        charge_processing_fee: boolean;
    }

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
        verification_checklist: VerificationChecklist;
        metadata: object;
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

    export interface Response {
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
        metadata: object;
        expected_on: Date;
        created_at: Date;
        updated_at: Date;
        payment_authorization: PaymentAuthorization;
        history: History[];
        split_rules?: {
            resource: string;
            liable: boolean;
            id: string;
            updated_at: string;
            recipient: string;
            transaction: string;
            created_at: string;
            charge_processing_fee: boolean;
            amount: string;
            charge_recipient_processing_fee: boolean;
            is_gross_amount: boolean;
            receivable_gross_amount: string;
            percentage: string;
            receivable_amount: string;
        }[];
    }

    export interface InstallmentPlan {
        mode: "interest_free";
        number_installments: string;
    }

    export interface Request {
        sendCompleteError: boolean;
        payment_type: "credit";
        capture: boolean;
        on_behalf_of: string;
        customer?: string;
        statement_descriptor: string;
        installment_plan?: InstallmentPlan;
        split_rules?: SplitRule[];
        source: {
            usage: "single_use";
            amount: number | string;
            currency: "BRL";
            type: "card";
            card: {
                holder_name: string;
                security_code: string;
                expiration_month: string;
                expiration_year: string;
                card_number: string;
            };
        };
    }
}

export namespace RegisteredTransaction {
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
        metadata: object;
        uri: string;
        created_at: Date;
        updated_at: Date;
    }
    export interface PointOfSale {
        entry_mode: string;
        identification_number?: any;
    }
    export interface PaymentAuthorization {
        authorizer_id: string;
        authorization_code: string;
        authorization_nsu: string;
    }
    export interface Card {
        id: string;
    }

    export interface Source {
        usage: "reusable";
        amount: string;
        currency: "BRL";
        type: "card";
        card: Card;
    }

    export interface InstallmentPlan {
        mode: "interest_free";
        number_installments: string;
    }

    export interface SplitRule {
        recipient: string;
        percentage: number;
        amount: number;
        liable: boolean;
        charge_processing_fee: boolean;
    }

    export interface Request {
        sendCompleteError: true;
        payment_type: "credit";
        capture: boolean;
        on_behalf_of: string;
        customer: string;
        source: Source;
        installment_plan: InstallmentPlan;
        split_rules?: SplitRule[];
        statement_descriptor: string;
    }

    export interface Response {
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
        metadata: object;
        expected_on: Date;
        created_at: Date;
        updated_at: Date;
        payment_authorization: PaymentAuthorization;
        history: History[];
        split_rules?: {
            resource: string;
            liable: boolean;
            id: string;
            updated_at: string;
            recipient: string;
            transaction: string;
            created_at: string;
            charge_processing_fee: boolean;
            amount: string;
            charge_recipient_processing_fee: boolean;
            is_gross_amount: boolean;
            receivable_gross_amount: string;
            percentage: string;
            receivable_amount: string;
        }[];
    }
}

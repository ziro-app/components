import { firestore } from "firebase";

export declare namespace CreditCardPayments {
    export interface AntiFraud {
        recipient: string;
        is_gross_amount: boolean;
        liable: boolean;
        receivable_gross_amount: string;
        amount: string;
        created_at: string;
        receivable_amount: string;
        transaction: string;
        charge_recipient_processing_fee: boolean;
        percentage: string;
        id: string;
        resource: string;
        charge_processing_fee: boolean;
        updated_at: string;
    }

    export interface Markup {
        charge_recipient_processing_fee: boolean;
        is_gross_amount: boolean;
        id: string;
        updated_at: string;
        recipient: string;
        liable: boolean;
        amount: string;
        transaction: string;
        charge_processing_fee: boolean;
        created_at: string;
        resource: string;
        receivable_gross_amount: string;
        receivable_amount: string;
        percentage: string;
    }

    export interface SellerZoopPlan {
        antiFraud: AntiFraud;
        markup: Markup;
    }

    export interface FirebaseDocument {
        cardholder: string;
        cardFirstFour: string;
        buyerStoreownerId: string;
        datePaid: firebase.firestore.Timestamp;
        insurance: boolean;
        installments: string;
        buyerRazao: string;
        dateLinkCreated: firebase.firestore.Timestamp;
        cardBrand: string;
        authorizer: string;
        installmentsMax: string;
        status: string;
        onBehalfOfBrand: string;
        sellerZoopPlan: SellerZoopPlan;
        cardLastFour: string;
        charge: string;
        sellerZoopId: string;
        transactionZoopId: string;
        receiptId: string;
        seller: string;
        checkoutWithoutRegister: boolean;
        dateLastUpdate: firebase.firestore.Timestamp;
        observations: string;
    }
}

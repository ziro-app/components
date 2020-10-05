import { firestore } from "firebase";

export declare namespace CreditCardPayments {
    export interface ZoopPlan {
        percentage: number;
        amount: number;
    }

    export interface FirebaseDocument {
        dateLastUpdate: firestore.Timestamp;
        installmentsMax: string;
        status: string;
        sellerZoopId: string;
        sellerZoopPlan: ZoopPlan;
        insurance: boolean;
        cartId?: string;
        dateLinkCreated: firestore.Timestamp;
        seller: string;
        charge: string;
        observations: string;
        onBehalfOfBrand?: string;
        checkoutWithoutRegister: boolean;
    }
}

import { firestore } from "firebase";

export declare namespace CreditCardPayments {
    export interface ZoopPlan {
        percentage: number;
        amount: number;
    }

    export interface FirebaseDocument {
        dateLastUpdate: firestore.Timestamp;
        maxInstallments: string;
        status: string;
        sellerZoopId: string;
        zoopPlan: ZoopPlan;
        insurance: boolean;
        dateLinkCreated: firestore.Timestamp;
        seller: string;
        charge: string;
        observations: string;
    }
}

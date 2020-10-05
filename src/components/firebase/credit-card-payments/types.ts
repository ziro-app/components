import { firestore } from "firebase";

export declare namespace CreditCardPayments {
    export interface Plan {
        percentage: number;
        amount: number;
    }

    export interface SellerZoopPlan {
        antiFraud?: Plan;
        markup?: Plan;
    }

    export interface FirebaseDocument {
        dateLastUpdate: firestore.Timestamp;
        installmentsMax: string;
        status: string;
        sellerZoopId: string;
        sellerZoopPlan?: SellerZoopPlan;
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

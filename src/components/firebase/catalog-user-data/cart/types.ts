import type firebase from "firebase";

export interface CartItem {
    added: firebase.firestore.Timestamp;
    brandName: string;
    lastUpdate: firebase.firestore.Timestamp;
    status: string;
    updatedBy: string;
    producIds: string[];
    paymentId?: string;
    products: {
        [id: string]: Object;
    };
}

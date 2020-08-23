import { firestore } from "firebase";

export interface CartItem {
    added: firestore.Timestamp;
    brandName: string;
    lastUpdate: firestore.Timestamp;
    status: string;
    updatedBy: string;
    producIds: string[];
    paymentId?: string;
    products: {
        [id: string]: Object;
    };
}

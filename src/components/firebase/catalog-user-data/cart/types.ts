export interface CartItem {
    added: import("firebase").firestore.Timestamp
    brandName: string
    lastUpdate: import("firebase").firestore.Timestamp
    status: string
    updatedBy: string
    producIds: string[]
    paymentId?: string
    products: {
        [id: string]: Object
    }
}
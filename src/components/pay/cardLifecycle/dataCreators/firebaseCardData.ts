import { UnregisteredTransaction } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
export default (transaction: UnregisteredTransaction.Response, timestamp: () => firebase.firestore.FieldValue) =>
    ({
        status: "pendingDocument",
        antifraudTransaction: transaction.amount.replace(".", ""),
        added: timestamp() as any,
        updated: timestamp() as any,
    } as FirebaseCard.Generic);

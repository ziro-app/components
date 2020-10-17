import { UnregisteredTransaction } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
export default (timestamp: () => firebase.firestore.FieldValue, transaction?: UnregisteredTransaction.Response) =>
    transaction
        ? ({
              status: "pendingDocument",
              antifraudTransaction: transaction.amount.replace(".", ""),
              added: timestamp() as any,
              updated: timestamp() as any,
          } as FirebaseCard.Generic)
        : ({
              status: "pendingDocument",
              added: timestamp() as any,
              updated: timestamp() as any,
          } as FirebaseCard.Generic);

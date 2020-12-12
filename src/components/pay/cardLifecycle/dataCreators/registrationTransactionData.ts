import { UnregisteredCard, RegisteredTransaction, UnregisteredTransaction } from "@bit/vitorbarbosa19.ziro.pay.zoop";

export default (card: UnregisteredCard | RegisteredTransaction.Card, supplierZoopId: string, customerZoopId: string, amount: number) =>
    ({
        sendCompleteError: true,
        payment_type: "credit",
        capture: false,
        on_behalf_of: supplierZoopId,
        customer: customerZoopId,
        statement_descriptor: `Ziro`,
        source: {
            usage: "id" in card ? "reusable" : "single_use",
            amount,
            currency: "BRL",
            type: "card",
            card: "id" in card ? { id: card.id } : card,
        },
    } as UnregisteredTransaction.Request);

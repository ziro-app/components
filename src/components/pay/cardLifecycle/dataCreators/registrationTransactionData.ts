import { UnregisteredCard, UnregisteredTransaction } from "@bit/vitorbarbosa19.ziro.pay.zoop";

export default (card: UnregisteredCard, supplierZoopId: string, customerZoopId: string, amount: number) =>
    ({
        sendCompleteError: true,
        payment_type: "credit",
        capture: false,
        on_behalf_of: supplierZoopId,
        customer: customerZoopId,
        statement_descriptor: `Ziro`,
        source: {
            usage: "single_use",
            amount,
            currency: "BRL",
            type: "card",
            card,
        },
    } as UnregisteredTransaction.Request);

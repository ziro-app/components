export namespace VoidPayment {
    export interface Request {
        transaction_id: string;
        on_behalf_of: string;
        amount: string;
    }
}

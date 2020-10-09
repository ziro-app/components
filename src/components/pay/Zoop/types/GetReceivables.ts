export namespace GetReceivables {

    export interface Receivable {
        id: string;
        resource: string;
        status: string;
        recipient: string;
        transaction: string;
        split_rule: string;
        installment: string;
        liable: boolean;
        amount: string;
        gross_amount: string;
        anticipation_fee: string;
        paid_at: string | null;
        created_at: string | null;
        transaction_created_at: string | null;
        canceled_at: string | null;
        expected_on: string | null;
        authorization_code: string;
        id_original_receivable: string | null;
        prepaid: boolean;
    }

    export interface Response {
        id: string;
        resource: string;
        uri: string;
        items: Receivable[];
        has_more: boolean;
        limit: number;
        total_pages: number;
        page: number;
        offset: number | string;
        total: number;
        query_count: number;
    }
}

export namespace CreateBuyer {
    export interface Address {
        line1: string;
        line2?: any;
        line3?: any;
        neighborhood: string;
        city: string;
        state: string;
        postal_code: string;
        country_code: string;
    }
    export interface Response {
        id: string;
        status: string;
        resource: string;
        account_balance: string;
        current_balance: string;
        first_name: string;
        last_name: string;
        taxpayer_id?: any;
        description?: any;
        email: string;
        phone_number?: any;
        facebook?: any;
        twitter?: any;
        address: Address;
        delinquent: boolean;
        payment_methods?: any;
        default_debit?: any;
        default_credit?: any;
        default_receipt_delivery_method?: any;
        uri: string;
        metadata: Object;
        created_at: Date;
        updated_at: Date;
    }
    export namespace Request {
        export interface Parsed {
            first_name: string;
            last_name: string;
            taxpayer_id?: string;
            email: string;
            address: Address;
        }
        export interface Unparsed {
            fname: string;
            lname: string;
            cpf?: string;
            email: string;
            endereco: string;
            bairro: string;
            cidade: string;
            estado: string;
            cep: string;
        }
        export type Parser = (unparsed: Unparsed) => Parsed;
    }
}

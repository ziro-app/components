import type firebase from "firebase";
/**
 * ON TRANSACTION CREATION EXAMPLE
 * {
 *     "sellerZoopPlan": {
 *     "activePlan":"test"
 *         "test": {
 * ziroAntifraudFee: {
 *   visa: {
 *     installment12: '0',
 *     installment3: '0',
 *     installment4: '0',
 *     installment5: '0',
 *     installment2: '0',
 *     installment6: '0',
 *     installment0: '0',
 *     installment11: '0',
 *     installment8: '0',
 *     installment7: '0',
 *     installment9: '0',
 *     installment1: '0',
 *     installment10: '0',
 *   },
 *   hipercard: {
 *     installment6: '0',
 *     installment7: '0',
 *     installment5: '0',
 *     in stallment0: '0',
 *     installment2: '0',
 *     installment9: '0',
 *     installment12: '0',
 *     installment1: '0',
 *     installment10: '0',
 *     installment11: '0',
 *     installment3: '0',
 *     installment8: '0',
 *     installment4: '0',
 *   },
 *   americanexpress: {
 *     installment6: '0',
 *     installment7: '0',
 *     installment5: '0',
 *     installment0: '0',
 *     installment2: '0',
 *     installment9: '0',
 *     installment12: '0',
 *     installment1: '0',
 *     installment10: '0',
 *     installment11: '0',
 *     installment3: '0',
 *     installment8: '0',
 *     installment4: '0',
 *   },
 *   elo: {
 *     installment6: '0',
 *     installment7: '0',
 *     installment5: '0',
 *     installment0: '0',
 *     installment2: '0',
 *     installment9: '0',
 *     installment12: '0',
 *     installment1: '0',
 *     installment10: '0',
 *     installment11: '0',
 *     installment3: '0',
 *     installment8: '0',
 *     installment4: '0',
 *   },
 *   mastercard: {
 *     installment6: '0',
 *     installment7: '0',
 *     installment5: '0',
 *     installment0: '0',
 *     installment2: '0',
 *     installment9: '0',
 *     installment12: '0',
 *     installment1: '0',
 *     installment10: '0',
 *     installment11: '0',
 *     installment3: '0',
 *     installment8: '0',
 *     installment4: '0',
 *   },
 * },
 * ziroMarkupFee: {
 *   hipercard: {
 *     installment6: '0',
 *     installment7: '0',
 *     installment5: '0',
 *     installment0: '0',
 *     installment2: '0',
 *     installment9: '0',
 *     installment12: '0',
 *     installment1: '0',
 *     installment10: '0',
 *     installment11: '0',
 *     installment3: '0',
 *     installment8: '0',
 *     installment4: '0',
 *   },
 *   elo: {
 *     installment6: '0',
 *     installment7: '0',
 *     installment5: '0',
 *     installment0: '0',
 *     installment2: '0',
 *     installment9: '0',
 *     installment12: '0',
 *     installment1: '0',
 *     installment10: '0',
 *     installment11: '0',
 *     installment3: '0',
 *     installment8: '0',
 *     installment4: '0',
 *   },
 *   visa: {
 *     installment6: '0',
 *     installment7: '0',
 *     installment5: '0',
 *     installment0: '0',
 *     installment2: '0',
 *     installment9: '0',
 *     installment12: '0',
 *     installment1: '0',
 *     installment10: '0',
 *     installment11: '0',
 *     installment3: '0',
 *     installment8: '0',
 *     installment4: '0',
 *   },
 *   mastercard: {
 *     installment6: '0',
 *     installment7: '0',
 *     installment5: '0',
 *     installment0: '0',
 *     installment2: '0',
 *     installment9: '0',
 *     installment12: '0',
 *     installment1: '0',
 *     installment10: '0',
 *     installment11: '0',
 *     installment3: '0',
 *     installment8: '0',
 *     installment4: '0',
 *   },
 *   americanexpress: {
 *     installment6: '0',
 *     installment7: '0',
 *     installment5: '0',
 *     installment0: '0',
 *     installment2: '0',
 *     installment9: '0',
 *     installment12: '0',
 *     installment1: '0',
 *     installment10: '0',
 *     installment11: '0',
 *     installment3: '0',
 *     installment8: '0',
 *     installment4: '0',
 *   },
 * },
 * zoopFee: {
 *   hipercard: {
 *     installment0: '1.32',
 *     installment1: '2.08',
 *     installment2: '2.93',
 *     installment3: '2.93',
 *     installment4: '2.93',
 *     installment5: '2.93',
 *     installment6: '2.93',
 *     installment7: '3.23',
 *     installment8: '3.23',
 *     installment9: '3.23',
 *     installment10: '3.23',
 *     installment11: '3.23',
 *     installment12: '3.23',
 *   },
 *   elo: {
 *     installment0: '1.28',
 *     installment1: '2.27',
 *     installment2: '2.51',
 *     installment3: '2.51',
 *     installment4: '2.51',
 *     installment5: '2.51',
 *     installment6: '2.51',
 *     installment7: '2.93',
 *     installment8: '2.93',
 *     installment9: '2.93',
 *     installment10: '2.93',
 *     installment11: '2.93',
 *     installment12: '2.93',
 *   },
 *   visa: {
 *     installment0: '1.12',
 *     installment1: '1.54',
 *     installment2: '1.73',
 *     installment3: '1.73',
 *     installment4: '1.73',
 *     installment5: '1.73',
 *     installment6: '1.73',
 *     installment7: '2.19',
 *     installment8: '2.19',
 *     installment9: '2.19',
 *     installment10: '2.19',
 *     installment11: '2.19',
 *     installment12: '2.19',
 *   },
 *   mastercard: {
 *     installment0: '1.32',
 *     installment1: '2.3',
 *     installment2: '2.54',
 *     installment3: '2.54',
 *     installment4: '2.54',
 *     installment5: '2.54',
 *     installment6: '2.54',
 *     installment7: '2.65',
 *     installment8: '2.65',
 *     installment9: '2.65',
 *     installment10: '2.65',
 *     installment11: '2.65',
 *     installment12: '2.65',
 *   },
 *   americanexpress: {
 *     installment0: '0',
 *     installment1: '2.77',
 *     installment2: '2.99',
 *     installment3: '2.99',
 *     installment4: '2.99',
 *     installment5: '2.99',
 *     installment6: '2.99',
 *     installment7: '3.14',
 *     installment8: '3.14',
 *     installment9: '3.14',
 *     installment10: '3.14',
 *     installment11: '3.14',
 *     installment12: '3.14',
 *   },
 * },
 *},
 *     },
 *     "checkoutWithoutRegister": false,
 *     "dateLinkCreated": {
 *         "seconds": 1604012615,
 *         "nanoseconds": 608000000
 *     },
 *     "insurance": false,
 *     "status": "Aguardando Pagamento",
 *     "charge": "100",
 *     "dateLastUpdate": {
 *         "seconds": 1604012615,
 *         "nanoseconds": 608000000
 *     },
 *     "sellerZoopId": "13c09ab817014ae6843634493177afb2",
 *     "installmentsMax": "3",
 *     "seller": "Ziro",
 *     "observations": "teste"
 * }
 */

/**
 * ON TRANSACTION PAID EXAMPLE
 *
 * {
 *     "checkoutWithoutRegister": false,
 *     "buyerStoreownerId": "qRt2iwwGlf5iy1Kf03no",
 *     "status": "Pré Autorizado",
 *     "datePaid": {
 *         "seconds": 1604007302,
 *         "nanoseconds": 875000000
 *     },
 *     "seller": "Ziro",
 *     "dateLinkCreated": {
 *         "seconds": 1604003278,
 *         "nanoseconds": 555000000
 *     },
 *     "dateLastUpdate": {
 *         "seconds": 1604007302,
 *         "nanoseconds": 875000000
 *     },
 *     "sellerZoopId": "13c09ab817014ae6843634493177afb2",
 *     "receiptId": "2d21b3f385b54be6b226e21e683a504c",
 *     "onBehalfOfBrand": "Testnewupload",
 *     "cardLastFour": "7207",
 *     "buyerRazao": "QUITERIA MARQUES DA SILVA GENTIL",
 *     "cardholder": "alessandro marques gentil",
 *     "observations": "teste 2",
 *     "transactionZoopId": "080c221cd69b4b7cace263aa08abfca7",
 *     "cardBrand": "MasterCard",
 *     "sellerZoopPlan": {
 *         "antiFraud": {
 *             "created_at": "2020-10-29 21:34:59",
 *             "charge_processing_fee": false,
 *             "receivable_gross_amount": "0.07",
 *             "receivable_amount": "0.07",
 *             "percentage": "7.00",
 *             "liable": true,
 *             "id": "9999f2c1024a44f2b58121269043ed96",
 *             "charge_recipient_processing_fee": false,
 *             "transaction": "080c221cd69b4b7cace263aa08abfca7",
 *             "amount": "0.00",
 *             "resource": "split_rule",
 *             "updated_at": "2020-10-29 21:34:59",
 *             "is_gross_amount": false,
 *             "recipient": "13c09ab817014ae6843634493177afb2"
 *         },
 *         "markup": {
 *             "percentage": "3.00",
 *             "amount": "0.00",
 *             "charge_recipient_processing_fee": false,
 *             "id": "2fe54564c533452790e3d91864a7b52d",
 *             "receivable_gross_amount": "0.03",
 *             "is_gross_amount": false,
 *             "created_at": "2020-10-29 21:34:59",
 *             "recipient": "13c09ab817014ae6843634493177afb2",
 *             "resource": "split_rule",
 *             "transaction": "080c221cd69b4b7cace263aa08abfca7",
 *             "receivable_amount": "0.03",
 *             "updated_at": "2020-10-29 21:34:59",
 *             "charge_processing_fee": false,
 *             "liable": true
 *         }
 *     },
 *     "cardFirstFour": "5502",
 *     "authorizer": "rede",
 *     "installmentsMax": "3",
 *     "charge": "100",
 *     "installments": "3",
 *     "insurance": true
 * }
 */

export declare namespace CreditCardPayments {
    export namespace SplitRule {
        export interface BeforePayment {
            percentage: number | string;
            amount: number | string;
        }
        export interface AfterPayment extends BeforePayment {
            recipient: string;
            is_gross_amount: boolean;
            liable: boolean;
            receivable_gross_amount: string;
            created_at: string;
            receivable_amount: string;
            transaction: string;
            charge_recipient_processing_fee: boolean;
            id: string;
            resource: string;
            charge_processing_fee: boolean;
            updated_at: string;
        }
    }

    export namespace SellerZoopPlan {
        export interface BeforePayment {
            activePlan: SplitRule.BeforePayment;
            plan: {
                ziroAntifraudFee: SplitRule.BeforePayment;
                ziroMarkupFee: SplitRule.BeforePayment;
                zoopFee: SplitRule.BeforePayment;
            };
        }
        export interface AfterPayment {
            antiFraud: SplitRule.AfterPayment;
            markup: SplitRule.AfterPayment;
        }
    }

    export namespace Payment {
        export type Status = "Aguardando Pagamento" | "Pré Autorizado" | "Aprovado" | "Atualizando";
        interface Common<S extends Status> {
            sellerZoopPlan: SellerZoopPlan.BeforePayment;
            checkoutWithoutRegister: boolean;
            dateLinkCreated: firebase.firestore.Timestamp;
            insurance: boolean;
            status: S | "Cancelado";
            charge: string;
            dateLastUpdate: firebase.firestore.Timestamp;
            sellerZoopId: string;
            installmentsMax: string;
            seller: string;
            observations: string;
            onBehalfOfBrand?: string;
            cartId?: string;
        }
        // @ts-ignore
        interface CommonPreAuthorized<S extends Status> extends Common<S> {
            cardholder: string;
            cardFirstFour: string;
            buyerStoreownerId: string;
            datePaid: firebase.firestore.Timestamp;
            installments: string;
            buyerRazao: string;
            cardBrand: string;
            authorizer: string;
            sellerZoopPlan: SellerZoopPlan.AfterPayment;
            cardLastFour: string;
            transactionZoopId: string;
            receiptId: string;
        }
        interface CommonApproved<S extends Status> extends CommonPreAuthorized<S> {
            fee_details: Object[];
            receivables: Object[];
            fees: string;
        }
        export type WaitingPayment = Common<"Aguardando Pagamento">;
        export type PreAuthorized = CommonPreAuthorized<"Pré Autorizado">;
        export type Updating = CommonPreAuthorized<"Atualizando">;
        export type Approved = CommonApproved<"Aprovado">;
    }
    export type FirebaseDocument = Payment.WaitingPayment | Payment.PreAuthorized | Payment.Updating | Payment.Approved;
}

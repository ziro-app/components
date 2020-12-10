import type firebase from "firebase";
export interface Storeowner {
    cidade: string;
    estado: string;
    cnpj: string;
    cpf?: string;
    uid: string;
    email: string;
    cep: string;
    razao: string;
    endereco: string;
    fone: string;
    lojaFisica: string;
    whatsapp: string;
    registerComplete: string;
    bairro: string;
    cadastro: firebase.firestore.Timestamp;
    fname: string;
    instagram: string;
    lname: string;
    zoopId: string;
    fantasia: string;
    storeownerId: string;
}

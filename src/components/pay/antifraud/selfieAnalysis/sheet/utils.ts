import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";

export const secureStringify = (obj: any) => {
    try {
        return JSON.stringify(obj, null, 4);
    } catch (e) {
        return "não foi possível stringificar o erro";
    }
};

export const joinStrings = (strs: string[], joiner = " "): string => {
    if (strs.length === 0) return "";
    const filteredStrs = strs.filter((s) => !!s);
    if (filteredStrs.length === 0) return "";
    return filteredStrs.join(joiner);
};

export const filterNonStringFields = <T extends (...args: any) => any[]>(func: T) => (...args: Parameters<T>) => [
    func(...args).map((field) => (typeof field === "string" ? field : "campo inválido")),
];

export const formatExpiry = ({ expiration_month, expiration_year }: ZoopCard) => {
    const month = expiration_month.length === 1 ? `0${expiration_month}` : expiration_month;
    const year = expiration_year.slice(2);
    return `${month}/${year}`;
};

export const formatCPF = (cpf: string) => {
    if (cpf.length !== 11) return cpf;
    const first = cpf.slice(0, 3);
    const second = cpf.slice(3, 6);
    const third = cpf.slice(6, 9);
    const last = cpf.slice(9);
    return `${first}.${second}.${third}-${last}`;
};

export const formatProbability = (prob: string | number) => `${prob}`.replace(".", ",");

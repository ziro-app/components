import creditCardType from "credit-card-type";
import { useMemo, useState, useCallback } from "react";
import { isFullName, normalize } from "@bit/vitorbarbosa19.ziro.utils.string";
import maskInput from "@ziro/mask-input";
import type { StateWithoutInstallments } from "./types";

export const useCreditCard = () => {
    const [number, setNumber] = useState("");
    const [cardholder, setCardholder] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const { niceType, type, lengths, code, gaps } = useMemo(
        () => (number && creditCardType(number)[0]) || ({} as ReturnType<typeof creditCardType>[0]),
        [number],
    );
    const [cvvMask, cvvPlaceholder, cvvPlaceholderWithAsterisk] = useMemo(
        () => [
            Array.from(Array(code?.size || 3).keys())
                .map(() => "#")
                .join(""),
            Array.from(Array(code?.size || 3).keys())
                .map(() => "1")
                .join(""),
            Array.from(Array(code?.size || 3).keys())
                .map((index) => cvv[index] || "*")
                .join(""),
        ],
        [code?.size, cvv],
    );
    const onChange = {
        number: useCallback(
            ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
                const newValue = value.replace(/[^0-9]/g, "");
                if (newValue.length <= Math.max(...(lengths || [16]))) setNumber(newValue);
            },
            [lengths],
        ),
        cardholder: useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setCardholder(value.toLowerCase()), []),
        expiry: useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setExpiry(maskInput(value, "##/##", true)), []),
        cvv: useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setCvv(maskInput(value, cvvMask, true)), [cvvMask]),
    };
    const [prettyNumber, prettyNumberWithAsterisks] = useMemo(() => {
        const _lengths = lengths || [16];
        const _gaps = gaps || [4, 8, 12];
        const _number = [];
        const _numberWithAsterisks = [];
        const length = Math.min(..._lengths.filter((l) => l >= number.length));
        let usedSpaces = 0;
        for (let i = 0; i < length + _gaps.length; i++) {
            if (i - usedSpaces === _gaps[usedSpaces]) {
                _number.push(" ");
                _numberWithAsterisks.push(" ");
                usedSpaces += 1;
            } else {
                if (number[i - usedSpaces]) {
                    _number.push(number[i - usedSpaces]);
                    _numberWithAsterisks.push(number[i - usedSpaces]);
                } else _numberWithAsterisks.push("*");
            }
        }
        return [_number.join("").trim(), _numberWithAsterisks.join("").trim()];
    }, [lengths, number]);
    const state = useMemo<Omit<StateWithoutInstallments, "shouldTransact">>(() => {
        const [expiration_month, expiration_year] = expiry.replace("/", "/20").split("/");
        return {
            holder_name: cardholder,
            security_code: cvv,
            expiration_month,
            expiration_year,
            card_number: number,
        };
    }, [number, cardholder, expiry, cvv]);
    const validations = useMemo(
        () => [
            {
                name: "number",
                validation: (value) => !!value && (!lengths || lengths.includes(value.replace(/\s/g, "").length)),
                value: number,
                message: "Revise número digitado",
            },
            {
                name: "cardholder",
                validation: (value) => !!value && isFullName(normalize(value)),
                value: cardholder,
                message: "Revise nome digitado",
            },
            {
                name: "expiry",
                validation: (value) => {
                    if (!value || value.length !== 5) return false;
                    const [month, year] = value.split("/").map(Number);
                    if (month > 12) return false;
                    if (new Date(2000 + year, month - 1).getTime() < Date.now()) return false;
                    return true;
                },
                value: expiry,
                message: "Revise campo",
            },
            {
                name: "cvv",
                validation: (value) => !!value && (!code?.size || value.replace(/\s/g, "").length === code.size),
                value: cvv,
                message: "Revise campo",
            },
        ],
        [number, lengths, cardholder, expiry, cvv, code?.size],
    );
    return {
        cvvPlaceholder,
        cvvPlaceholderWithAsterisk,
        state,
        cardholder,
        expiry,
        cvv,
        validations,
        prettyNumber,
        prettyNumberWithAsterisks,
        type,
        code,
        onChange,
    };
};

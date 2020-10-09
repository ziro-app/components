import React, { useState, useMemo } from "react";
import FlowForm from "@bit/vitorbarbosa19.ziro.flow-form";
import FormInput from "@bit/vitorbarbosa19.ziro.form-input";
import InputText from "@bit/vitorbarbosa19.ziro.input-text";
import { useHeader } from "@bit/vitorbarbosa19.ziro.flow-manager";
import CreditCard from "@bit/vitorbarbosa19.ziro.credit-card";
import maskInput from "@ziro/mask-input";
import { isFullName } from "@bit/vitorbarbosa19.ziro.utils.string";
import creditCardType from "credit-card-type";
import pretty from "./utils/pretty";
import { dual } from "./styles";
import type { Props, State } from "./types";

const FlowRegisterCard: React.FC<Props> = ({ header, next, previous }) => {
    const [number, setNumber] = useState("");
    const [cardholder, setCardholder] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const { niceType, type, lengths, code } = creditCardType(number)[0];
    const state = useMemo<State>(() => ({ number, cardholder, expiry, cvv, brand: niceType }), [number, cardholder, expiry, cvv, niceType]);

    const validations = useMemo(
        () => [
            {
                name: "number",
                validation: (value) => !!value && lengths.includes(value.replace(/\s/g, "").length),
                value: number,
                message: "Revise número digitado",
            },
            {
                name: "cardholder",
                validation: (value) => !!value && isFullName(value),
                value: cardholder,
                message: "Campo obrigatório",
            },
            {
                name: "expiry",
                validation: (value) => !!value && value.length === 5,
                value: expiry,
                message: "Revise campo",
            },
            {
                name: "cvv",
                validation: (value) => !!value && value.replace(/\s/g, "").length === code.size,
                value: cvv,
                message: "Revise campo",
            },
        ],
        [number, lengths, cardholder, expiry, cvv, code.size],
    );

    useHeader(
        <div style={{ height: 45 + Math.min(window.innerWidth, 300) / 1.75, background: "white" }}>
            {header}
            <CreditCard
                number={pretty(number, type)}
                brand={niceType}
                cardholder={cardholder}
                expiry={expiry}
                cvv={cvv}
                cvvSize={code.size}
                cvvName={code.name}
            />
        </div>,
        [header, pretty, niceType, cardholder, expiry, cvv, code.size, code.name],
    );

    const cvvMask = useMemo(
        () =>
            Array.from(Array(code.size).keys())
                .map(() => "#")
                .join(""),
        [code.size],
    );

    return (
        <FlowForm
            padding="30px 20px 10px 20px"
            next={{
                onClick: () => next.onClick(state),
                name: next.name,
            }}
            previous={{
                onClick: () => previous.onClick(state),
                name: previous.name,
            }}
            validations={validations}
            setError={(error) => console.log({ error })}
            inputs={[
                <FormInput
                    name="number"
                    label="Número do cartão"
                    input={
                        <InputText
                            value={number}
                            onChange={({ target: { value } }) => setNumber(pretty(value, type))}
                            placeholder="1234 1234 1234 1234"
                            inputMode="numeric"
                        />
                    }
                />,
                <FormInput
                    name="cardholder"
                    label="Titular do cartão"
                    input={
                        <InputText
                            value={cardholder}
                            onChange={({ target: { value } }) => setCardholder(value.toLowerCase())}
                            placeholder="Fernando(a) da Silva"
                        />
                    }
                />,
                <div style={dual}>
                    <FormInput
                        name="expiry"
                        label="Validade"
                        input={
                            <InputText
                                value={expiry}
                                onChange={({ target: { value } }) => setExpiry(maskInput(value, "##/##", true))}
                                placeholder="01/24"
                                inputMode="numeric"
                            />
                        }
                    />
                    <FormInput
                        name="cvv"
                        label="CVV"
                        input={
                            <InputText
                                value={cvv}
                                onChange={({ target: { value } }) => setCvv(maskInput(value, cvvMask, true))}
                                placeholder="1111"
                                inputMode="numeric"
                            />
                        }
                    />
                </div>,
            ]}
        />
    );
};

export default FlowRegisterCard;

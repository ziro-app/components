import React, { useState, useMemo } from "react";
import FlowForm from "@bit/vitorbarbosa19.ziro.flow-form";
import FormInput from "@bit/vitorbarbosa19.ziro.form-input";
import InputText from "@bit/vitorbarbosa19.ziro.input-text";
import { useHeader } from "@bit/vitorbarbosa19.ziro.flow-manager";
import CreditCard from "./CreditCard";
import maskInput from "@ziro/mask-input";
import { isFullName } from "@bit/vitorbarbosa19.ziro.utils.string";
import { useCreditCard } from "./useCreditCard";
import { dual } from "./styles";
import type { Props } from "./types";

const FlowRegisterCard: React.FC<Props> = ({ header, next, previous }) => {
    const {
        state,
        cardholder,
        expiry,
        cvv,
        validations,
        prettyNumber,
        prettyNumberWithAsterisks,
        cvvPlaceholder,
        type,
        code,
        lengths,
        setNumber,
        setCardholder,
        setExpiry,
        setCvv,
    } = useCreditCard();

    useHeader(
        <div style={{ height: 45 + Math.min(window.innerWidth, 300) / 1.75, background: "white" }}>
            {header}
            <CreditCard
                number={prettyNumberWithAsterisks}
                brand={type}
                cvvName={code.name}
                cvv={cvvPlaceholder}
                cardholder={cardholder}
                expiry={expiry}
                setCardHeight={console.log}
            />
        </div>,
        [header, prettyNumberWithAsterisks, type, code, cvvPlaceholder, cardholder, expiry],
    );

    const cvvMask = useMemo(
        () =>
            Array.from(Array(code.size).keys())
                .map(() => "#")
                .join(""),
        [code.size],
    );

    const _next = useMemo(
        () => ({
            onClick: () => next.onClick(state),
            name: next.title || "próximo",
        }),
        [next.onClick.toString(), next.title, state],
    );

    const _previous = useMemo(
        () =>
            previous
                ? {
                      onClick: () => previous.onClick(state),
                      name: previous?.title,
                  }
                : undefined,
        [previous?.onClick.toString(), previous?.title, state],
    );

    return (
        <FlowForm
            padding="30px 20px 10px 20px"
            next={_next}
            previous={_previous}
            validations={validations}
            inputs={[
                <FormInput
                    name="number"
                    label="Número do cartão"
                    input={<InputText value={prettyNumber} onChange={setNumber} placeholder="1234 1234 1234 1234" inputMode="numeric" />}
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

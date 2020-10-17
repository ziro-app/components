import React, { useMemo, useState } from "react";
import FlowForm from "@bit/vitorbarbosa19.ziro.flow-form";
import FormInput from "@bit/vitorbarbosa19.ziro.form-input";
import InputText from "@bit/vitorbarbosa19.ziro.input-text";
import Dropdown from "@bit/vitorbarbosa19.ziro.dropdown";
import { useHeader } from "@bit/vitorbarbosa19.ziro.flow-manager";
import ToggleButton from "@bit/vitorbarbosa19.ziro.toggle-button";
import currencyFormat from "@ziro/currency-format";
import { installmentOptions, installmentCharge } from "./installmentUtils";
import CreditCard from "./CreditCard";
import { useCreditCard } from "./useCreditCard";
import { dual, summaryContainer, summary, service, title, total, amount, center, inline } from "./styles";
import type { Props } from "./types";
function FlowRegisterCard({ header, next, previous, showInstallments, installmentsMax, charge, seller }: Props) {
    const {
        state,
        cardholder,
        expiry,
        cvv,
        validations,
        prettyNumber,
        prettyNumberWithAsterisks,
        type,
        code,
        cvvPlaceholder,
        cvvPlaceholderWithAsterisk,
        onChange,
    } = useCreditCard();

    const [installments, setInstallments] = useState("");
    const [shouldTransact, setShouldTransact] = useState(true);

    useHeader(
        <div style={{ height: 45 + Math.min(window.innerWidth, 300) / 1.75, background: "white" }}>
            {header}
            <CreditCard
                number={prettyNumberWithAsterisks}
                brand={type}
                cvvName={code?.name}
                cvv={cvvPlaceholderWithAsterisk}
                cardholder={cardholder}
                expiry={expiry}
            />
        </div>,
        [header, prettyNumberWithAsterisks, type, code, cvvPlaceholderWithAsterisk, cardholder, expiry],
    );

    const _next = useMemo(
        () => ({
            onClick: () =>
                showInstallments === true ? next.onClick({ ...state, installments } as any) : next.onClick({ ...state, shouldTransact } as any),
            name: next.title || "próximo",
        }),
        [next.onClick.toString(), next.title, state, shouldTransact, installments],
    );

    const _previous = useMemo(
        () =>
            previous
                ? {
                      onClick: () =>
                          showInstallments === true
                              ? previous.onClick({ ...state, installments } as any)
                              : previous.onClick({ ...state, shouldTransact } as any),
                      name: previous?.title,
                  }
                : undefined,
        [previous?.onClick.toString(), previous?.title, state, shouldTransact, installments],
    );

    const _validations = useMemo(() => {
        if (!showInstallments) return validations;
        else
            return [
                ...validations,
                {
                    name: "installments",
                    validation: (value) => !!value,
                    value: installments,
                    message: "Campo obrigatório",
                },
            ];
    }, [validations, showInstallments, installments]);

    return (
        <>
            <FlowForm
                padding="30px 20px 10px 20px"
                summary={
                    showInstallments ? (
                        <div style={summaryContainer}>
                            <div style={summary}>
                                <div style={title}>Resumo do pagamento</div>
                                <div style={service}>
                                    <label>{seller}</label>
                                    <label style={total}>{currencyFormat(charge)}</label>
                                </div>
                                <label style={amount}>&nbsp;{installments && `${installments}x de ${installmentCharge(charge, installments)}`}</label>
                            </div>
                        </div>
                    ) : undefined
                }
                next={_next}
                previous={_previous}
                validations={_validations}
                inputs={[
                    <FormInput
                        name="number"
                        label="Número do cartão"
                        input={<InputText value={prettyNumber} onChange={onChange.number} placeholder="1234 1234 1234 1234" inputMode="numeric" />}
                    />,
                    <FormInput
                        name="cardholder"
                        label="Titular do cartão"
                        input={<InputText value={cardholder} onChange={onChange.cardholder} placeholder="Fernando(a) da Silva" />}
                    />,
                    <div style={dual}>
                        <FormInput
                            name="expiry"
                            label="Validade"
                            input={<InputText value={expiry} onChange={onChange.expiry} placeholder="01/24" inputMode="numeric" />}
                        />
                        <FormInput
                            name="cvv"
                            label={code?.name || "CVV"}
                            input={<InputText value={cvv} onChange={onChange.cvv} placeholder={cvvPlaceholder} inputMode="numeric" />}
                        />
                    </div>,
                    ...(showInstallments
                        ? [
                              <FormInput
                                  name="installments"
                                  label="Parcelamento"
                                  input={
                                      <Dropdown
                                          readOnly={true}
                                          value={installments}
                                          onChange={({ target: { value } }) => setInstallments(value.substring(0, 1))}
                                          list={installmentOptions(charge, installmentsMax)}
                                          placeholder="Escolha quantas parcelas"
                                          onChangeKeyboard={(element) => (element ? setInstallments(element.value.substring(0, 1)) : null)}
                                      />
                                  }
                              />,
                          ]
                        : [
                              <FormInput
                                  name="shouldTransact"
                                  label="Deseja verificar seu cartão com uma transação de pequeno valor?"
                                  input={
                                      <div style={center}>
                                          <div style={inline}>Não</div>
                                          <ToggleButton
                                              size={30}
                                              template="primary"
                                              active={shouldTransact}
                                              onClick={() => setShouldTransact((s) => !s)}
                                          />
                                          <div style={inline}>Sim</div>
                                      </div>
                                  }
                              />,
                          ]),
                ]}
            />
        </>
    );
}

export default FlowRegisterCard;

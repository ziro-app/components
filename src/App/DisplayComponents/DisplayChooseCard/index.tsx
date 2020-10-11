import React, { useState, useMemo } from "react";
import Header from "../../../components/Header/index";
import ChooseCard from "../../../components/ChooseCard";
import { CardRowProps } from "../../../components/ChooseCard/CardRow/props";
import { ZoopCard } from "../../../components/pay/Zoop";
import { containerWithPadding } from "@ziro/theme";
import { useCallback } from "react";
import { selectorFamily, RecoilRoot } from "recoil";
import card from "credit-card-type";

const cardAtom: CardRowProps["zoopAtom"] = selectorFamily<ZoopCard, string>({
    key: "cardAtom",
    set: () => () => {},
    get: (cardId: string) => ({ get }) => {
        console.log("cardAtom", { cardId });
        return {
            card_brand: card(cardId)[0]?.type || "Visa",
            first4_digits: (10000 * Math.random()).toFixed(0).toString(),
            last4_digits: (10000 * Math.random()).toFixed(0).toString(),
        } as ZoopCard;
    },
});

export const DisplayChooseCard = () => {
    const [selected, setSelected] = useState();

    console.log({ selected });

    const onDelete = useCallback((index) => {
        console.log("deleting", { index });
    }, []);

    const onClick = useCallback((index) => {
        console.log("clicking", { index });
    }, []);

    const onNewCard = useCallback(() => {
        console.log("new card");
    }, []);

    const cardsCollection = useMemo(
        () => ({
            docs: [
                {
                    id: Math.random()
                        .toString(36)
                        .split(".")[1]
                        .replace(/^[a-z]/g, ""),
                    data: () => ({
                        status: "pendingApproval",
                    }),
                },
                {
                    id: Math.random()
                        .toString(36)
                        .split(".")[1]
                        .replace(/^[a-z]/g, ""),
                    data: () => ({
                        status: "approved",
                    }),
                },
            ],
        }),
        [],
    );

    return (
        <RecoilRoot>
            <div style={{ ...containerWithPadding, userSelect: "none", msUserSelect: "none", MozUserSelect: "none" }}>
                <Header type="title-only" title="Escolha o Cartão" />
                <ChooseCard
                    newCard={onNewCard}
                    zoopAtom={cardAtom}
                    selected={selected}
                    cardsCollection={cardsCollection as any}
                    onClick={onClick}
                    onDelete={onDelete}
                />
            </div>
        </RecoilRoot>
    );
};

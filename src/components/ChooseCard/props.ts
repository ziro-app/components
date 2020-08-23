import { FirebaseCardsCollection } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { CardRowProps } from "./CardRow/props";

export interface ChooseCardProps {
    cardsCollection: FirebaseCardsCollection;
    zoopAtom: CardRowProps["zoopAtom"];
    shouldShowStatus?: boolean;
    selected: string | undefined;
    onClick: (id: string) => void;
    newCard: () => void;
    onDelete: (id: string) => void;
}

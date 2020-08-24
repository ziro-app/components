import React, { useMemo } from "react";
import { ChooseCardProps } from "./props";
import { CardRow } from "./CardRow";
import { AddCard } from "./AddCard";
//@ts-ignore
import { alertColor } from "@ziro/theme";
import { container } from "./style";

const ChooseCard: React.FC<ChooseCardProps> = ({
    cardsCollection,
    zoopAtom,
    selected,
    onClick,
    newCard,
    onDelete,
    shouldShowStatus,
}) => {
    const rightButton = useMemo(() => ({ icon: "trash", color: alertColor, onClick: onDelete }), [onDelete]);
    return (
        <div style={container}>
            {cardsCollection.docs.map((doc) => (
                <CardRow
                    key={doc.id}
                    zoopAtom={zoopAtom}
                    firebaseCard={doc}
                    onClick={onClick}
                    rightButton={rightButton}
                    shouldShowStatus={shouldShowStatus}
                    selected={selected}
                />
            ))}
            <AddCard onClick={newCard} />
        </div>
    );
};

export default ChooseCard;

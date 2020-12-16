import React, { useMemo } from "react";
import { ChooseCardProps } from "./props";
import { CardRow } from "./CardRow";
import { AddCard } from "./AddCard";
//@ts-ignore
import { alertColor } from "@ziro/theme";
import TooltipHelp from "@bit/vitorbarbosa19.ziro.tooltip-help";
import { container } from "./style";

export { CardRow };

const ChooseCard: React.FC<ChooseCardProps> = ({ cardsCollection, zoopAtom, selected, onClick, newCard, onDelete, shouldShowStatus }) => {
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

            {cardsCollection.empty && (
                <p style={{ paddingTop: "20px", textAlign: "center", cursor: "default", fontSize: "1.4rem" }}>
                    Adicione um cartão para pagar sua compra{" "}
                    <TooltipHelp
                        illustration="onlinePosts"
                        title="Vantagens de adicionar o cartão"
                        body="Não salvamos seu cartão e jamais temos acesso a ele, pois fica criptografado 
                        na Cielo e Rede em total segurança. Apenas te vinculamos a um código que representa 
                        seu cartão. Assim, sua próxima compra é feita com apenas um clique! Dúvidas, 
                        só falar conosco!!"
                        supportButton
                    />
                </p>
            )}
        </div>
    );
};

export default ChooseCard;

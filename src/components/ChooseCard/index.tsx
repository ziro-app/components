import React, { useMemo } from "react";
import { ChooseCardProps } from "./props";
import { CardRow } from "./CardRow";
import { AddCard } from "./AddCard";
//@ts-ignore
import { alertColor } from "@ziro/theme";
import TooltipHelp from "../TooltipHelp"
import { container } from "./style";

export { CardRow };

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

            {!cardsCollection && (
                <p style={{textAlign: 'center', cursor: 'default', fontSize: '1.4rem'}}>
                    Por que salvar meu cartão{' '}
                    <TooltipHelp 
                        illustration='onlinePosts'
                        title='Vantagens em ter seu cartão salvo'
                        body='Seu cartão não fica salvo em nossa base de dados e 
                        jamais temos acesso a ele. Apenas vinculamos você a um código
                        que representa seu cartão, que fica criptografado com segurança
                        na Cielo e Rede. Assim você pode comprar na próxima vez com
                        apenas um clique! Continua com dúvidas? Fale com nosso suporte!'
                        supportButton
                    />
                </p>
            )}
        </div>
    );
};

export default ChooseCard;

import React, { useCallback, useState } from "react";
import creditCardType from "credit-card-type";
import Icon from "@bit/vitorbarbosa19.ziro.icon";
import { brandLogo, info, header, cardcvv, cardnumber, chip, card } from "./styles";

const cardIcons = {
    [creditCardType.types.AMERICAN_EXPRESS]: "amex",
    [creditCardType.types.VISA]: "visa",
    [creditCardType.types.MASTERCARD]: "mastercard",
    [creditCardType.types.ELO]: "elo",
    [creditCardType.types.HIPERCARD]: "hipercard",
    [creditCardType.types.HIPER]: "hiper",
};

interface CreditCardProps {
    number: string;
    brand: string;
    cvvName: string;
    cvv: string;
    cardholder: string;
    expiry: string;
}

const CreditCard: React.FC<CreditCardProps> = ({ number, brand, cvvName = "CVV", cvv, cardholder, expiry }) => {
    const _brand = cardIcons[brand];
    const [cardWidth, setCardWidth] = useState(0);
    const cardBox = useCallback((htmlNode) => {
        if (htmlNode) setCardWidth(htmlNode.getBoundingClientRect().width);
    }, []);
    return (
        <div style={card(cardWidth)} ref={cardBox}>
            <div style={brandLogo}>{_brand && <Icon type={_brand} />}</div>
            <div style={info}>
                <div style={chip}></div>
                <div style={header}>
                    <div style={cardcvv}>
                        <div>{cvvName}:</div>
                        <div>{cvv}</div>
                    </div>
                </div>
            </div>
            <label style={cardnumber}>{number}</label>
            <div style={info}>
                <label style={header}>{cardholder || "titular do cartão"}</label>
                <label style={header}>{expiry || "**/**"}</label>
            </div>
        </div>
    );
};

export default CreditCard;

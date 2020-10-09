import { getTypeInfo } from "credit-card-type";

export default function prettyCardNumber(cardNumber: string, cardType: string) {
    var card = getTypeInfo(cardType);

    const _cardNumber = cardNumber.replace(/[^0-9]/g, "");

    if (card) {
        var offsets = [].concat(0, card.gaps, _cardNumber.length);
        var components = [];

        for (var i = 0; offsets[i] < _cardNumber.length; i++) {
            var start = offsets[i];
            var end = Math.min(offsets[i + 1], _cardNumber.length);
            components.push(_cardNumber.substring(start, end));
        }

        return components.join(" ");
    }

    return _cardNumber;
}

import { getTypeInfo } from "credit-card-type";

export default function prettyCardNumber(cardNumber: string, cardType: string) {
    var card = getTypeInfo(cardType);

    if (card) {
        var offsets = [].concat(0, card.gaps, cardNumber.length);
        var components = [];

        for (var i = 0; offsets[i] < cardNumber.length; i++) {
            var start = offsets[i];
            var end = Math.min(offsets[i + 1], cardNumber.length);
            components.push(cardNumber.substring(start, end));
        }

        return components.join(" ");
    }

    return cardNumber;
}

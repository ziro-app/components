import simpleMatch from "./simpleMatch";
import matchChars from "./matchChars";
import matchSubstring from "./matchSubstring";
import { isFullName, normalize } from "@bit/vitorbarbosa19.ziro.utils.string";
import { MatchAlgorithm } from "./types";

export const validateAndNormalize = (cardName: string, docName: string) => {
    if (!cardName || typeof cardName !== "string") throw new Error(`card name must be a non empty string, but ${cardName}`);
    if (!docName || typeof docName !== "string") throw new Error(`doc name must be a non empty string, but ${docName}`);
    const normalizedCardName = normalize(cardName)
        .split(" ")
        .filter((arr) => arr.length > 2)
        .join(" ");
    const normalizedDocName = normalize(docName)
        .split(" ")
        .filter((arr) => arr.length > 2)
        .join(" ");
    if (!isFullName(normalizedCardName)) throw new Error(`card name must be a compound name, but ${cardName}`);
    if (!isFullName(normalizedDocName)) throw new Error(`doc name must be a compound name, but ${docName}`);
    return [normalizedCardName, normalizedDocName] as [string, string];
};

const match: MatchAlgorithm = (cardName, docName) => {
    // each algo returns [match firstName, match lastName]
    // if any algo match, the result is true, else false
    const [normCardName, normDocName] = validateAndNormalize(cardName, docName);
    return [simpleMatch, matchChars, matchSubstring]
        .map((algo) => algo(normCardName, normDocName))
        .reduce(([p1, p2], [c1, c2]) => [p1 || c1, p2 || c2], [false, false]);
};

export default match;

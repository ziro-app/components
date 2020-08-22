// this algo compares first and last names and returns true if both comparisons match
// a match happens when strings are an exact match

import { getFirstAndLast } from "@bit/vitorbarbosa19.ziro.utils.string";
import { MatchAlgorithm } from "./types"

const match: MatchAlgorithm = (cardName, docName) => {
  const [cardFname, cardLname] = getFirstAndLast(cardName);
  const [docFname, docLname] = getFirstAndLast(docName);
  return [cardFname === docFname, cardLname === docLname];
};

export default match;

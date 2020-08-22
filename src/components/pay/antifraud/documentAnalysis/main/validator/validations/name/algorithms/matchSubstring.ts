// this algo compares first and last names and returns true if both comparisons match
// a match happens when first names are included in one another
// and at least one last name is included one another

import { getFirstAndLast } from "@bit/vitorbarbosa19.ziro.utils.string";
import { MatchAlgorithm } from "./types"

const match: MatchAlgorithm = (cardName, docName) => {
  const [cardFname, cardLname] = getFirstAndLast(cardName);
  const [docFname, docLname] = getFirstAndLast(docName);
  const matchFname = cardName.includes(docFname) && docName.includes(cardFname);
  const matchLname = cardName.includes(docLname) || docName.includes(cardLname);
  return [matchFname, matchLname];
};

export default match;

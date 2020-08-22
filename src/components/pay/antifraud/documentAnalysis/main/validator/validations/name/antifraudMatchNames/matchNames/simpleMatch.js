// this algo compares first and last names and returns true if both comparisons match
// a match happens when strings are an exact match

import splitNames from '../utils/splitNames';

const simpleMatch = (cardName, docName) => {
  const [cardFname, cardLname] = splitNames(cardName);
  const [docFname, docLname] = splitNames(docName);
  return [cardFname === docFname, cardLname === docLname];
};

export default simpleMatch;

// this algo compares first and last names and returns true if both comparisons match
// a match happens when first names are included in one another
// and at least one last name is included one another

import splitNames from '../utils/splitNames';

const matchSubstring = (cardName, docName) => {
  const [cardFname, cardLname] = splitNames(cardName);
  const [docFname, docLname] = splitNames(docName);
  const matchFname = cardName.includes(docFname) && docName.includes(cardFname);
  const matchLname = cardName.includes(docLname) || docName.includes(cardLname);
  return [matchFname, matchLname];
};

export default matchSubstring;

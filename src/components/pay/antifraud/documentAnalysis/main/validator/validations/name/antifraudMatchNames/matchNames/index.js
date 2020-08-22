import simpleMatch from './simpleMatch';
import matchChars from './matchChars';
import matchSubstring from './matchSubstring';

const matchNames = (cardName, docName) => {
  // each algo returns [match firstName, match lastName]
  // if any algo match, the result is true, else false
  return [simpleMatch, matchChars, matchSubstring]
    .map(algo => algo(cardName, docName))
    .reduce(([p1, p2], [c1, c2]) => [p1 || c1, p2 || c2], [false, false]);
};

export default matchNames;

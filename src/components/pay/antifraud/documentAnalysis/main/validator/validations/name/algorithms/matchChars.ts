// this algo compares first and last names and returns true if both comparisons match
// this algo compares each char in a pair of strings of same length
// if at most one does not match, the algo returns true

import { getFirstAndLast } from "@bit/vitorbarbosa19.ziro.utils.string";
import { MatchAlgorithm } from "./types"

const countBools = (acc: number,bool: boolean) => bool ? acc + 1 : acc

const matchChars = (stringOne: string, stringTwo: string) => {
  const stringOneSplit = stringOne.split('');
  const stringTwoSplit = stringTwo.split('');
  const sizeDifference = Math.abs(stringOne.length - stringTwo.length);
  if (sizeDifference === 1) {
    const oneContainsTwo = stringTwoSplit.map(char => stringOne.includes(char)).reduce(countBools,0);
    const twoContainsOne = stringOneSplit.map(char => stringTwo.includes(char)).reduce(countBools,0);
    const comparisonSizeOne = Math.abs(oneContainsTwo - stringOne.length) < 2;
    const comparisonSizeTwo = Math.abs(twoContainsOne - stringTwo.length) < 2;
    return comparisonSizeOne && comparisonSizeTwo;
  }
  if (sizeDifference > 1) return false;
  const compareChars = stringOneSplit.map((char, index) => char === stringTwoSplit[index]);
  const numberOfTrues = compareChars.reduce(countBools,0);
  const size = compareChars.length;
  return size - numberOfTrues < 2;
};

const match: MatchAlgorithm = (cardName, docName) => {
  const [cardFname, cardLname] = getFirstAndLast(cardName);
  const [docFname, docLname] = getFirstAndLast(docName);
  const matchFname = matchChars(cardFname, docFname);
  const matchLname = matchChars(cardLname, docLname);
  return [matchFname, matchLname]
};

export default match
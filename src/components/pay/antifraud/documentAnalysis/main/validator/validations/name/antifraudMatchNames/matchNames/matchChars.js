// this algo compares first and last names and returns true if both comparisons match
// this algo compares each char in a pair of strings of same length
// if at most one does not match, the algo returns true

import splitNames from '../utils/splitNames';

const matchCharsByName = (stringOne, stringTwo) => {
  const stringOneSplit = stringOne.split('');
  const stringTwoSplit = stringTwo.split('');
  const sizeDifference = Math.abs(stringOne.length - stringTwo.length);
  if (sizeDifference === 1) {
    const oneContainsTwo = stringTwoSplit.map(char => stringOne.includes(char)).reduce((current, sum) => current + sum);
    const twoContainsOne = stringOneSplit.map(char => stringTwo.includes(char)).reduce((current, sum) => current + sum);
    const comparisonSizeOne = Math.abs(oneContainsTwo - stringOne.length) < 2;
    const comparisonSizeTwo = Math.abs(twoContainsOne - stringTwo.length) < 2;
    return comparisonSizeOne && comparisonSizeTwo;
  }
  if (sizeDifference > 1) return false;
  const compareChars = stringOneSplit.map((char, index) => char === stringTwoSplit[index]);
  const numberOfTrues = compareChars.reduce((current, sum) => current + sum);
  const size = compareChars.length;
  return size - numberOfTrues < 2;
};

const matchChars = (cardName, docName) => {
  const [cardFname, cardLname] = splitNames(cardName);
  const [docFname, docLname] = splitNames(docName);
  const matchFname = matchCharsByName(cardFname, docFname);
  const matchLname = matchCharsByName(cardLname, docLname);
  return [matchFname, matchLname];
};

export default matchChars;

const template = {
  score1: 0,
  score2: 0,
  matched: true,
};
export const scoreKeys = Object.keys(template);

export namespace Scores {
  export type Score = typeof template;

  export type Fields = {
    name: Score;
    birthdate: Score;
    mothersName: Score;
  };
}

export type TypeCheck = {
  (obj: any): obj is Scores.Fields;
  Score: (obj: any) => obj is Scores.Score;
};
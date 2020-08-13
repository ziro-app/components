export const ScoreTemplate = {
  score1: 0,
  score2: 0,
  matched: true,
};

export const FieldsTemplate = {
  name: ScoreTemplate,
  birthdate: ScoreTemplate,
  mothersName: ScoreTemplate
}

export namespace Scores {
  export type Score = typeof ScoreTemplate;
  export type Fields = typeof FieldsTemplate;
}

export type TypeCheck = {
  (obj: any): obj is Scores.Fields;
  Score: (obj: any) => obj is Scores.Score;
};
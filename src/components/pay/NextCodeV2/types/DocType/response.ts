export const docTypeResponseTemplate =
  {
      confidence: 0.99,
      type: "CNH",
      face: "front",
  }

export type Response = typeof docTypeResponseTemplate;
export type TypeCheck = (obj: any) => obj is Response;
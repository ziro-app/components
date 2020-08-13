
export const BackgroundCheckTemplates = {
  found: {
    cpf: "",
    name: "",
    birthdate: "",
    mothersName: "",
  },
  passedOn: {
    cpf: true,
    name: true,
    birthdate: true,
    mothersName: true,
  }
}

export namespace BackgroundCheck {
  export type Found = typeof BackgroundCheckTemplates.found;
  export type PassedOn = typeof BackgroundCheckTemplates.passedOn;
  export type Collection = typeof BackgroundCheckTemplates;
}

export type TypeCheck = {
  (obj: any): obj is BackgroundCheck.Collection;
  Found: (obj: any) => obj is BackgroundCheck.Found;
  PassedOn: (obj: any) => obj is BackgroundCheck.PassedOn;
};

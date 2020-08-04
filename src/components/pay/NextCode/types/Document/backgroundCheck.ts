const template = {
  cpf: "",
  name: "",
  birthdate: "",
  mothersName: "",
};

type TemplateKeys = keyof typeof template;

export type Generic<T> = {
  [K in TemplateKeys]: T;
};

export const BackgroundCheckKeys = Object.keys(template);

export namespace BackgroundCheck {
  export type Found = Generic<string>;
  export type PassedOn = Generic<boolean>;

  export type BackgroundCheck = {
    found: Found;
    passedOn: PassedOn;
  };
}

export type TypeCheck = {
  (obj: any): obj is BackgroundCheck.BackgroundCheck;
  Found: (obj: any) => obj is BackgroundCheck.Found;
  PassedOn: (obj: any) => obj is BackgroundCheck.PassedOn;
};

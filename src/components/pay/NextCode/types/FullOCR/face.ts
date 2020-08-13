const successTemplate = {
  faceRectangle: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
  age: 0,
  gender: "male" as "male" | "female",
  croppedFaceBase64: "",
};

export const successTemplateKeys = Object.keys(successTemplate);

const errorTemplate = {
  error: {
    code: "",
    message: "",
    subject: "",
  },
};

export const errorTemplateKeys = Object.keys(errorTemplate);

export namespace Face {
  export type Success = typeof successTemplate;

  export type Error = typeof errorTemplate;

  export type Generic = Success | Error;
}

export type TypeCheck = {
  (obj: any): obj is Face.Generic;
  Success: (obj: any) => obj is Face.Success;
  Error: (obj: any) => obj is Face.Error;
};

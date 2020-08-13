export const FaceTemplates = {
  success: {
    faceRectangle: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    age: 0,
    gender: "male" as "male" | "female",
    croppedFaceBase64: "",
  },
  error: {
    error: {
      code: "",
      message: "",
      subject: "",
    },
  }
}

export namespace Face {
  export type Success = typeof FaceTemplates.success;
  export type Error = typeof FaceTemplates.error;
  export type Generic = Success | Error;
}

export type TypeCheck = {
  (obj: any): obj is Face.Generic;
  Success: (obj: any) => obj is Face.Success;
  Error: (obj: any) => obj is Face.Error;
};

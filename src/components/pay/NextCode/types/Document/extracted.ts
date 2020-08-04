const commonTemplate = {
  rg: "",
  cpf: "",
  nome: "",
  nomePai: "",
  nomeMae: "",
  dataNascimento: "",
  documentType: "",
};

type CommonTemplate = typeof commonTemplate;
export const CommonTemplateKeys = Object.keys(commonTemplate);

const cnhTemplate = {
  emissor: "",
  local: "",
  dataEmissao: "",
  dataPrimeiraHabilitacao: "",
  dataValidade: "",
  renach: "",
  controle: "",
  registro: "",
  categoria: "",
  observacoes: "",
};

type CNHTemplate = typeof cnhTemplate;
export const CNHTemplateKeys = Object.keys(cnhTemplate);

const rgTemplate = {
  dataExpedicao: "",
  naturalidade: "",
  origem: "",
};

type RGTemplate = typeof rgTemplate;
export const RGTemplateKeys = Object.keys(rgTemplate);

export namespace Extracted {
  export type DocumentType = "rg" | "cnh";

  type Common<T extends DocumentType> = {
    [K in keyof CommonTemplate]: K extends "documentType"
      ? T
      : CommonTemplate[K];
  };

  export type CNH = CNHTemplate & Common<"cnh">;

  export type RG = RGTemplate & Common<"rg">;

  export type Generic = CNH | RG;

}

export type TypeCheck = {
  (obj: any): obj is Extracted.Generic;
  CNH: (obj: any) => obj is Extracted.CNH;
  RG: (obj: any) => obj is Extracted.RG;
};
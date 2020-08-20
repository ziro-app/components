import { Identity } from "@bit/vitorbarbosa19.ziro.utils.check-against-template"

export const ExtractedTemplates = {
  common: {
    rg: "",
    cpf: "",
    nome: "",
    nomePai: "",
    nomeMae: "",
    dataNascimento: "",
    documentType: "" as "rg"|"cnh",
  },
  cnh: {
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
  },
  rg: {
    dataExpedicao: "",
    naturalidade: "",
    origem: "",
  }
}

export namespace Extracted {
  export type DocumentType = typeof ExtractedTemplates.common.documentType
  export type Common = typeof ExtractedTemplates.common
  export type CNH = Identity<Common & typeof ExtractedTemplates.cnh>
  export type RG = Identity<Common & typeof ExtractedTemplates.rg>
  export type Generic = CNH|RG
}

export type TypeCheck = {
  (obj: any): obj is Extracted.Generic;
  CNH: (obj: any) => obj is Extracted.CNH;
  RG: (obj: any) => obj is Extracted.RG;
};
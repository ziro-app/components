import { is } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { hyperlink } from "@bit/vitorbarbosa19.ziro.utils.sheets";
import { UseFullOCR } from "../main";
import { UseFirestoreEffect } from "../firestoreEffect";

// [birthday,rg,cpf,emissor,mothersName,name,docType,docProbability1,doc1]
function extractFromFirebaseCard(
    firebaseData: import("@bit/vitorbarbosa19.ziro.firebase.catalog-user-data").FirebaseCard.Generic,
): [string, string, string, string, string, string, string, string, string] {
    if ("docStatus" in firebaseData) {
        switch (firebaseData.docStatus) {
            case "pendingRGF": {
                const docType = "rg";
                const { extracted } = firebaseData;
                const {
                    fileInfo: {
                        classifiedAs: { probability },
                    },
                    url,
                } = firebaseData["RG V"];
                const { rg } = extracted;
                if (is.BackgroundCheck(firebaseData)) {
                    const {
                        found: { name, mothersName, cpf, birthdate },
                    } = firebaseData;
                    return [
                        birthdate,
                        rg,
                        cpf,
                        "",
                        mothersName,
                        name,
                        docType,
                        `${probability}`,
                        hyperlink(url, "RG V"),
                    ];
                }
                const { nome, nomeMae, cpf, dataNascimento } = extracted;
                return [dataNascimento, rg, cpf, "", nomeMae, nome, docType, `${probability}`, hyperlink(url, "RG V")];
            }
            case "pendingRGV": {
                const {
                    fileInfo: {
                        classifiedAs: { probability },
                    },
                    url,
                } = firebaseData["RG F"];
                return ["", "", "", "", "", "", "rg", `${probability}`, hyperlink(url, "RG F")];
            }
            case "pendingCNHF": {
                const {
                    fileInfo: {
                        classifiedAs: { probability },
                    },
                    url,
                } = firebaseData["CNH V"];
                return ["", "", "", "", "", "", "cnh", `${probability}`, hyperlink(url, "CNH V")];
            }
        }
    }
    return ["", "", "", "", "", "", "", "", ""];
}

/**
 * Extrai as informações relevantes do erro e do firebase e retorna um array no formato
 * [birthday,rg,cpf,emissor,mothersName,name,docType,docProbability1,doc1,docProbability2,doc2]
 * @param firebaseData
 * @param error
 */
export function extractData(
    firebaseData: import("@bit/vitorbarbosa19.ziro.firebase.catalog-user-data").FirebaseCard.Generic,
    error: UseFullOCR.Errors.Generic | UseFirestoreEffect.Error,
): [string, string, string, string, string, string, string, string, string, string, string] {
    const fbExtractedData = extractFromFirebaseCard(firebaseData);
    const _doc1 = fbExtractedData.pop();
    const _probDoc1 = fbExtractedData.pop();
    const docs = (doc: [string, string]) => (_doc1 ? [_probDoc1, _doc1, ...doc] : ([...doc, "", ""] as any));
    if (!UseFullOCR.Errors.hasKnownResponse(error)) {
        if (!UseFullOCR.Errors.hasResponse(error)) return [...fbExtractedData, _probDoc1, _doc1, "", ""] as any;
        return [
            ...fbExtractedData,
            ...docs(["", hyperlink(error.additionalData.url, "documento desconhecido")]),
        ] as any;
    }
    const { response, url } = error.additionalData;
    if (is.CNH.Verso(response)) {
        const {
            fileInfo: {
                classifiedAs: { probability },
            },
        } = response;
        return [...fbExtractedData, ...docs([`${probability}`, hyperlink(error.additionalData.url, "CNH V")])] as any;
    }
    if (is.RG.Frente(response)) {
        const {
            fileInfo: {
                classifiedAs: { probability },
            },
        } = response;
        return [...fbExtractedData, ...docs([`${probability}`, hyperlink(error.additionalData.url, "RG F")])] as any;
    }
    const {
        extracted,
        fileInfo: {
            classifiedAs: { probability, tagName },
        },
    } = response;
    const { rg } = extracted;
    const [docType, emissor] = is.CNH(response) ? ["cnh", response.extracted.emissor] : ["rg", ""];
    const doc = hyperlink(url, tagName);
    const _docs =
        is.RG.Verso(response) || is.CNH.Frente(response)
            ? docs([`${probability}`, doc])
            : [`${probability}`, doc, "", ""];
    if (is.BackgroundCheck(response)) {
        const {
            found: { name, mothersName, cpf, birthdate },
        } = response;
        return [birthdate, rg, cpf, emissor, mothersName, name, docType, ..._docs] as any;
    }
    const { nome, nomeMae, cpf, dataNascimento } = extracted;
    return [dataNascimento, rg, cpf, emissor, nomeMae, nome, docType, ..._docs] as any;
}

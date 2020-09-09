import { hyperlink } from "@bit/vitorbarbosa19.ziro.utils.sheets";
import { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";

function getDocs(firebaseData: FirebaseCard.BeforeSelfiePhase) {
    if ("RG FV" in firebaseData) {
        const {
            url,
            fileInfo: {
                classifiedAs: { probability },
            },
        } = firebaseData["RG FV"];
        return [`${probability}`.replace(".", ","), hyperlink(url, "RG FV"), "", ""];
    }
    if ("CNH FV" in firebaseData) {
        const {
            url,
            fileInfo: {
                classifiedAs: { probability },
            },
        } = firebaseData["CNH FV"];
        return [`${probability}`.replace(".", ","), hyperlink(url, "CNH FV"), "", ""];
    }
    if ("RG F" in firebaseData && "RG V" in firebaseData) {
        const {
            url: urlf,
            fileInfo: {
                classifiedAs: { probability: probf },
            },
        } = firebaseData["RG F"];
        const {
            url: urlv,
            fileInfo: {
                classifiedAs: { probability: probv },
            },
        } = firebaseData["RG V"];
        return [
            `${probf}`.replace(".", ","),
            hyperlink(urlf, "RG F"),
            `${probv}`.replace(".", ","),
            hyperlink(urlv, "RG V"),
        ];
    }
    if ("CNH F" in firebaseData) {
        const {
            url: urlf,
            fileInfo: {
                classifiedAs: { probability: probf },
            },
        } = firebaseData["CNH F"];
        let probv = "";
        let hv = "";
        if ("CNH V" in firebaseData) {
            probv = `${(firebaseData["CNH V"] as any).fileInfo.classifiedAs.probability}`.replace(".", ",");
            hv = hyperlink((firebaseData["CNH V"] as any).url, "CNH V");
        }
        return [`${probf}`.replace(".", ","), hyperlink(urlf, "CNH F"), probv, hv];
    }
}

/**
 * Extrai as informações relevantes do erro e do firebase e retorna um array no formato
 * [birthday,rg,cpf,emissor,mothersName,name,docType,docProbability1,doc1,docProbability2,doc2]
 * @param firebaseData
 * @param error
 */
export function extractData(
    firebaseData: FirebaseCard.BeforeSelfiePhase,
): [string, string, string, string, string, string, string, string, string, string, string] {
    const { dataNascimento, rg, cpf, nomeMae, nome, documentType } = firebaseData.extracted;
    const emissor = "emissor" in firebaseData.extracted ? firebaseData.extracted.emissor : "";
    const [prob1, doc1, prob2, doc2] = getDocs(firebaseData);
    if ("found" in firebaseData) {
        const { birthdate, cpf, mothersName, name } = firebaseData.found;
        return [birthdate, rg, cpf, emissor, mothersName, name, documentType, prob1, doc1, prob2, doc2];
    }
    return [dataNascimento, rg, cpf, emissor, nomeMae, nome, documentType, prob1, doc1, prob2, doc2];
}

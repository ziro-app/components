import { hyperlink } from "@bit/vitorbarbosa19.ziro.utils.sheets";
import { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { formatCPF, formatProbability } from "./utils";
import type { FixedArray } from "./types";

// [0 - birthday,1 - rg,2 - cpf,3 - emissor,4 - mothersName,5 - name,6 - docType,7 - docProbability1,8 - doc1,9 - docProbability2,10 - doc2]
type ReturnFirebaseArray = FixedArray<string, 11>;
/**
 * Extrai as informações relevantes do erro e do firebase e retorna um array no formato
 * [birthday,rg,cpf,emissor,mothersName,name,docType,docProbability1,doc1,docProbability2,doc2]
 * @param firebaseData
 * @param error
 */
export function extractData(firebaseData: FirebaseCard.Generic): ReturnFirebaseArray {
    const arr: ReturnFirebaseArray = ["", "", "", "", "", "", "", "", "", "", ""];
    if (!("extracted" in firebaseData)) return arr;
    arr[0] = firebaseData.extracted.dataNascimento;
    arr[1] = firebaseData.extracted.rg;
    arr[2] = formatCPF(firebaseData.extracted.cpf);
    arr[3] = "emissor" in firebaseData.extracted ? firebaseData.extracted.emissor : "";
    arr[4] = firebaseData.extracted.nomeMae;
    arr[5] = firebaseData.extracted.nome;
    arr[6] = firebaseData.documentType.toUpperCase();
    if (firebaseData.found) {
        arr[0] = firebaseData.found.birthdate;
        arr[2] = formatCPF(firebaseData.found.cpf);
        arr[4] = firebaseData.found.mothersName;
        arr[5] = firebaseData.found.name;
    }
    const firstDocs = ["CNH F", "CNH FV", "RG F", "RG FV"];
    firstDocs.forEach((doc) => {
        if (doc in firebaseData) {
            arr[7] = formatProbability(firebaseData[doc].fileInfo.classifiedAs.probability);
            arr[8] = hyperlink(firebaseData[doc].url, doc);
        }
    });
    const secondsDocs = ["CNH V", "RG V"];
    secondsDocs.forEach((doc) => {
        if (doc in firebaseData) {
            arr[9] = formatProbability(firebaseData[doc].fileInfo.classifiedAs.probability);
            arr[10] = hyperlink(firebaseData[doc].url, doc);
        }
    });
    return arr;
}

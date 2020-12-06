import { is } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { hyperlink } from "@bit/vitorbarbosa19.ziro.utils.sheets";
import type { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { UseFullOCR } from "../main";
import { isPrompt } from "ziro-messages";
import { formatCPF, formatProbability } from "./utils";

// [0 - birthday,1 - rg,2 - cpf,3 - emissor,4 - mothersName,5 - name,6 - docType,7 - docProbability1,8 - doc1]
type ReturnFirebaseArray = [string, string, string, string, string, string, string, string, string];
function extractFromFirebaseCard(firebaseData: FirebaseCard.Generic): ReturnFirebaseArray {
    const arr: ReturnFirebaseArray = ["", "", "", "", "", "", "", "", ""];
    if ("docStatus" in firebaseData) {
        switch (firebaseData.docStatus) {
            case "pendingRGF": {
                arr[0] = firebaseData.extracted.dataNascimento;
                arr[1] = firebaseData.extracted.rg;
                arr[2] = formatCPF(firebaseData.extracted.cpf);
                arr[4] = firebaseData.extracted.nomeMae;
                arr[5] = firebaseData.extracted.nome;
                arr[6] = "RG";
                arr[7] = formatProbability(firebaseData["RG V"].fileInfo.classifiedAs.probability);
                arr[8] = hyperlink(firebaseData["RG V"].url, "RG V");
                if (is.BackgroundCheck(firebaseData)) {
                    arr[0] = firebaseData.found.birthdate;
                    arr[2] = formatCPF(firebaseData.found.cpf);
                    arr[4] = firebaseData.found.mothersName;
                    arr[5] = firebaseData.found.name;
                }
                break;
            }
            case "pendingRGV": {
                arr[6] = "RG";
                arr[7] = formatProbability(firebaseData["RG F"].fileInfo.classifiedAs.probability);
                arr[8] = hyperlink(firebaseData["RG F"].url, "RG F");
                break;
            }
            case "pendingCNHF": {
                arr[6] = "CNH";
                arr[7] = formatProbability(firebaseData["CNH F"].fileInfo.classifiedAs.probability);
                arr[8] = hyperlink(firebaseData["CNH F"].url, "CNH F");
                break;
            }
        }
    }
    return arr;
}

type ReturnDataArray = [string, string, string, string, string, string, string, string, string, string, string];
/**
 * Extrai as informações relevantes do erro e do firebase e retorna um array no formato
 * [0 - birthday,1 - rg,2 - cpf,3 - emissor,4 - mothersName,5 - name,6 - docType,7 - docProbability1,8 - doc1,9 - docProbability2,10 - doc2]
 * @param firebaseData
 * @param error
 */
export function extractData(firebaseData: FirebaseCard.Generic, error: unknown): ReturnDataArray {
    const arr: ReturnDataArray = [...extractFromFirebaseCard(firebaseData), "", ""];
    const [probIndex, docIndex] = arr[7] === "" ? [7, 8] : [9, 10];
    if (!isPrompt(error)) return arr;
    if (!UseFullOCR.Errors.hasResponse(error)) return arr;
    if (!UseFullOCR.Errors.hasKnownResponse(error)) {
        arr[docIndex] = hyperlink(error.additionalData.url, "documento desconhecido");
        return arr;
    }
    const { response, url } = error.additionalData;
    if ("fileInfo" in response) {
        arr[probIndex] = formatProbability(response.fileInfo.classifiedAs.probability);
        arr[docIndex] = hyperlink(url, response.fileInfo.classifiedAs.tagName);
    }
    if (!("extracted" in response)) return arr;
    arr[0] = response.extracted.dataNascimento;
    arr[1] = response.extracted.rg;
    arr[2] = formatCPF(response.extracted.cpf);
    arr[4] = response.extracted.nomeMae;
    arr[5] = response.extracted.nome;
    if (is.CNH(response)) {
        arr[3] = response.extracted.emissor;
        arr[6] = "CNH";
    } else arr[6] = "RG";
    if (is.BackgroundCheck(response)) {
        arr[0] = response.found.birthdate;
        arr[2] = formatCPF(response.found.cpf);
        arr[4] = response.found.mothersName;
        arr[5] = response.found.name;
    }
    return arr;
}

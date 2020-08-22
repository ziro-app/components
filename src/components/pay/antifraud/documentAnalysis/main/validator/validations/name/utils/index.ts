import { normalize } from "./normalizeString"
import { isFullName } from "./fullName"
export const validateAndNormalize = (cardName: string, docName: string) => {
    if (!cardName||typeof cardName !== "string") throw new Error(`card name must be a non empty string, but ${cardName}`)
	if (!docName||typeof docName !== "string") throw new Error(`doc name must be a non empty string, but ${docName}`)
	const normalizedCardName = normalize(cardName)
    const normalizedDocName = normalize(docName)
    if (!isFullName(normalizedCardName)) throw new Error(`card name must be a compound name, but ${cardName}`)
	if (!isFullName(normalizedDocName)) throw new Error(`doc name must be a compound name, but ${docName}`)
	return [normalizedCardName, normalizedDocName] as [string,string]
}
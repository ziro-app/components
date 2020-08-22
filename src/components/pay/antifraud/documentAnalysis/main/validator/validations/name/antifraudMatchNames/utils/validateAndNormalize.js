import normalizeString from './normalizeString'

const isFullName = potentialName => /^([a-zA-Z,.'-]* [a-zA-Z,.'-]*)+$/g.test(potentialName)

const validateAndNormalize = (cardName, docName) => {
	if (cardName === '' || docName === '')
		throw new Error('antifraud inputs cant be empty strings')
	if (!cardName || !docName)
		throw new Error('antifraud inputs must be of type string')
	if (!(typeof cardName === 'string') || !(typeof docName === 'string'))
		throw new Error('antifraud inputs must be of type string')
	const normalizedCardName = normalizeString(cardName)
	const normalizedDocName = normalizeString(docName)
	if (!isFullName(normalizedCardName) || !isFullName(normalizedDocName))
		throw new Error('antifraud inputs are not full names. Failed regex validation')
	return [normalizedCardName, normalizedDocName]
}

export default validateAndNormalize
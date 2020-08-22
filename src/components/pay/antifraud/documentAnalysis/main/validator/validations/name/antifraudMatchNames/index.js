import validateAndNormalize from './utils/validateAndNormalize'
import matchNames from './matchNames/index'

const antifraudMatchNames = (cardName, docName) => {
	const [normalizedCardName, normalizedDocName] = validateAndNormalize(cardName, docName)
	return matchNames(normalizedCardName, normalizedDocName)
}

export default antifraudMatchNames
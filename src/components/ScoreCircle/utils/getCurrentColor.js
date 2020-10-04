const getCurrentColor = (step, stepsColors) => {
	if (step <= 0) return stepsColors[0]
	if (step > stepsColors.length) return stepsColors[stepsColors.length - 1]
	return stepsColors[step - 1]
}

export default getCurrentColor
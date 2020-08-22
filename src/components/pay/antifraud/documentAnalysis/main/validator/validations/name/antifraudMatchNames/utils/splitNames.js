const splitNames = fullName => {
	const [first, ...rest] = fullName.trim().toUpperCase().split(' ')
	const [last] = rest.slice(-1)
	return [first, last]
}

export default splitNames
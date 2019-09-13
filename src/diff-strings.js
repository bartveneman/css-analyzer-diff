function diffStrings(stringA, stringB) {
	// Make sure the first string is undefined if one of them is undefined
	if (typeof stringB === 'undefined') {
		stringB = stringA
		stringA = undefined
	}

	if (typeof stringA === 'undefined') {
		stringA = null
	}

	const diff = {
		oldValue: stringA,
		newValue: stringB,
		changed: stringA !== stringB
	}

	return diff
}

module.exports = diffStrings

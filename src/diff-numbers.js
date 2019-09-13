function diffNumbers(numberA, numberB) {
	// Make sure the first number is undefined if one of them is undefined
	if (typeof numberB === 'undefined') {
		numberB = numberA
		numberA = undefined
	}

	if (typeof numberA === 'undefined') {
		numberA = null
	}

	const diff = {
		oldValue: numberA,
		newValue: numberB,
		changed: numberA !== numberB,
		diff: {
			absolute: numberB - numberA,
			relative: (numberB - numberA) / numberA
		}
	}

	if (numberA === 0) {
		diff.diff.relative = 1
	}

	if (numberA === null) {
		diff.diff.absolute = numberB
		diff.diff.relative = 1
	}

	return diff
}

module.exports = diffNumbers

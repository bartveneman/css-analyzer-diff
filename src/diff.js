const diffNumbers = require('./diff-numbers.js')
const diffLists = require('./diff-lists.js')
const diffStrings = require('./diff-strings.js')

function diffStats(statsA, statsB) {
	// This assumes that the statsB is newer than statsA
	return Object.entries(statsB).reduce((diff, [key, value]) => {
		diff[key] = diffStat(statsA[key], value, key)
		return diff
	}, {})
}

function diffStat(statA, statB, key) {
	if (typeof statB === 'undefined') {
		statB = statA
		statA = undefined
	}

	if (typeof statA === 'undefined') {
		statA = null
	}

	// Abort if the types are not compatible
	// A must have the same type as B, or A must be null
	if (typeof statA !== typeof statB && statA !== null) {
		throw new TypeError(
			`Stat types do not match. ${typeof statA} is not compatible to compare with ${typeof statB}`
		)
	}

	if (!Number.isNaN(statB) && Number.isFinite(statB)) {
		return diffNumbers(statA, statB)
	}

	if (Array.isArray(statB)) {
		statA = statA === null ? [] : statA
		return diffLists(statA, statB, key)
	}

	if (typeof statB === 'string') {
		return diffStrings(statA, statB)
	}

	return null
}

module.exports = diffStats

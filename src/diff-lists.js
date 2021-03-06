const cssUnitSort = require('css-unit-sort')
const cssColorSort = require('color-sorter')
const {
	caseInsensitive: caseInsensitiveCompare
} = require('string-natural-compare')

const METRICS_SORTED_BY_CSS_UNIT = ['values.fontsizes.unique']
const METRICS_SORTED_BY_COLOR = [
	'values.colors.unique',
	'values.colors.duplicates'
]
const METRICS_SORTED_BY_INTEGER = ['values.zindexes.unique']

function getSortingFnByKey(key) {
	if (METRICS_SORTED_BY_CSS_UNIT.includes(key)) {
		return (a, b) => cssUnitSort.sortFn(a, b) * -1
	}

	if (METRICS_SORTED_BY_COLOR.includes(key)) {
		return cssColorSort.sortFn
	}

	if (METRICS_SORTED_BY_INTEGER.includes(key)) {
		return (a, b) => a - b
	}

	return (a, b) => caseInsensitiveCompare(a, b)
}

function mergeLists(listA, listB, key) {
	// Create a single list out of both lists that will take their
	// unique values
	return (
		listA
			.concat(listB)
		// Remove duplicate items
			.filter((value, index, self) => {
				return self.lastIndexOf(value) === index
			})
		// Re-sort the items
			.sort(getSortingFnByKey(key))
	)
}

function diffLists(listA, listB, key) {
	if (typeof listB === 'undefined') {
		listB = listA
		listA = undefined
	}

	listA = Array.isArray(listA) ? listA : []
	listB = Array.isArray(listB) ? listB : []

	// The diff will be the combined list with an indication per item
	// whether it was added, removed or changed
	const diff = mergeLists(listA, listB, key).map(item => {
		const itemExistsInA = listA.includes(item)
		const itemExistsInB = listB.includes(item)

		const isAdded = !itemExistsInA && itemExistsInB
		const isRemoved = itemExistsInA && !itemExistsInB

		return {
			value: item,
			added: isAdded,
			removed: isRemoved,
			changed: isAdded || isRemoved
		}
	})

	return {
		diff,
		changed: diff.some(item => item.changed)
	}
}

module.exports = diffLists

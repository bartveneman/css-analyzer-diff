const cssUnitSort = require('css-unit-sort')
const cssColorSort = require('color-sorter')
const compareString = require('string-natural-compare')

const METRICS_SORTED_BY_CSS_UNIT = ['values.fontsizes.unique']
const METRICS_SORTED_BY_COLOR = [
	'values.colors.unique',
	'values.colors.duplicates'
]

function getSortingFnByKey(key) {
	if (METRICS_SORTED_BY_CSS_UNIT.includes(key)) {
		return cssUnitSort.sortFn
	}

	return (a, b) => {
		return compareString.caseInsensitive(b, a)
	}
}

function mergeLists(listA, listB, key) {
	// Create a single list out of both lists that will take their
	// unique values
	const merged = listA
		.concat(listB)
		// Remove duplicate items
		.filter((value, index, self) => {
			return self.lastIndexOf(value) === index
		})
		// Re-sort the items
		.sort(getSortingFnByKey(key))
		.reverse()

	// Until color-sorter supports a sortFn, we must sort the list at this place
	return METRICS_SORTED_BY_COLOR.includes(key) ? cssColorSort(merged) : merged
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

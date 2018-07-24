function mergeLists(listA, listB) {
	// Create a single list out of both lists that will take their
	// unique values
	return (
		listA
			.concat(listB)
			// Re-sort the items
			.sort((a, b) => {
				return a.toLowerCase().localeCompare(b.toLowerCase())
			})
			// Remove duplicate items
			.filter((value, index, self) => {
				return self.lastIndexOf(value) === index
			})
	)
}

function diffLists(listA, listB) {
	if (typeof listB === 'undefined') {
		listB = listA
		listA = undefined
	}

	listA = Array.isArray(listA) ? listA : []
	listB = Array.isArray(listB) ? listB : []

	// The diff will be the combined list with an indication per item
	// whether it was added, removed or changed
	const diff = mergeLists(listA, listB).map(item => {
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

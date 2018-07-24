const test = require('ava')
const diff = require('../src/diff-lists.js')

// Numeric stats
test('The diff for listable stats is formatted correctly', t => {
	const result = diff(['item1', 'item2'], ['item1', 'item-new'])

	// The diff
	t.is('object', typeof result)

	// The diff's diff
	t.true(Array.isArray(result.diff))
	t.is(3, result.diff.length)

	// Item inside the diff
	const [item] = result.diff
	t.is('object', typeof item)
	t.is('boolean', typeof item.added)
	t.is('boolean', typeof item.changed)
	t.is('boolean', typeof item.removed)
	t.is('item-new', item.value)

	// Changed
	t.is('boolean', typeof result.changed)
})

test('It calculates the diff for two different stats correctly', t => {
	const result = diff(
		['unchangedValue', 'removedValue'],
		['addedValue', 'unchangedValue']
	)
	const expectedDiff = [
		{
			value: 'addedValue',
			removed: false,
			added: true,
			changed: true
		},
		{
			value: 'removedValue',
			removed: true,
			added: false,
			changed: true
		},
		{
			value: 'unchangedValue',
			removed: false,
			added: false,
			changed: false
		}
	]

	t.true(result.changed)
	t.is(3, result.diff.length)
	t.deepEqual(result.diff, expectedDiff)
})

test('It calculates the diff correctly for two exact same stats', t => {
	const result = diff(['item1', 'item2'], ['item1', 'item2'])
	const expectedDiff = [
		{
			value: 'item1',
			removed: false,
			added: false,
			changed: false
		},
		{
			value: 'item2',
			removed: false,
			added: false,
			changed: false
		}
	]

	t.false(result.changed)
	t.is(2, result.diff.length)
	t.deepEqual(result.diff, expectedDiff)
})

test('It handles the first listable stat being absent in one of the stats', t => {
	const actual = diff(undefined, ['cat', 'dog'])
	const expectedDiff = {
		changed: true,
		diff: [
			{
				value: 'cat',
				removed: false,
				added: true,
				changed: true
			},
			{
				value: 'dog',
				removed: false,
				added: true,
				changed: true
			}
		]
	}

	t.deepEqual(actual, expectedDiff)
})

test('It handles the second listable stat being absent in one of the stats', t => {
	const actual = diff(['cat', 'dog'], undefined)
	const expectedDiff = {
		changed: true,
		diff: [
			{
				value: 'cat',
				removed: false,
				added: true,
				changed: true
			},
			{
				value: 'dog',
				removed: false,
				added: true,
				changed: true
			}
		]
	}

	t.deepEqual(actual, expectedDiff)
})

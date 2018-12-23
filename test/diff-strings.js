const test = require('ava')
const diff = require('../src/diff-strings.js')

test('It structures the diff for string stats correctly', t => {
	const result = diff('a', 'b')

	// Old and new values
	t.true(typeof result.oldValue === 'string')
	t.true(typeof result.newValue === 'string')

	// Changed
	t.is('boolean', typeof result.changed)
})

test('It handles the first string stat being absent', t => {
	const actual = diff(undefined, 'a')
	const expected = {
		oldValue: null,
		newValue: 'a',
		changed: true
	}

	t.deepEqual(actual, expected)
})

test('It handles the second numeric stat being absent', t => {
	const actual = diff('a', undefined)
	const expected = {
		oldValue: null,
		newValue: 'a',
		changed: true
	}

	t.deepEqual(actual, expected)
})

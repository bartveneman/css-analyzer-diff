const test = require('ava')
const diff = require('../src/diff-numbers.js')

test('It structures the diff for numeric stats correctly', t => {
	const result = diff(1, 2)

	// Old and new values
	t.true(Number.isFinite(result.oldValue))
	t.true(Number.isFinite(result.newValue))

	// Diff
	t.is('object', typeof result.diff)
	t.true(Number.isFinite(result.diff.absolute))
	t.true(Number.isFinite(result.diff.relative))

	// Changed
	t.is('boolean', typeof result.changed)
})

test('Numeric stats with integers are correctly compared', t => {
	const actual = diff(2, 4)
	const expected = {
		oldValue: 2,
		newValue: 4,
		diff: {absolute: 2, relative: 1},
		changed: true
	}

	t.deepEqual(actual, expected)
})

test('Numeric stats with floats are correctly compared', t => {
	const actual = diff(0.123, 1.234)
	const expected = {
		oldValue: 0.123,
		newValue: 1.234,
		diff: {absolute: 1.111, relative: 9.032520325203253},
		changed: true
	}

	t.deepEqual(actual, expected)
})

test('Numeric stats will be calculated correctly, preventing DivideByZeroExceptions', t => {
	const actual = diff(0, 2)
	const expected = {
		oldValue: 0,
		newValue: 2,
		diff: {absolute: 2, relative: 1},
		changed: true
	}

	t.deepEqual(actual, expected)
})

test('Numeric stats will be calculated correctly when the second value is negative', t => {
	const actual = diff(4, 2)
	const expected = {
		oldValue: 4,
		newValue: 2,
		diff: {absolute: -2, relative: -0.5},
		changed: true
	}

	t.deepEqual(actual, expected)
})

test('Numeric stats will be calculated correctly when there are no changes', t => {
	const actual = diff(1, 1)
	const expected = {
		oldValue: 1,
		newValue: 1,
		diff: {absolute: 0, relative: 0},
		changed: false
	}

	t.deepEqual(actual, expected)
})

test('It handles the first numeric stat being absent', t => {
	const actual = diff(undefined, 1)
	const expected = {
		oldValue: null,
		newValue: 1,
		diff: {absolute: 1, relative: 1},
		changed: true
	}

	t.deepEqual(actual, expected)
})

test('It handles the second numeric stat being absent', t => {
	const actual = diff(1, undefined)
	const expected = {
		oldValue: null,
		newValue: 1,
		diff: {absolute: 1, relative: 1},
		changed: true
	}

	t.deepEqual(actual, expected)
})

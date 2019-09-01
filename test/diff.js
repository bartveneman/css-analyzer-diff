const test = require("ava");
const diff = require("..");

const defaultFixture = { a: 1, b: 2 };
const fixtureWithUpdatedValues = { a: 3, b: 4 };
const fixtureWithAddedProp = { a: 1, b: 2, c: 3 };
const fixtureWithIncompatibleProps = { a: 1, b: true };

test("It does not throw errors when passing simple, valid input", t => {
  t.notThrows(() => {
    return diff(defaultFixture, fixtureWithUpdatedValues);
  });
});

test("An error is thrown if incompatible stat types are given", t => {
  t.throws(() => {
    return diff(defaultFixture, fixtureWithIncompatibleProps);
  });
});

// Shallow testing of result structure. More in-depth testing
// of the structure is done in other tests
test("It should return the correct structure", t => {
  const result = diff(defaultFixture, fixtureWithUpdatedValues);
  t.is("object", typeof result);
  t.deepEqual(["a", "b"], Object.keys(result));

  Object.values(result).forEach(stat => {
    t.is("boolean", typeof stat.changed);
  });
});

test("It should return the correct structure when new props are added", t => {
  const result = diff(defaultFixture, fixtureWithAddedProp);
  t.deepEqual(["a", "b", "c"], Object.keys(result));
});

test("It should diff strings correctly after they are introduced in css-analyzer v2.0.0", t => {
  t.deepEqual(diff({}, { "selectors.identifiers.max.value": ".my-selector" }), {
    "selectors.identifiers.max.value": {
      changed: true,
      oldValue: null,
      newValue: ".my-selector"
    }
  });
});

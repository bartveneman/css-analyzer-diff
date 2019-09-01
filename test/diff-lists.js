const test = require("ava");
const diff = require("../src/diff-lists.js");

// Numeric stats
test("The diff for listable stats is formatted correctly", t => {
  const result = diff(["item1", "item2"], ["item1", "item-new"]);

  // The diff
  t.is("object", typeof result);

  // The diff's diff
  t.true(Array.isArray(result.diff));
  t.is(3, result.diff.length);

  // Item inside the diff
  const [item] = result.diff;
  t.is("object", typeof item);
  t.is("boolean", typeof item.added);
  t.is("boolean", typeof item.changed);
  t.is("boolean", typeof item.removed);
  t.is("item-new", item.value);

  // Changed
  t.is("boolean", typeof result.changed);
});

test("It calculates the diff for two different stats correctly", t => {
  const result = diff(
    ["unchangedValue", "removedValue"],
    ["addedValue", "unchangedValue"]
  );
  const expected = [
    {
      value: "addedValue",
      removed: false,
      added: true,
      changed: true
    },
    {
      value: "removedValue",
      removed: true,
      added: false,
      changed: true
    },
    {
      value: "unchangedValue",
      removed: false,
      added: false,
      changed: false
    }
  ];

  t.true(result.changed);
  t.is(3, result.diff.length);
  t.deepEqual(result.diff, expected);
});

test("It calculates the diff correctly for two exact same stats", t => {
  const result = diff(["item1", "item2"], ["item1", "item2"]);
  const expected = [
    {
      value: "item1",
      removed: false,
      added: false,
      changed: false
    },
    {
      value: "item2",
      removed: false,
      added: false,
      changed: false
    }
  ];

  t.false(result.changed);
  t.is(2, result.diff.length);
  t.deepEqual(result.diff, expected);
});

test("It handles the first listable stat being absent in one of the stats", t => {
  const actual = diff(undefined, ["cat", "dog"]);
  const expected = {
    changed: true,
    diff: [
      {
        value: "cat",
        removed: false,
        added: true,
        changed: true
      },
      {
        value: "dog",
        removed: false,
        added: true,
        changed: true
      }
    ]
  };

  t.deepEqual(actual, expected);
});

test("It handles the second listable stat being absent in one of the stats", t => {
  const actual = diff(["cat", "dog"], undefined);
  const expected = {
    changed: true,
    diff: [
      {
        value: "cat",
        removed: false,
        added: true,
        changed: true
      },
      {
        value: "dog",
        removed: false,
        added: true,
        changed: true
      }
    ]
  };

  t.deepEqual(actual, expected);
});

test("It sorts selectors/values/properties correctly", t => {
  const actual = diff(
    ["a:after", "a:before"],
    ["a:after", "aa:before", "b:before"]
  );
  const expected = {
    changed: true,
    diff: [
      {
        value: "a:after",
        changed: false,
        removed: false,
        added: false
      },
      {
        value: "a:before",
        changed: true,
        removed: true,
        added: false
      },
      {
        value: "aa:before",
        added: true,
        changed: true,
        removed: false
      },
      {
        value: "b:before",
        added: true,
        changed: true,
        removed: false
      }
    ]
  };

  t.deepEqual(actual, expected);
});

test("It sorts fontsizes correctly after comparing them", t => {
  const actual = diff(
    ["0", "32px", "4em"],
    ["0", ".5em", "1em", "3rem"],
    "values.fontsizes.unique"
  );
  const expected = {
    changed: true,
    diff: [
      {
        value: "0",
        removed: false,
        added: false,
        changed: false
      },
      {
        value: ".5em",
        removed: false,
        added: true,
        changed: true
      },
      {
        value: "1em",
        removed: false,
        added: true,
        changed: true
      },
      {
        value: "32px",
        removed: true,
        added: false,
        changed: true
      },
      {
        value: "3rem",
        removed: false,
        added: true,
        changed: true
      },
      {
        value: "4em",
        removed: true,
        added: false,
        changed: true
      }
    ]
  };

  t.deepEqual(actual, expected);
});

test("It sorts colors correctly after comparing them", t => {
  const actual = diff(
    ["red", "orange", "green", "purple"],
    ["red", "yellow", "green", "blue", "purple"],
    "values.colors.unique"
  );
  const expected = {
    changed: true,
    diff: [
      {
        value: "red",
        changed: false,
        added: false,
        removed: false
      },
      {
        value: "orange",
        changed: true,
        added: false,
        removed: true
      },
      {
        value: "yellow",
        changed: true,
        added: true,
        removed: false
      },
      {
        value: "green",
        changed: false,
        added: false,
        removed: false
      },
      {
        value: "blue",
        changed: true,
        added: true,
        removed: false
      },
      {
        value: "purple",
        changed: false,
        added: false,
        removed: false
      }
    ]
  };

  t.deepEqual(actual, expected);
});

test("it sorts zindexes correctly after comparing them", t => {
  const actual = diff(
    [-100, -1, 0, 1, 999],
    [-100, 0, 1, 999],
    "values.zindexes.unique"
  );
  const expected = {
    changed: true,
    diff: [
      {
        value: -100,
        changed: false,
        added: false,
        removed: false
      },
      {
        value: -1,
        changed: true,
        added: false,
        removed: true
      },
      {
        value: 0,
        changed: false,
        added: false,
        removed: false
      },
      {
        value: 1,
        changed: false,
        added: false,
        removed: false
      },
      {
        value: 999,
        changed: false,
        added: false,
        removed: false
      }
    ]
  };

  t.deepEqual(actual, expected);
});

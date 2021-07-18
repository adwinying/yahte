import { strict as assert } from "assert";
import { getCtxVal, kebabToCamel } from "../src/helpers";

describe("kebabToCamel", () => {
  it("should convert kebab-case to kebabCase", () => {
    const input = "kebab-case";
    const expected = "kebabCase";

    const result = kebabToCamel(input);

    assert.equal(result, expected);
  });

  it("should not convert single word", () => {
    const input = "foobar";
    const expected = input;

    const result = kebabToCamel(input);

    assert.equal(result, expected);
  });

  it("throws error if input is not kebab-case", () => {
    const input = "camelCase";
    const err = new Error(`${input} is not kebab-case`);

    assert.throws(() => kebabToCamel(input), err);
  });

  it("throws error if input contains spaces", () => {
    const input = "space case";
    const err = new Error(`${input} is not kebab-case`);

    assert.throws(() => kebabToCamel(input), err);
  });
});

describe("getCtxVal", () => {
  it("gets value from ctx object", () => {
    const key = "foo";
    const val = "bar";
    const ctx = { [key]: val };

    const result = getCtxVal(ctx, key);

    assert.equal(result, val);
  });

  it("converts value to string", () => {
    const key = "foo";
    const val = 123;
    const ctx = { [key]: val };
    const expected = val.toString();

    const result = getCtxVal(ctx, key);

    assert.equal(result, expected);
  });

  it("converts object to string", () => {
    const key = "foo";
    const val = { some: "object" };
    const ctx = { [key]: val };
    const expected = "[object Object]";

    const result = getCtxVal(ctx, key);

    assert.equal(result, expected);
  });

  it("throws error if key not found", () => {
    const key = "foo";
    const ctx = {};
    const err = new Error(`${key} is not defined in context`);

    assert.throws(() => getCtxVal(ctx, key), err);
  });
});

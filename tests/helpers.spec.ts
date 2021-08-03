import { strict as assert } from "assert";
import { kebabToCamel } from "../src/helpers";

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

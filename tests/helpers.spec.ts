import { strict as assert } from "assert";
import { camelize, pascalize } from "../src/helpers";

describe("helpers", () => {
  describe("camelize", () => {
    it("can convert snake_case", () => {
      const input = "snake_case";
      const expected = "snakeCase";

      const result = camelize(input);
      assert.deepEqual(result, expected);
    });

    it("can convert kebab-case", () => {
      const input = "kebab-case";
      const expected = "kebabCase";

      const result = camelize(input);
      assert.deepEqual(result, expected);
    });

    it("can convert PascalCase", () => {
      const input = "PascalCase";
      const expected = "pascalCase";

      const result = camelize(input);
      assert.deepEqual(result, expected);
    });
  });

  describe("pascalize", () => {
    it("can convert snake_case", () => {
      const input = "snake_case";
      const expected = "SnakeCase";

      const result = pascalize(input);
      assert.deepEqual(result, expected);
    });

    it("can convert kebab-case", () => {
      const input = "kebab-case";
      const expected = "KebabCase";

      const result = pascalize(input);
      assert.deepEqual(result, expected);
    });

    it("can convert camelCase", () => {
      const input = "camelCase";
      const expected = "CamelCase";

      const result = pascalize(input);
      assert.deepEqual(result, expected);
    });
  });
});

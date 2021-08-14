import { strict as assert } from "assert";
import { compile } from "../../src/index";

describe("conditionals", () => {
  it("should render if var truthy", () => {
    const html = `<div y-if="foo">foobar</div>`;
    const obj = { foo: "bar" };

    const expected = "<div>foobar</div>";
    const result = compile(html, { context: obj });

    assert.deepStrictEqual(result, expected);
  });

  it("should render if var falsy", () => {
    const html = `<div y-if="foo">foobar</div>`;
    const obj = { foo: null };

    const expected = "";
    const result = compile(html, { context: obj });

    assert.deepStrictEqual(result, expected);
  });

  it("should render if expression truthy", () => {
    const html = `<div y-if="'hello'">foobar</div>`;
    const obj = {};

    const expected = "<div>foobar</div>";
    const result = compile(html, { context: obj });

    assert.deepStrictEqual(result, expected);
  });

  it("should render if expression falsy", () => {
    const html = `<div y-if="4 % 2">foobar</div>`;
    const obj = {};

    const expected = "";
    const result = compile(html, { context: obj });

    assert.deepStrictEqual(result, expected);
  });

  it("should render else-if block if else-if expression truthy", () => {
    const html = `<div y-if="false">hi</div><div y-else-if="true">hello</div><div y-else>bye</div>`;
    const obj = {};

    const expected = "<div>hello</div>";
    const result = compile(html, { context: obj });

    assert.deepStrictEqual(result, expected);
  });

  it("should render else block if expression falsy", () => {
    const html = `<div y-if="false">hi</div><div y-else>bye</div>`;
    const obj = {};

    const expected = "<div>bye</div>";
    const result = compile(html, { context: obj });

    assert.deepStrictEqual(result, expected);
  });
});

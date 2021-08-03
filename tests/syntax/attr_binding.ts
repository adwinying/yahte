import * as assert from "assert";
import { compile } from "../../src/index";

describe("attribute binding", () => {
  it("should bind var to attr", () => {
    const html = '<div y-bind:foo="foo">foobar</div>';
    const obj = { foo: "bar" };

    const expected = '<div foo="bar">foobar</div>';
    const result = compile(html, obj);

    assert.deepStrictEqual(result, expected);
  });

  it("should bind var to kebab-cased attr", () => {
    const html = '<div y-bind:foo-bar="foo">foobar</div>';
    const obj = { foo: "baz" };

    const expected = '<div foo-bar="baz">foobar</div>';
    const result = compile(html, obj);

    assert.deepStrictEqual(result, expected);
  });

  it("should bind expression to attr", () => {
    const html = `<div y-bind:foo="foo.join(',')">foobar</div>`;
    const obj = { foo: [1, 2, 3] };

    const expected = '<div foo="1,2,3">foobar</div>';
    const result = compile(html, obj);

    assert.deepStrictEqual(result, expected);
  });
});

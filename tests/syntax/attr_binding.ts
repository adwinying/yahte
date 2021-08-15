import { strict as assert } from "assert";
import { compile } from "../../src/index";

describe("attribute binding", () => {
  it("should bind var to attr", () => {
    const html = '<div y-bind:foo="foo">foobar</div>';
    const obj = { foo: "bar" };

    const expected = '<div foo="bar">foobar</div>';
    const result = compile(html, { context: obj });

    assert.equal(result, expected);
  });

  it("should bind var to kebab-cased attr", () => {
    const html = '<div y-bind:foo-bar="foo">foobar</div>';
    const obj = { foo: "baz" };

    const expected = '<div foo-bar="baz">foobar</div>';
    const result = compile(html, { context: obj });

    assert.equal(result, expected);
  });

  it("should convert vars that are not string to JSON before bind", () => {
    const html = '<div y-bind:foo="foo">foobar</div>';
    const obj = { foo: [1, 2, 3] };

    const expected = '<div foo="[1,2,3]">foobar</div>';
    const result = compile(html, { context: obj });

    assert.equal(result, expected);
  });

  it("should bind expression to attr", () => {
    const html = `<div y-bind:foo="foo.join(',')">foobar</div>`;
    const obj = { foo: [1, 2, 3] };

    const expected = '<div foo="1,2,3">foobar</div>';
    const result = compile(html, { context: obj });

    assert.equal(result, expected);
  });

  it("should destructure bind when no attr name specified", () => {
    const html = `<div y-bind="test">foobar</div>`;
    const obj = { test: { foo: "123", bar: "456" } };

    const expected = '<div foo="123" bar="456">foobar</div>';
    const result = compile(html, { context: obj });

    assert.equal(result, expected);
  });
});

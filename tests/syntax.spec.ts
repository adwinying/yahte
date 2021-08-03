import { strict as assert } from "assert";
import { compile } from "../src/index";

describe("string interpolation", () => {
  it("should parse variables", () => {
    const html = "<div>{{ foo }}</div>";
    const obj = { foo: "bar" };

    const expected = "<div>bar</div>";
    const result = compile(html, obj);

    assert(result === expected);
  });

  it("should parse continuous handlebars", () => {
    const html = "<div>{{ foo }} {{ bar }}</div>";
    const obj = { foo: "123", bar: "456" };

    const expected = "<div>123 456</div>";
    const result = compile(html, obj);

    assert(result === expected);
  });

  it("should parse continuous handlebars with text in between", () => {
    const html = "<div>{{ foo }} bar {{ foo }}</div>";
    const obj = { foo: "123" };

    const expected = "<div>123 bar 123</div>";
    const result = compile(html, obj);

    assert(result === expected);
  });

  it("should parse expression", () => {
    const html = "<div>{{ foo.join(',') }}</div>";
    const obj = { foo: [1, 2, 3] };

    const expected = "<div>1,2,3</div>";
    const result = compile(html, obj);

    assert(result === expected);
  });
});

describe("attr binding", () => {
  it("should bind var to attr", () => {
    const html = '<div y-bind:foo="foo">foobar</div>';
    const obj = { foo: "bar" };

    const expected = '<div foo="bar">foobar</div>';
    const result = compile(html, obj);

    assert(result === expected);
  });

  it("should bind var to kebab-cased attr", () => {
    const html = '<div y-bind:foo-bar="foo">foobar</div>';
    const obj = { foo: "baz" };

    const expected = '<div foo-bar="baz">foobar</div>';
    const result = compile(html, obj);

    assert(result === expected);
  });

  it("should bind expression to attr", () => {
    const html = `<div y-bind:foo="foo.join(',')">foobar</div>`;
    const obj = { foo: [1, 2, 3] };

    const expected = '<div foo="1,2,3">foobar</div>';
    const result = compile(html, obj);

    assert(result === expected);
  });
});

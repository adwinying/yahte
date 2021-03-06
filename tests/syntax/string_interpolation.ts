import { strict as assert } from "assert";
import { compile } from "../../src/index";

describe("string interpolation", () => {
  it("should parse variables", () => {
    const html = "<div>{{ foo }}</div>";
    const obj = { foo: "bar" };

    const expected = "<div>bar</div>";
    const result = compile(html, { context: obj });

    assert.equal(result, expected);
  });

  it("should parse continuous handlebars", () => {
    const html = "<div>{{ foo }} {{ bar }}</div>";
    const obj = { foo: "123", bar: "456" };

    const expected = "<div>123 456</div>";
    const result = compile(html, { context: obj });

    assert.equal(result, expected);
  });

  it("should parse continuous handlebars with text in between", () => {
    const html = "<div>{{ foo }} bar {{ foo }}</div>";
    const obj = { foo: "123" };

    const expected = "<div>123 bar 123</div>";
    const result = compile(html, { context: obj });

    assert.equal(result, expected);
  });

  it("should parse expression", () => {
    const html = "<div>{{ foo.join(',') }}</div>";
    const obj = { foo: [1, 2, 3] };

    const expected = "<div>1,2,3</div>";
    const result = compile(html, { context: obj });

    assert.equal(result, expected);
  });

  it("should parse expression with spaces", () => {
    const html = "<div>{{ new Date(2020, 0, 1).toDateString() }}</div>";

    const expected = "<div>Wed Jan 01 2020</div>";
    const result = compile(html);

    assert.equal(result, expected);
  });
});

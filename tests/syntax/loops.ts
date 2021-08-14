import { strict as assert } from "assert";
import { compile } from "../../src/index";

describe("loops", () => {
  it("should render repeatedly", () => {
    const html = `<div y-for="num in nums">hello</div>`;
    const obj = { nums: [1, 2, 3] };

    const expected = "<div>hello</div><div>hello</div><div>hello</div>";
    const result = compile(html, { context: obj });

    assert.deepStrictEqual(result, expected);
  });

  it("should bind each el to each iteration", () => {
    const html = `<div y-for="num in nums">{{ num }}</div>`;
    const obj = { nums: [1, 2, 3] };

    const expected = "<div>1</div><div>2</div><div>3</div>";
    const result = compile(html, { context: obj });

    assert.deepStrictEqual(result, expected);
  });

  it("should bind index when specified", () => {
    const html = `<div y-for="(name, i) in names">{{ i }}:{{ name }}</div>`;
    const obj = { names: ["jack", "mark", "jane"] };

    const expected = "<div>0:jack</div><div>1:mark</div><div>2:jane</div>";
    const result = compile(html, { context: obj });

    assert.deepStrictEqual(result, expected);
  });
});

import { strict as assert } from "assert";
import path from "path";
import { compile } from "../../src/index";

describe("components", () => {
  it("should expand custom component", () => {
    const html = "<y-custom></y-custom>";
    const dir = path.resolve(__dirname, "components");

    const expected = "<div>hello from custom component</div>\n";
    const result = compile(html, { componentsDir: dir });

    assert.equal(result, expected);
  });

  it("should expand custom component with long name", () => {
    const html = "<y-custom-with-long-name></y-custom-with-long-name>";
    const dir = path.resolve(__dirname, "components");

    const expected = "<div>hello from custom component with long name</div>\n";
    const result = compile(html, { componentsDir: dir });

    assert.equal(result, expected);
  });

  it("should expand custom nested component", () => {
    const html = "<y-nested.custom></y-nested.custom>";
    const dir = path.resolve(__dirname, "components");

    const expected = "<div>hello from custom nested component</div>\n";
    const result = compile(html, { componentsDir: dir });

    assert.equal(result, expected);
  });

  it("should expand components with custom file extension", () => {
    const html = "<y-custom></y-custom>";
    const dir = path.resolve(__dirname, "components");
    const ext = "foo";

    const expected = "<div>hello from custom component.foo</div>\n";
    const result = compile(html, { componentsDir: dir, componentsExt: ext });

    assert.equal(result, expected);
  });

  it("should convert component attrs to content context", () => {
    const html = `<y-greet y-bind:name="name"></y-greet>`;
    const ctx = { name: "jack" };
    const dir = path.resolve(__dirname, "components");

    const expected = `<div name="jack">hello jack</div>\n`;
    const result = compile(html, { context: ctx, componentsDir: dir });

    assert.equal(result, expected);
  });
});

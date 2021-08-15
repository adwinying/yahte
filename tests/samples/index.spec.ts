import fs from "fs";
import path from "path";
import { strict as assert } from "assert";
import { compile } from "../../src/index";

describe("sample projects", () => {
  const projects = ["project1"];

  projects.forEach((projName) => {
    it(projName, () => {
      const projDir = path.resolve(__dirname, projName);
      const input = fs.readFileSync(
        path.resolve(projDir, "index.html"),
        "utf-8"
      );
      const ctx = fs.readFileSync(path.resolve(projDir, "ctx.json"), "utf-8");
      const expected = fs.readFileSync(
        path.resolve(projDir, "result.html"),
        "utf-8"
      );

      const result = compile(input, {
        context: JSON.parse(ctx),
        componentsDir: path.resolve(projDir, "components"),
      });

      assert.deepEqual(result, expected);
    });
  });
});

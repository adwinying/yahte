import fs from "fs";
import path from "path";
import { pascalize } from "./helpers";
import { getOptions } from "./options";

export const getComponentHtml = (name: String) => {
  const { componentsDir, componentsExt } = getOptions();
  const componentName = name
    .replace(/^y-/, "")
    .split(".")
    .map(pascalize)
    .join("/");
  const componentFilename = `${componentName}.${componentsExt}`;
  const componentPath = path.resolve(componentsDir, componentFilename);

  let componentHtml;
  try {
    componentHtml = fs.readFileSync(componentPath, "utf-8");
  } catch (e) {
    console.warn(`[yahte] Error locating component ${name}:\n${e}`);

    throw e;
  }

  return componentHtml;
};

export default null;

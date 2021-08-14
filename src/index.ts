import { parse as parseHtml } from "node-html-parser";
import { processConfig, RawConfig } from "./config";
// eslint-disable-next-line import/no-cycle
import { parse } from "./parsers";

export const compile = (input: string, config: RawConfig = {}) => {
  const processedConfig = processConfig(config);
  const obj = parseHtml(input);

  parse(obj.childNodes, processedConfig.context);

  return obj.toString();
};

export default null;

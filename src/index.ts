import { processConfig, RawConfig } from "./config";
import { textToNode } from "./nodes";
import { parse } from "./parsers";

export const compile = (input: string, config: RawConfig = {}) => {
  const processedConfig = processConfig(config);
  const rootNode = textToNode(input);

  parse(rootNode.childNodes, processedConfig.context);

  return rootNode.toString();
};

export default null;

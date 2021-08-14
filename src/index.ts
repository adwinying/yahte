import { setOptions, RawOptions, getOptions } from "./options";
import { textToNode } from "./nodes";
import { parse } from "./parsers";

export const compile = (input: string, options: RawOptions = {}) => {
  setOptions(options);
  const rootNode = textToNode(input);

  parse(rootNode.childNodes, getOptions().context);

  return rootNode.toString();
};

export default null;

import { processOptions, RawOptions } from "./options";
import { textToNode } from "./nodes";
import { parse } from "./parsers";

export const compile = (input: string, options: RawOptions = {}) => {
  const opts = processOptions(options);
  const rootNode = textToNode(input);

  parse(rootNode.childNodes, opts.context);

  return rootNode.toString();
};

export default null;

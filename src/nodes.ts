import { parse as parseHtml } from "node-html-parser";
import { Node } from "./types/Node";

export const textToNode = (str: string) => {
  return parseHtml(str);
};

export const cloneNode = (node: Node) => {
  return parseHtml(node.toString()).childNodes;
};

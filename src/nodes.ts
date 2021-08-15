import { parse as parseHtml } from "node-html-parser";
import { Node } from "./types/Node";

export const textToNode = (str: string) => {
  return parseHtml(str, { comment: true });
};

export const cloneNode = (node: Node) => {
  return textToNode(node.toString()).childNodes;
};

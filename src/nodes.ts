import { parse as parseHtml } from "node-html-parser";
import { Node } from "./types/Node";

export const textToNode = (str: string): Node => {
  return parseHtml(str, { comment: true });
};

export const cloneNode = (node: Node): Node => {
  return textToNode(node.toString());
};

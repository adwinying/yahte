import { parse as parseHtml } from "node-html-parser";
import { camelCase, upperFirst } from "lodash";
import { Node, HtmlNode, TextNode } from "./types/Node";

export const isHtmlNode = (obj: any): obj is HtmlNode => obj.nodeType === 1;
export const isTextNode = (obj: any): obj is TextNode => obj.nodeType === 3;

export const camelize = (str: string) => {
  return camelCase(str);
};

export const pascalize = (str: string) => {
  return upperFirst(camelCase(str));
};

export const cloneNode = (node: Node) => {
  return parseHtml(node.toString()).childNodes;
};

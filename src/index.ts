import { parse as parseHtml } from "node-html-parser";
import { Node, HtmlNode, TextNode } from "./types/Node";
import { parseAttrs, parseText } from "./parsers";

const isHtmlNode = (obj: any): obj is HtmlNode => obj.nodeType === 1;
const isTextNode = (obj: any): obj is TextNode => obj.nodeType === 3;

const parse = (nodes: Node[], ctx: object) => {
  nodes.forEach((node) => {
    parse(node.childNodes, ctx);

    if (isHtmlNode(node)) parseAttrs(node, ctx);
    if (isTextNode(node)) parseText(node, ctx);
  });
};

export const compile = (input: string, ctx: object = {}) => {
  const obj = parseHtml(input);

  parse(obj.childNodes, ctx);

  return obj.toString();
};

export default null;

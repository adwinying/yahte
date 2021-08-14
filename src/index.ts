import { parse as parseHtml } from "node-html-parser";
import { Node, HtmlNode, TextNode } from "./types/Node";
// eslint-disable-next-line import/no-cycle
import { parseConds, parseLoops, parseAttrs, parseText } from "./parsers";

const isHtmlNode = (obj: any): obj is HtmlNode => obj.nodeType === 1;
const isTextNode = (obj: any): obj is TextNode => obj.nodeType === 3;

const parse = (nodes: Node[], ctx: object) => {
  nodes.forEach((node) => {
    if (isHtmlNode(node)) {
      parseConds(node, ctx);
      if (parseLoops(node, ctx)) return;
      parseAttrs(node, ctx);
    }
    if (isTextNode(node)) parseText(node, ctx);

    parse(node.childNodes, ctx);
  });
};

export const compile = (input: string, ctx: object = {}) => {
  const obj = parseHtml(input);

  parse(obj.childNodes, ctx);

  return obj.toString();
};

export default null;

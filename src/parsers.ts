import { HtmlNode, TextNode } from "./types/Node";
import { kebabToCamel } from "./helpers";

export const parseAttrs = (node: HtmlNode, ctx: Record<string, any>) => {
  const attrs = node.attributes;

  Object.keys(attrs).forEach((attr) => {
    const isBindAttr = /^y-bind:.+$/.test(attr);

    if (!isBindAttr) return;

    const varName = attr.split(":")[1];
    const varNameCamel = kebabToCamel(varName);
    const varVal = ctx[varNameCamel];

    node.removeAttribute(attr);
    node.setAttribute(varName, `${varVal}`);
  });
};

export const parseText = (node: TextNode, ctx: Record<string, any>) => {
  let { rawText } = node;
  const textToParse = rawText.match(/{{.+?}}/g);

  if (textToParse === null) return;

  textToParse.forEach((text) => {
    const varName = text.replace(/[{}\s]*/g, "");
    const varVal = ctx[varName];

    rawText = rawText.replace(text, `${varVal}`);
  });

  node.rawText = rawText;
};

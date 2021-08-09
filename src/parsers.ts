import { HtmlNode, TextNode } from "./types/Node";
import { evaluate } from "./evaluators";

export const parseConds = (node: HtmlNode, ctx: Record<string, any>) => {
  const condKey = "y-if";
  const attrs = node.attributes;

  const expression = attrs[condKey];

  if (expression === undefined) return;

  const result = evaluate(expression, ctx);

  if (!result) node.remove();
  else node.removeAttribute(condKey);
};

export const parseAttrs = (node: HtmlNode, ctx: Record<string, any>) => {
  const attrs = node.attributes;

  Object.entries(attrs).forEach(([attr, expression]) => {
    const isBindAttr = /^y-bind:.+$/.test(attr);

    if (!isBindAttr) return;

    const attrName = attr.split(":")[1];
    const result = evaluate(expression, ctx);

    node.removeAttribute(attr);
    node.setAttribute(attrName, `${result}`);
  });
};

export const parseText = (node: TextNode, ctx: Record<string, any>) => {
  let { rawText } = node;
  const textToParse = rawText.match(/{{.+?}}/g);

  if (textToParse === null) return;

  textToParse.forEach((text) => {
    const expression = text.replace(/[{}\s]*/g, "");
    const result = evaluate(expression, ctx);

    rawText = rawText.replace(text, `${result}`);
  });

  node.rawText = rawText;
};

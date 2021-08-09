import { HtmlNode, TextNode } from "./types/Node";
import { evaluate } from "./evaluators";

type CondKey = "y-if" | "y-else-if" | "y-else";

export const parseConds = (
  node: HtmlNode,
  ctx: Record<string, any>,
  condKey: CondKey = "y-if",
  matched: boolean = false
) => {
  const attrs = node.attributes;

  const expression = attrs[condKey];

  if (expression === undefined) return;

  if (matched) {
    if (node.nextElementSibling !== null) {
      parseConds(node.nextElementSibling, ctx, "y-else-if", true);
      parseConds(node.nextElementSibling, ctx, "y-else", true);
    }
    node.remove();
    return;
  }

  if (condKey === "y-else") {
    node.removeAttribute(condKey);
    return;
  }

  const result = evaluate(expression, ctx);

  if (!result) {
    if (node.nextElementSibling !== null) {
      parseConds(node.nextElementSibling, ctx, "y-else-if", false);
      parseConds(node.nextElementSibling, ctx, "y-else", false);
    }
    node.remove();
    return;
  }

  node.removeAttribute(condKey);
  if (node.nextElementSibling !== null) {
    parseConds(node.nextElementSibling, ctx, "y-else-if", true);
    parseConds(node.nextElementSibling, ctx, "y-else", true);
  }
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

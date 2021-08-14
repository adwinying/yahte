import { HtmlNode, TextNode } from "./types/Node";
import { evaluate } from "./evaluators";
// eslint-disable-next-line import/no-cycle
import { compile } from "./index";

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

export const parseLoops = (node: HtmlNode, ctx: Record<string, any>) => {
  const attrs = node.attributes;

  const expression = attrs["y-for"];

  if (expression === undefined) return false;

  const [iterationExpr, arrExpr] = expression.split("in");
  const [elExpr, idxExpr] = iterationExpr.replace(/\s|\(|\)/g, "").split(",");

  const arrVal = evaluate(arrExpr, ctx);

  if (!Array.isArray(arrVal)) {
    console.warn(`[yahte] Expression error: ${arrExpr} is not an array`);
    return false;
  }

  node.removeAttribute("y-for");
  const nodeStr = node.toString();

  const parsedNodes = arrVal.map((arrEl, idx) => {
    return compile(nodeStr, { ...ctx, [elExpr]: arrEl, [idxExpr]: idx });
  });

  node.replaceWith(...parsedNodes);

  return true;
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

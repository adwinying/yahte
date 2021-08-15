import { Node, HtmlNode, TextNode } from "./types/Node";
import { cloneNode, textToNode } from "./nodes";
import { getComponentHtml } from "./components";
import { evaluate } from "./evaluators";
import { isHtmlNode, isTextNode, isObject } from "./helpers";

/* eslint-disable @typescript-eslint/no-use-before-define */

type CondKey = "y-if" | "y-else-if" | "y-else";

const parseConds = (
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

const parseLoops = (node: HtmlNode, ctx: Record<string, any>) => {
  const attrs = node.attributes;

  const expression = attrs["y-for"];

  if (expression === undefined) return false;

  const [iterationExpr, arrExpr] = expression.split("in");
  const [elExpr, idxExpr] = iterationExpr.replace(/\s|\(|\)/g, "").split(",");

  const arrVal = evaluate(arrExpr, ctx);

  if (!Array.isArray(arrVal))
    throw new Error(`[yahte] Expression error: ${arrExpr} is not an array`);

  node.removeAttribute("y-for");

  const parsedNodes = arrVal.map((arrEl, idx) => {
    const clonedNode = cloneNode(node);

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    parse(clonedNode, { ...ctx, [elExpr]: arrEl, [idxExpr]: idx });

    return clonedNode.toString();
  });

  node.replaceWith(...parsedNodes);

  return true;
};

const parseAttrs = (node: HtmlNode, ctx: Record<string, any>) => {
  const attrs = node.attributes;

  const bindExpr = attrs["y-bind"];

  if (bindExpr !== undefined) {
    const bindings = evaluate(bindExpr, ctx);

    node.removeAttribute("y-bind");

    if (!isObject(bindings))
      throw new Error(`[yahte] Expression error: ${bindExpr} is not an object`);

    Object.entries(bindings).forEach(([attr, expression]) => {
      node.setAttribute(attr, expression);
    });
  }

  Object.entries(attrs).forEach(([attr, expression]) => {
    const isBindAttr = /^y-bind:.+$/.test(attr);

    if (!isBindAttr) return;

    const attrName = attr.split(":")[1];
    const result = evaluate(expression, ctx);
    const attrVal =
      typeof result === "string" ? result : JSON.stringify(result);

    node.removeAttribute(attr);
    node.setAttribute(attrName, attrVal);
  });
};

const parseText = (node: TextNode, ctx: Record<string, any>) => {
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

const parseSlots = (node: HtmlNode, ctx: Record<string, any>) => {
  const tagName = node.tagName.toLowerCase();
  const isSlot = /^y-slot$/.test(tagName);

  if (!isSlot) return false;

  const slotNode = ctx._slot;

  if (slotNode === undefined) throw new Error(`[yahte] Slot is undefined`);

  node.replaceWith(...slotNode);

  return true;
};

const parseComponents = (node: HtmlNode, ctx: Record<string, any>) => {
  const tagName = node.tagName.toLowerCase();
  const isComponent = /^y-.+$/.test(tagName);

  if (!isComponent) return;

  const componentHtml = getComponentHtml(tagName);
  const componentNode = textToNode(componentHtml);
  const attrs = node.attributes;

  componentNode.childNodes.forEach((childNode) => {
    if (isHtmlNode(childNode)) childNode.setAttributes(attrs);
  });

  const childrenNodes = node.childNodes;
  parse(node.childNodes, ctx);

  const newCtx: Record<string, any> = { ...attrs, _slot: childrenNodes };
  Object.entries(newCtx).forEach(([key, val]) => {
    if (/^_.+$/.test(key)) return;

    try {
      newCtx[key] = JSON.parse(val);
    } catch (e) {
      newCtx[key] = val;
    }
  });

  parse(componentNode.childNodes, newCtx);

  node.replaceWith(componentNode);
};

export const parse = (nodes: Node[], ctx: object) => {
  nodes.forEach((node) => {
    if (isHtmlNode(node)) {
      if (parseSlots(node, ctx)) return;
      parseConds(node, ctx);
      if (parseLoops(node, ctx)) return;
      parseAttrs(node, ctx);
      parseComponents(node, ctx);
    }
    if (isTextNode(node)) parseText(node, ctx);

    parse(node.childNodes, ctx);
  });
};

export default null;

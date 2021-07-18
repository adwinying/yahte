import { parse as parseHtml } from "node-html-parser";
import { kebabToCamel } from "./helpers";

// y-if="foobar"
// y-else
// y-for="foo in bar"
// <y-custom-component>

interface Node {
  childNodes: Node[];
}
interface HtmlNode extends Node {
  attributes: Record<string, string>;
  removeAttribute(key: string): void;
  setAttribute(key: string, value: string): void;
}
interface TextNode extends Node {
  rawText: String;
}

const isHtmlNode = (obj: any): obj is HtmlNode => obj.nodeType === 1;
const isTextNode = (obj: any): obj is TextNode => obj.nodeType === 3;

const parseAttrs = (node: HtmlNode, ctx: Record<string, any>) => {
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

const parseText = (node: TextNode, ctx: Record<string, any>) => {
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

const parse = (nodes: Node[], ctx: object) => {
  nodes.forEach((node) => {
    parse(node.childNodes, ctx);

    if (isHtmlNode(node)) parseAttrs(node, ctx);
    if (isTextNode(node)) parseText(node, ctx);
  });
};

const compile = (input: string, ctx: object = {}) => {
  const obj = parseHtml(input);

  parse(obj.childNodes, ctx);

  return obj.toString();
};

console.log(
  compile(
    `<div class="smth" y-bind:test="test" y-bind:foo-bar="fooBar">hello<span>{{ foo }} bar {{ foo }}</span></div>`,
    { foo: "wee", test: "woo", fooBar: "weewoo" }
  )
);

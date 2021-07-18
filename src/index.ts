import { parse as parseHtml } from "node-html-parser";
import { Node, HtmlNode, TextNode } from "./types/Node";
import { parseAttrs, parseText } from "./parsers";

// y-if="foobar"
// y-else
// y-for="foo in bar"
// {{ foobar }}
// <y-custom-component>

const isHtmlNode = (obj: any): obj is HtmlNode => obj.nodeType === 1;
const isTextNode = (obj: any): obj is TextNode => obj.nodeType === 3;

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

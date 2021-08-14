export interface Node {
  childNodes: Node[];
  toString(): string;
}

export interface HtmlNode extends Node {
  attributes: Record<string, string>;
  tagName: string;
  nextElementSibling: HtmlNode | null;
  replaceWith(...nodes: (string | Node)[]);
  removeAttribute(key: string): void;
  remove(): void;
  setAttribute(key: string, value: string): void;
  setAttributes(attrs: Record<string, string>): void;
}

export interface TextNode extends Node {
  rawText: String;
}

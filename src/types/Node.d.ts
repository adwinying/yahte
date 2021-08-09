export interface Node {
  childNodes: Node[];
}

export interface HtmlNode extends Node {
  attributes: Record<string, string>;
  removeAttribute(key: string): void;
  remove(): void;
  setAttribute(key: string, value: string): void;
}

export interface TextNode extends Node {
  rawText: String;
}

import StyleParser from './styleParser';

export default class StyleBuilder {
  private parser: StyleParser;
  private element: Element;

  constructor(element: Element) {
    this.element = element;
    this.parser = new StyleParser(element.getAttribute('style'));
  }

  flush() {
    const styleAttr = this.parser.toString();
    this.element.setAttribute('style', styleAttr);
  }

  get style(): StyleParser {
    return this.parser;
  }
}

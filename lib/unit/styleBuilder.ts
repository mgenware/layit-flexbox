import StyleParser from './styleParser';

export default class StyleBuilder {
  private parser: StyleParser;
  private element: Element;

  constructor(src: Element|null, dest: Element) {
    this.element = dest;

    const styleAttr = src ? this.getStyleAttribute(src) : '';
    this.parser = new StyleParser(styleAttr);
    this.parser.merge(this.getStyleAttribute(dest));
  }

  flush() {
    const styleAttr = this.parser.toString();
    this.element.setAttribute('style', styleAttr);
  }

  get style(): StyleParser {
    return this.parser;
  }

  private getStyleAttribute(element: Element): string {
    return element.getAttribute('style') || '';
  }
}

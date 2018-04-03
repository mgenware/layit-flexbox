import StyleParser from './styleParser';

export default class StyleBuilder {
  private parser: StyleParser;
  private element: Element;

  constructor(src: Element|null, dest: Element) {
    this.element = dest;

    const styleAttr = src ? src.getAttribute('style') : '';
    this.parser = new StyleParser(styleAttr);
  }

  flush() {
    const styleAttr = this.parser.toString();
    this.element.setAttribute('style', styleAttr);
  }

  get style(): StyleParser {
    return this.parser;
  }
}

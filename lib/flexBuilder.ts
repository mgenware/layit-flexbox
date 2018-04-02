import { Builder, outerXML } from 'layit';
import FlexHandler from './flexHandler';
import Option from './option';
import log from './log';
import StyleBuilder from './unit/styleBuilder';

export default class FlexBuilder extends Builder {
  private opt: Option;

  constructor(opt?: Option) {
    opt = opt || new Option();
    super(new FlexHandler(opt));
    this.opt = opt;
  }

  build(document: Document): any {
    const generatedElement = super.build(document) as Element;
    // Stretch this to parent's size
    const sb = new StyleBuilder(generatedElement);
    sb.style.flex = '1 1 0';
    sb.flush();

    if (this.opt.logging) {
      log('build', outerXML(generatedElement));
    }
    return outerXML(generatedElement);
  }
}

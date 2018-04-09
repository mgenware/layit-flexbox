import { Builder, Util } from 'layit';
import FlexHandler from './flexHandler';
import Option from './option';
import log from './log';
import IOption from './option';
import * as prettier from 'prettier';

export default class FlexBuilder extends Builder {
  private opt: Option;

  constructor(opt?: IOption) {
    opt = opt || {};
    super(new FlexHandler(opt));
    this.opt = opt;
  }

  build(document: Document): any {
    const generatedElement = super.build(document) as Element;
    if (!generatedElement) {
      return undefined;
    }

    if (this.opt.logging) {
      log('build', Util.outerXML(generatedElement));
    }
    const html = Util.outerXML(generatedElement) || '';
    if (this.opt.minify) {
      return html;
    }
    return prettier.format(html);
  }
}

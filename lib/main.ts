import { Builder } from '/Users/yuanyuanliu/layit';
import FlexHandler from './flexHandler';
import Option from './option';
import log from './log';
const xml = require('xml');

export default class FlexBuilder extends Builder {
  private opt: Option;

  constructor(opt?: Option) {
    opt = opt || new Option();
    super(new FlexHandler(opt));
    this.opt = opt;
  }

  build(element: Element): object {
    const ret = super.build(element);
    if (this.opt.logging) {
      log('build', ret);
    }
    const xmlString = xml(ret);
    return xmlString;
  }
}

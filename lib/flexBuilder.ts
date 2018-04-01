import { Builder } from '/Users/yuanyuanliu/layit';
import FlexHandler from './flexHandler';
import Option from './option';
import log from './log';

export default class FlexBuilder extends Builder {
  private opt: Option;

  constructor(opt?: Option) {
    opt = opt || new Option();
    super(new FlexHandler(opt));
    this.opt = opt;
  }

  build(element: Element): any {
    const generatedElement = super.build(element) as HTMLElement;
    // Stretch this to parent's size
    generatedElement.style.flex = '1 1 0';

    if (this.opt.logging) {
      log('build', generatedElement.outerHTML);
    }
    return generatedElement.outerHTML;
  }
}

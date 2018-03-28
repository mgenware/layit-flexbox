import { Context, Handler, Defs } from '/Users/yuanyuanliu/layit';
import defs from './defs';
import Option from './option';
import log from './log';

export default class FlexHandler extends Handler {
  private opt: Option;

  constructor(opt: Option) {
    super();
    this.opt = opt;
  }

  handleBuiltin(ctx: Context): any {
    const { builtin } = Defs;
    switch (ctx.tagName) {
      case builtin.h: {
        return this.handleList(ctx, false, ctx.children);
      }

      case builtin.v: {
        return this.handleList(ctx, true, ctx.children);
      }

      default: {
        return this.handleHTML(ctx);
      }
    }
  }

  handleExternal(ctx: Context): any {
    // tslint:disable-next-line no-any
    const ret = {} as any;
    ret[ctx.tagName] = ctx.children.map((c) => ctx.handleDefault(c));

    if (this.opt.logging) {
      log('handleExternal', ret);
    }
    return ret;
  }

  private handleList(ctx: Context, vertical: boolean, children: Element[]): Node {
    const element = document.createElement('div');

    // Set the flex and flex-direction CSS styles
    const styleAttr = defs.cssDisplayFlex + (vertical ? defs.cssDirectionColumn : '');
    element.setAttribute('style', styleAttr);

    // Set child elements
    for (const child of children) {
      const childElement = ctx.handleDefault(child) as Node;
      element.appendChild(childElement);
    }

    if (this.opt.logging) {
      log('handleList', element.outerHTML);
    }
    return element;
  }

  private handleHTML(ctx: Context): Node {
    return ctx.element;
  }
}

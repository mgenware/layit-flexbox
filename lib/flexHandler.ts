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

  handleBuiltin(ctx: Context): object {
    const { builtin } = Defs;
    switch (ctx.tagName) {
      case builtin.h: {
        return this.handleList(ctx, false, ctx.children);
      }

      case builtin.v: {
        return this.handleList(ctx, true, ctx.children);
      }
    }

    // This will throw an exception like "xxx tag is not supported".
    this.throwNotSupportedTagName(ctx.tagName);
    // This is a actually unreachable code used for shutting down the warning: Function lacks ending return statement and return type does not include 'undefined'
    return new Object();
  }

  handleExternal(ctx: Context): object {
    // tslint:disable-next-line no-any
    const ret = {} as any;
    ret[ctx.tagName] = ctx.children.map((c) => ctx.handleDefault(c));

    if (this.opt.logging) {
      log('handleExternal', ret);
    }
    return ret;
  }

  private handleList(ctx: Context, vertical: boolean, children: Element[]): object {
    const objChildren: any[] = [];
    const specialAttrChild: any = {};
    const objAttr: any = specialAttrChild._attr = {};
    const obj: any = {};
    obj[defs.div] = objChildren;
    objChildren.push(specialAttrChild);

    // Set the flex and flex-direction CSS styles
    objAttr.style = defs.cssDisplayFlex + (vertical ? defs.cssDirectionColumn : '');

    // Set child elements
    objChildren.push(children.map((c) => ctx.handleDefault(c)));

    if (this.opt.logging) {
      log('handleList', obj);
    }
    return obj;
  }
}

import { Context, Handler, Defs } from 'layit';
import Option from './option';
import VHHandler from './handlers/vh';
import BoxHandler from './handlers/box';

export default class FlexHandler extends Handler {
  private opt: Option;

  constructor(opt: Option) {
    super();
    this.opt = opt;
  }

  handleElement(ctx: Context): Element {
    const opt = this.opt;
    switch (ctx.tagName) {
      case Defs.h: {
        return VHHandler.handle(ctx, opt, false);
      }

      case Defs.v: {
        return VHHandler.handle(ctx, opt, true);
      }

      case Defs.box: {
        return BoxHandler.handle(ctx, opt);
      }

      default: {
        return this.handleHTML(ctx);
      }
    }
  }

  private handleHTML(ctx: Context): Element {
    return ctx.element;
  }
}

import { Context, Handler } from '../../layit';
import defs from './defs';
const xml = require('xml');

export default class FlexHandler extends Handler {
  handleBuiltin(ctx: Context): object {
    // tslint:disable-next-line no-any
    const ret = {} as any;
    ret[ctx.tagName] = ctx.children.map((c) => ctx.handleDefault(c));
    return ret;
  }

  handleExternal(ctx: Context): object {
    // tslint:disable-next-line no-any
    const ret = {} as any;
    ret[ctx.tagName] = ctx.children.map((c) => ctx.handleDefault(c));
    return ret;

  }

  private handleList(ctx: Context, vertical: boolean, children: Element[]): object {
    const objAttr: any = {};
    const obj: any = {};
    obj._attr = objAttr;

    // Set the flex and flex-direction CSS styles
    objAttr.style = defs.cssDisplayFlex + (vertical ? defs.cssDirectionColumn : '');

    const childObjs = children.map((c) => ctx.handleDefault(c));
    obj[defs.div] = childObjs;

    return obj;
  }
}

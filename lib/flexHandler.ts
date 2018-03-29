import { Context, Handler, Defs } from '/Users/yuanyuanliu/layit';
import defs from './defs';
import Option from './option';
import log from './log';
import { SizeType, Size } from './unit/size';
import SizeParser from './unit/sizeParser';

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

  private handleList(ctx: Context, vertical: boolean, children: Element[]): HTMLElement {
    const element = document.createElement('div');

    // Set the flex and flex-direction CSS styles
    Object.assign(element.style, { display: 'flex' });
    if (vertical) {
      Object.assign(element.style, { flexDirection: 'column'});
    }

    // Set child elements
    for (const child of children) {
      // Get size attribute
      const sizeAttr = child.getAttribute(defs.size) || '';
      let size: Size;
      try {
        size = SizeParser.parse(sizeAttr);
      } catch (err) {
        throw new Error(`Error parsing size attribute "${sizeAttr}", message: ${err.message}, element: ${child.outerHTML}`);
      }

      // Generate child element
      const generatedChild = ctx.handleDefault(child) as HTMLElement;

      // Apply size value
      switch (size.type) {
        case SizeType.auto: {
          Object.assign(generatedChild.style, { flex: '0 1 auto' });
          break;
        }

        case SizeType.absolute: {
          Object.assign(generatedChild.style, { flex: `0 1 ${size.absoluteValue}` });
          break;
        }

        case SizeType.proportional: {
          Object.assign(generatedChild.style, { flex: `${size.proportion} 1 0` });
          break;
        }
      }

      // Append child element to parent
      element.appendChild(generatedChild);
    }

    if (this.opt.logging) {
      log('handleList', element.outerHTML);
    }
    return element;
  }

  private handleHTML(ctx: Context): Element {
    return ctx.element;
  }
}

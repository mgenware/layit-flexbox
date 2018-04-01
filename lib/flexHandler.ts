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

  handleElement(ctx: Context): any {
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

  private handleList(ctx: Context, vertical: boolean, children: Element[]): HTMLElement {
    const element = document.createElement('div');

    // Set the flex and flex-direction CSS styles
    element.style.display = 'flex';
    if (vertical) {
      element.style.flexDirection = 'column';
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
          generatedChild.style.flex = '0 1 auto';
          break;
        }

        case SizeType.absolute: {
          generatedChild.style.flex = `0 1 ${size.absoluteValue}`;
          break;
        }

        case SizeType.proportional: {
          generatedChild.style.flex = `${size.proportion} 1 0`;
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

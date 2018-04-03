import { Context, Handler, Defs, outerXML } from 'layit';
import defs from './defs';
import Option from './option';
import log from './log';
import { SizeType, Size } from './unit/size';
import SizeParser from './unit/sizeParser';
import StyleBuilder from './unit/styleBuilder';

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
    const element = ctx.document.createElement('div');

    // Set the flex and flex-direction CSS styles
    const elementSB = new StyleBuilder(element);
    elementSB.style.display = 'flex';
    elementSB.style.flex = '1 1 0';
    elementSB.style.flexDirection = vertical ? 'column' : 'row';
    elementSB.flush();

    // Set child elements
    for (const child of children) {
      // Get the size attribute
      const sizeAttr = child.getAttribute(defs.size) || '';
      // Remove the size attribute from DOM
      child.removeAttribute(defs.size);

      let size: Size;
      try {
        size = SizeParser.parse(sizeAttr);
      } catch (err) {
        throw new Error(`Error parsing size attribute "${sizeAttr}", message: ${err.message}, element: ${outerXML(child)}`);
      }

      // Generate child element
      const generatedChild = ctx.handleDefault(child) as HTMLElement;
      const styleBS = new StyleBuilder(child);

      // Apply size value
      switch (size.type) {
        case SizeType.auto: {
          // auto size: grow=0, shrink=1
          styleBS.style.flex = '0 1 auto';
          break;
        }

        case SizeType.absolute: {
          // absolute size: grow=0, shrink=1
          styleBS.style.flex = `0 1 ${size.absoluteValue}`;
          break;
        }

        case SizeType.proportional: {
          // wild size: grow=1, shrink=1
          styleBS.style.flex = `${size.proportion} 1 0`;
          break;
        }
      }

      // Set style attribute
      styleBS.flush();
      // Append child element to parent
      element.appendChild(generatedChild);
    }

    if (this.opt.logging) {
      log('handleList', outerXML(element));
    }
    return element;
  }

  private handleHTML(ctx: Context): Element {
    return ctx.element;
  }
}

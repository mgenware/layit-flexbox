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

  handleBuiltin(ctx: Context): any {
    switch (ctx.tagName) {
      case Defs.h: {
        return this.handleList(ctx, false, ctx.children);
      }

      case Defs.v: {
        return this.handleList(ctx, true, ctx.children);
      }

      case Defs.box: {
        return this.handleBox(ctx);
      }

      default: {
        this.throwNotSupportedTagName(ctx.tagName);
      }
    }
  }

  handleExternal(ctx: Context): any {
    return this.handleHTML(ctx);
  }

  private handleList(ctx: Context, vertical: boolean, children: Element[]): Element {
    const div = ctx.document.createElement('div');

    // Set the flex and flex-direction CSS styles
    const divSB = this.setFlexboxStyles(ctx.element, div);
    divSB.style.flexDirection = vertical ? 'column' : 'row';
    divSB.flush();

    // Set child elements
    for (const child of children) {
      // Get the size attribute
      const sizeAttr = this.getAndRemoveAttr(child, defs.size);

      let size: Size;
      try {
        size = SizeParser.parse(sizeAttr);
      } catch (err) {
        throw new Error(`Error parsing size attribute "${sizeAttr}", message: ${err.message}, element: ${outerXML(child)}`);
      }

      // Generate child element
      const childDiv = ctx.handleDefault(child) as Element;
      const childBS = new StyleBuilder(child, childDiv);

      // Apply size value
      switch (size.type) {
        case SizeType.auto: {
          // auto size: grow=0, shrink=1
          childBS.style.flex = '0 1 auto';
          break;
        }

        case SizeType.absolute: {
          // absolute size: grow=0, shrink=1
          childBS.style.flex = `0 1 ${size.absoluteValue}`;
          break;
        }

        case SizeType.proportional: {
          // wild size: grow=1, shrink=1
          childBS.style.flex = `${size.proportion} 1 0`;
          break;
        }
      }

      // Set style attribute
      childBS.flush();
      // Append child element to parent
      div.appendChild(childDiv);
    }

    if (this.opt.logging) {
      log('handleList', outerXML(div));
    }
    return div;
  }

  private handleBox(ctx: Context): Element {
    const div = ctx.document.createElement('div');
    const sb = this.setFlexboxStyles(ctx.element, div);
    const marginAttr = this.getAndRemoveAttr(div, defs.margin);
    sb.style.margin = marginAttr;
    return div;
  }

  private handleHTML(ctx: Context): Element {
    return ctx.element;
  }

  private setFlexboxStyles(src: Element|null, dest: Element): StyleBuilder {
    const sb = new StyleBuilder(src, dest);
    sb.style.display = defs.flex;
    sb.style.flex = defs.cssFlexFullSize;
    sb.flush();
    return sb;
  }

  private getAndRemoveAttr(element: Element, name: string): string {
    // Get the size attribute
    const value = element.getAttribute(name) || '';
    // Remove the size attribute from DOM
    element.removeAttribute(name);
    return value;
  }
}

import { Context, Handler, Defs, Util } from 'layit';
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

  handleElement(ctx: Context): Element {
    switch (ctx.tagName) {
      case Defs.h: {
        return this.handleList(ctx, false);
      }

      case Defs.v: {
        return this.handleList(ctx, true);
      }

      case Defs.box: {
        return this.handleBox(ctx);
      }

      default: {
        return this.handleHTML(ctx);
      }
    }
  }

  private handleList(ctx: Context, vertical: boolean): Element {
    const dest = ctx.document.createElement('div');
    const { childElements } = ctx;

    // Set the flex and flex-direction CSS styles
    const divSB = this.setFlexboxStyles(ctx.element, dest);
    divSB.style.flexDirection = vertical ? 'column' : 'row';
    divSB.flush();

    // Set child elements
    for (const child of childElements) {
      // Get the size attribute
      const sizeAttr = this.getElementAttr(child, defs.size);

      let size: Size;
      try {
        size = SizeParser.parse(sizeAttr);
      } catch (err) {
        throw new Error(`Error parsing size attribute "${sizeAttr}", message: ${err.message}, element: ${Util.outerXML(child)}`);
      }

      // Generate child element
      const childDiv = ctx.handleDefault(child) as Element;
      const childBS = new StyleBuilder(null, childDiv);

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
      dest.appendChild(childDiv);
    }

    if (!childElements.length) {
      // No child elements, try copying text nodes to dest element
      this.copyTextChildren(ctx.element, dest);
    }

    if (this.opt.logging) {
      log('handleList', Util.outerXML(dest));
    }
    return dest;
  }

  private handleBox(ctx: Context): Element {
    const dest = ctx.document.createElement('div');
    const sb = this.setFlexboxStyles(ctx.element, dest);
    const marginAttr = this.getElementAttr(ctx.element, defs.margin);
    sb.style.margin = marginAttr;
    sb.flush();

    // Handle child
    const { childElements } = ctx;
    if (childElements.length > 1) {
      throw new Error(`<box> can only contain 1 child, got ${childElements.length}`);
    }

    if (childElements.length) {
      const child = childElements[0];
      const childDiv = ctx.handleDefault(child) as Element;
      // Append child element to parent
      dest.appendChild(childDiv);
    } else {
      this.copyTextChildren(ctx.element, dest);
    }

    if (this.opt.logging) {
      log('handleBox', Util.outerXML(dest));
    }
    return dest;
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

  private getElementAttr(element: Element, name: string): string {
    return element.getAttribute(name) || '';
  }

  private copyTextChildren(src: Element, dest: Element) {
    if (!src.childNodes.length) {
      return;
    }
    for (let i = 0; i < src.childNodes.length; i++) {
      const node = src.childNodes[i];
      if (node.nodeType === Node.TEXT_NODE) {
        dest.appendChild(node);
      }
    }
  }
}

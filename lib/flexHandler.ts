import { Context, Handler, Defs, Util } from 'layit';
import defs from './defs';
import Option from './option';
import log from './log';
import { SizeType, Size, SizeParser } from './unit/size';
import StyleBuilder from './unit/styleBuilder';
import { AlignmentParser, HAlignment, VAlignment } from './unit/align';

const ELEMENT_NODE = 1;

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
    if (vertical) {
      divSB.style.flexDirection = vertical ? 'column' : 'row';
      divSB.flush();
    }

    // Set child elements
    for (const child of childElements) {
      // Get the size attribute
      const sizeAttr = this.getElementAttr(child, Defs.vhSize);

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
      this.passChildren(ctx, dest);
    }

    if (this.opt.logging) {
      log('handleList', Util.outerXML(dest));
    }
    return dest;
  }

  private handleBox(ctx: Context): Element {
    const src = ctx.element;
    const dest = ctx.document.createElement('div');

    const marginAttr = this.getElementAttr(src, Defs.boxMargin);
    const vAlignAttr = AlignmentParser.vAlignment(this.getElementAttr(src, Defs.boxVAlign));
    const hAlignAttr = AlignmentParser.hAlignment(this.getElementAttr(src, Defs.boxHAlign));

    if (hAlignAttr === HAlignment.stretch && vAlignAttr === VAlignment.stretch) {
      // Stretched in both directions, no need any wrapper elements
      const sb = this.setFlexboxStyles(src, dest);
      // Margin attribute
      sb.style.margin = marginAttr;

      // Flush styles
      sb.flush();

      // Process children
      this.passChildren(ctx, dest);
    } else {
      const innerWrapper = ctx.document.createElement('div');

      // Adjust attributes for HAlignment
      let innerFlexGrow: string;
      let innerFlexBasis: string;
      let outerJustifyContent: string|null = null;
      if (hAlignAttr === HAlignment.stretch) {
        // outerJustifyContent stays null when hAlignAttr is stretch
        innerFlexGrow = '1';
        innerFlexBasis = '0';
      } else {
        innerFlexGrow = '0';
        innerFlexBasis = defs.auto;

        if (hAlignAttr === HAlignment.center) {
          outerJustifyContent = defs.center;
        } else if (hAlignAttr === HAlignment.left) {
          outerJustifyContent = defs.flexStart;
        } else {
          outerJustifyContent = defs.flexEnd;
        }
      }

      // Adjust attributes for VAlignment
      let outerAlignItems: string|null = null;
      if (vAlignAttr !== VAlignment.stretch) {
        if (vAlignAttr === VAlignment.middle) {
          outerAlignItems = defs.center;
        } else if (vAlignAttr === VAlignment.top) {
          outerAlignItems = defs.flexStart;
        } else {
          outerAlignItems = defs.flexEnd;
        }
      }

      // Note that src element's style should be copied to inner style builder
      const outerSB = new StyleBuilder(null, dest);
      // Flex attributes
      outerSB.style.display = defs.flex;
      outerSB.style.flex = defs.cssFlexFullSize;
      if (outerJustifyContent) {
        outerSB.style.justifyContent = outerJustifyContent;
      }
      if (outerAlignItems) {
        outerSB.style.alignItems = outerAlignItems;
      }

      const innerSB = new StyleBuilder(src, innerWrapper);
      // Flex attributes
      innerSB.style.display = defs.flex;
      innerSB.style.flex = `${innerFlexGrow} 0 ${innerFlexBasis}`;

      // Margin attribute
      innerSB.style.margin = marginAttr;

      // Flush styles
      outerSB.flush();
      innerSB.flush();

      // Add to DOM
      dest.appendChild(innerWrapper);
      this.passChildren(ctx, innerWrapper);
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

  private passChildren(ctx: Context, dest: Element) {
    const src = ctx.element;
    if (!src.childNodes.length) {
      return;
    }
    for (let i = 0; i < src.childNodes.length; i++) {
      const node = src.childNodes[i];
      if (node.nodeType === ELEMENT_NODE) {
        const childSrc = node as Element;
        const childDest = ctx.handleDefault(childSrc) as Element;
        if (!childDest) {
          throw new Error(`Unexpected null value when passing childNodes, target node: ${Util.outerXML(childSrc)}`);
        }
        dest.appendChild(childDest);
      } else {
        dest.appendChild(node);
      }
    }
  }
}

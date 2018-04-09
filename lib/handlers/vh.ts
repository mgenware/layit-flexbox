import DomUtil from './domUtil';
import Option from '../option';
import { Defs, Context, Util } from 'layit';
import StyleBuilder from '../unit/styleBuilder';
import log from '../log';
import { SizeType, Size, SizeParser } from '../unit/size';

export default class VHHandler {
  static handle(ctx: Context, option: Option, vertical: boolean): Element {
    const dest = ctx.document.createElement('div');
    const { childElements } = ctx;

    // Set the flex and flex-direction CSS styles
    const divSB = DomUtil.setFlexboxStyles(ctx.element, dest);
    if (vertical) {
      divSB.style.flexDirection = vertical ? 'column' : 'row';
      divSB.flush();
    }

    // Set child elements
    for (const child of childElements) {
      // Get the size attribute
      const sizeAttr = DomUtil.getElementAttr(child, Defs.vhSize);

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
      DomUtil.handleChildren(ctx, dest);
    }

    if (option.logging) {
      log('handleList', Util.outerXML(dest));
    }
    return dest;
  }
}

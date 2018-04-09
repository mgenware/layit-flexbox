import DomUtil from './domUtil';
import Option from '../option';
import { Defs, Context, Util } from 'layit';
import StyleBuilder from '../unit/styleBuilder';
import log from '../log';
import defs from '../defs';
import { AlignmentParser, HAlignment, VAlignment } from '../unit/align';

export default class BoxHandler {
  static handle(ctx: Context, option: Option): Element {
    const src = ctx.element;
    const dest = ctx.document.createElement('div');

    const marginAttr = DomUtil.getElementAttr(src, Defs.boxMargin);
    const vAlignAttr = AlignmentParser.vAlignment(DomUtil.getElementAttr(src, Defs.boxVAlign));
    const hAlignAttr = AlignmentParser.hAlignment(DomUtil.getElementAttr(src, Defs.boxHAlign));

    if (hAlignAttr === HAlignment.stretch && vAlignAttr === VAlignment.stretch) {
      // Stretched in both directions, no need any wrapper elements
      const sb = DomUtil.setFlexboxStyles(src, dest);
      // Margin attribute
      sb.style.margin = marginAttr;

      // Flush styles
      sb.flush();

      // Process children
      DomUtil.handleChildren(ctx, dest);
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
      DomUtil.handleChildren(ctx, innerWrapper);
    }

    if (option.logging) {
      log('handleBox', Util.outerXML(dest));
    }
    return dest;
  }
}
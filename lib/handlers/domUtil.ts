import StyleBuilder from '../unit/styleBuilder';
import { Context, Util } from 'layit';
import defs from '../defs';

const ELEMENT_NODE = 1;

export default class DomUtil {
  static setFlexboxStyles(src: Element|null, dest: Element): StyleBuilder {
    const sb = new StyleBuilder(src, dest);
    sb.style.display = defs.flex;
    sb.style.flex = defs.cssFlexFullSize;
    sb.flush();
    return sb;
  }

  static getElementAttr(element: Element, name: string): string {
    return element.getAttribute(name) || '';
  }

  static handleChildren(ctx: Context, dest: Element) {
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

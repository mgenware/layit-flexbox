import StyleBuilder from '../unit/styleBuilder';
import { Context } from 'layit';
import defs from '../defs';

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

  static copyChildren(src: Element, dest: Element) {
    for (let i = 0; i < src.childNodes.length; i++) {
      const node = src.childNodes[i];
      dest.appendChild(node);
    }
  }

  static handleChildren(ctx: Context, dest: Element) {
    if (!ctx.childElements.length) {
      this.copyChildren(ctx.element, dest);
      return;
    }

    for (const childSrc of ctx.childElements) {
      const childDest = ctx.handleDefault(childSrc) as Element;
      dest.appendChild(childDest);
    }
  }
}

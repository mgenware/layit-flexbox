import { Size } from './size';

export default class SizeParser {
  static parse(s: string): Size {
    if (!s) {
      throw new Error('Either not defined or empty string');
    }

    if (s === 'auto') {
      return Size.auto();
    }

    if (s.startsWith('*')) {
      let proportion: number;
      if (s.length === 1) {
        // A single "*" is equivalent to 1
        proportion = 1;
      } else {
        proportion = parseInt(s.substr(1), 10);
        if (!proportion) {
          throw new Error(`Invalid size proportion value: "${proportion}", either it's zero or an invalid number.`);
        }
      }
      return Size.proportional(proportion);
    }

    return Size.absolute(s);
  }
}

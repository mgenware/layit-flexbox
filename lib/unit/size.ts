export enum SizeType {
  auto = 1, proportional, absolute,
}

export class Size {
  static auto(): Size {
    return new Size(SizeType.auto);
  }

  static proportional(proportion: number): Size {
    const size = new Size(SizeType.proportional);
    size.proportion = proportion;
    return size;
  }

  static absolute(absoluteValue: string): Size {
    const size = new Size(SizeType.absolute);
    size.absoluteValue = absoluteValue;
    return size;
  }

  public proportion: number;
  public absoluteValue: string;

  private constructor(
    public type: SizeType,
  ) { }
}

export class SizeParser {
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

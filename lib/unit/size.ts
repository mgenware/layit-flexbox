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

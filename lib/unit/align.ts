export enum HAlignment {
  left = 'left',
  center = 'center',
  right = 'right',
  stretch = 'stretch',
}

export enum VAlignment {
  top = 'top',
  middle = 'middle',
  bottom = 'bottom',
  stretch = 'stretch',
}

export class AlignmentParser {
  static hAlignment(s: string): HAlignment|null {
    return HAlignment[s as any] as HAlignment;
  }

  static vAlignment(s: string): VAlignment|null {
    return VAlignment[s as any] as VAlignment;
  }
}

import { Defs } from 'layit';

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
  static hAlignment(s: string): HAlignment|undefined {
    if (!s) {
      return HAlignment.stretch;
    }
    const res = HAlignment[s as any] as HAlignment;
    if (!res) {
      throw new Error(`"${s}" is not a valid value of ${Defs.boxHAlign}`);
    }
    return res;
  }

  static vAlignment(s: string): VAlignment {
    if (!s) {
      return VAlignment.stretch;
    }
    const res = VAlignment[s as any] as VAlignment;
    // Allow 'center' to be 'middle'
    if (s === 'center') {
      return VAlignment.middle;
    }
    if (!res) {
      throw new Error(`"${s}" is not a valid value of ${Defs.boxVAlign}`);
    }
    return res;
  }
}

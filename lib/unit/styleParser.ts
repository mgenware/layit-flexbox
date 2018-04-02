const parse = require('style-parser');

export default class StyleParser {
  private map: { [key: string]: any } = {};

  constructor(style: string|null) {
    if (style) {
      this.map = parse(style) || {};
    }
  }

  setStyle(key: string, value: string) {
    this.map[key] = value;
  }

  toString(): string {
    let res = '';
    for (const key in this.map) {
      if (this.map.hasOwnProperty(key)) {
        res += key + ':' + this.map[key] + ';';
      }
    }
    return res;
  }

  set flex(value: string) {
    this.map.flex = value;
  }
  set display(value: string) {
    this.map.display = value;
  }
  set flexDirection(value: string) {
    this.map['flex-direction'] = value;
  }
}

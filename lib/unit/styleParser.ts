const parse = require('style-parser');

export default class StyleParser {
  private map: { [key: string]: any };

  constructor(style: string|null) {
    if (style) {
      this.map = parse(style) || {};
    } else {
      this.map = {};
    }
  }

  merge(style: string) {
    const styleMap = parse(style) || {};
    this.map = Object.assign(this.map, styleMap);
  }

  setStyle(key: string, value: string) {
    this.map[key] = value;
  }

  toString(): string {
    let res = '';
    const map = this.map;
    for (const key in map) {
      if (this.map.hasOwnProperty(key) && map[key]) {
        res += key + ':' + map[key] + ';';
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
  set padding(value: string) {
    this.map.padding = value;
  }
  set margin(value: string) {
    this.map.margin = value;
  }
  set justifyContent(value: string) {
    this.map['justify-content'] = value;
  }
}

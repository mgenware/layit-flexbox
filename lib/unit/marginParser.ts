import Margin from './margin';

// Syntax (https://developer.mozilla.org/en-US/docs/Web/CSS/margin)
  // /* Apply to all four sides */
  // margin: 1em;
  // margin: -3px;

  // /* vertical | horizontal */
  // margin: 5% auto;

  // /* top | horizontal | bottom */
  // margin: 1em auto 2em;

  // /* top | right | bottom | left */
  // margin: 2px 1em 0 auto;

export default class MarginParser {
  static parse(s: string): Margin {
    s = (s || '').trim();
    if (!s) {
      throw new Error('Input string is empty');
    }

    const strings = s.split(/\s+/g);
    if (strings.length > 4) {
      throw new Error('Only a maximum of 4 values are allowed');
    }

    const margin = new Margin();
    switch (strings.length) {
      case 0: {
        throw new Error('Input string is empty');
      }

      case 1: {
        /* Apply to all four sides */
        margin.left = margin.right = margin.top = margin.bottom = strings[0];
        break;
      }

      case 2: {
        /* vertical | horizontal */
        margin.top = margin.bottom = strings[0];
        margin.left = margin.right = strings[1];
        break;
      }

      case 3: {
        /* top | horizontal | bottom */
        margin.top = strings[0];
        margin.left = margin.right = strings[1];
        margin.bottom = strings[2];
        break;
      }

      case 4: {
        /* top | right | bottom | left */
        margin.top = strings[0];
        margin.right = strings[1];
        margin.bottom = strings[2];
        margin.left = strings[3];
        break;
      }
    } // ending of switch
    return margin;
  }
}

import { FlexBuilder, FlexBuilderOption} from '../lib/main';
import * as fs from 'fs';

test('test add', () => {
  const opt = new FlexBuilderOption();
  opt.logging = true;
  const src = fs.readFileSync(__dirname + '/data/a.xml', 'utf8');
  const builder = new FlexBuilder(opt);
  const element = FlexBuilder.documentFromXML(src);
  const expected = builder.build(element);
  expect(expected).toBe('<div style="display:flex;flex:1 1 0;flex-direction:column;"><div style="background-color:yellow;flex:0 1 auto;">Header: auto</div><div style="display:flex;flex:1 1 0;flex-direction:row;"><div style="background-color:red;flex:0 1 100px;">Left bar: 100px</div><div style="background-color:green;flex:2 1 0;">Content section: *2</div><div style="background-color:blue;flex:1 1 0;">Right bar: *</div></div><div style="background-color:gray;flex:0 1 200px;">Footer: 200px</div></div>');
});

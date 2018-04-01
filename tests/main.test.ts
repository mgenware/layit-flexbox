import { FlexBuilder, FlexBuilderOption} from '../lib/main';
import * as fs from 'fs';

test('test add', () => {
  const opt = new FlexBuilderOption();
  opt.logging = true;
  const src = fs.readFileSync(__dirname + '/data/a.xml', 'utf8');
  const builder = new FlexBuilder(opt);
  const element = FlexBuilder.elementFromXML(src);
  const expected = builder.build(element);
  expect(expected).toBe('<div></div>');
});

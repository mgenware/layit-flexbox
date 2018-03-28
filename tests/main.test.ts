import { FlexBuilder, FlexBuilderOption} from '../lib/main';

test('test add', () => {
  const opt = new FlexBuilderOption();
  opt.logging = true;
  const builder = new FlexBuilder(opt);
  const element = FlexBuilder.elementFromXML('<layit><h><h><div>Hello</div></h><v><h>World</h></v></h></layit>');

  expect(builder.build(element)).toBe('<div></div>');
});

import { FlexBuilder, FlexBuilderOption} from '../lib/main';

test('test add', () => {
  const opt = new FlexBuilderOption();
  opt.logging = true;
  const builder = new FlexBuilder(opt);
  const element = FlexBuilder.elementFromXML('<layit><h><h size="20px"><div size="*">Hello</div></h><v><h size="auto">World</h></v></h></layit>');

  expect(builder.build(element)).toBe('<div></div>');
});

import { FlexBuilder, FlexBuilderOption} from '../lib/main';

test('test add', () => {
  // <layit><h><h><View></View></h><v><h><View></View></h></v></h></layit>
  const opt = new FlexBuilderOption();
  opt.logging = true;
  const builder = new FlexBuilder(opt);
  const element = FlexBuilder.elementFromXML('<layit><h><View></View></h></layit>');

  expect(builder.build(element)).toBe('<div></div>');
});

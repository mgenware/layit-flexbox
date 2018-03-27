import FlexBuilder from '../lib/main';

test('test add', () => {
  // <layit><h><h><View></View></h><v><h><View></View></h></v></h></layit>
  const builder = new FlexBuilder();
  const element = FlexBuilder.elementFromXML('<layit><h><View></View></h></layit>');

  expect(builder.build(element)).toBe('<div></div>');
});

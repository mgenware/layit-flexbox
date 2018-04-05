import { FlexBuilder, FlexBuilderOption} from '../lib/main';
import * as fs from 'fs';

test('box mixed with styles', () => {
  const opt = new FlexBuilderOption();
  opt.logging = true;
  const src = fs.readFileSync(__dirname + '/data/box-mixed-with-styles.xml', 'utf8');
  const builder = new FlexBuilder(opt);
  const element = FlexBuilder.documentFromXML(src);
  const expected = builder.build(element);
  expect(expected).toBe('<div style="background-color:yellow;font-size:20px;display:flex;flex:1 1 0;"></div>');
});

test('box with margin', () => {
  const opt = new FlexBuilderOption();
  opt.logging = true;
  const src = fs.readFileSync(__dirname + '/data/box-with-margin.xml', 'utf8');
  const builder = new FlexBuilder(opt);
  const element = FlexBuilder.documentFromXML(src);
  const expected = builder.build(element);
  expect(expected).toBe('<div style="background-color:yellow;display:flex;flex:1 1 0;padding:10px 20px;"></div>');
});

test('box with margin', () => {
  const opt = new FlexBuilderOption();
  opt.logging = true;
  const src = fs.readFileSync(__dirname + '/data/box-with-margin.xml', 'utf8');
  const builder = new FlexBuilder(opt);
  const element = FlexBuilder.documentFromXML(src);
  const expected = builder.build(element);
  expect(expected).toBe('<div style="background-color:yellow;display:flex;flex:1 1 0;padding:10px 20px;"></div>');
});

test('box nested', () => {
  const opt = new FlexBuilderOption();
  opt.logging = true;
  const src = fs.readFileSync(__dirname + '/data/box-nested.xml', 'utf8');
  const builder = new FlexBuilder(opt);
  const element = FlexBuilder.documentFromXML(src);
  const expected = builder.build(element);
  expect(expected).toBe('<div style="background-color:yellow;display:flex;flex:1 1 0;margin:0;"><div style="background-color:green;display:flex;flex:1 1 0;margin:20px;"><div style="background-color:black;display:flex;flex:1 1 0;margin:10px 100px;"></div></div></div>');
});

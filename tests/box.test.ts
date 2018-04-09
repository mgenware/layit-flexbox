import { buildTestFile } from './base';

test('Styles', async () => {
  const result = await buildTestFile('box-styles.xml');
  expect(result).toBe('<div style="background-color:yellow;font-size:20px;display:flex;flex:1 1 0;"></div>');
});

test('Margin', async () => {
  const result = await buildTestFile('box-margin.xml');
  expect(result).toBe('<div style="display:flex;flex:1 1 0;"><div style="background-color:red;display:flex;flex:0 1 auto;margin:1px 2px 3px;"></div><div style="background-color:green;display:flex;flex:0 1 auto;margin:1px 2px 3px 4px;"></div><div style="background-color:yellow;display:flex;flex:0 1 auto;margin:10px 20px;"></div><div style="background-color:green;display:flex;flex:0 1 auto;margin:1px;"></div></div>');
});

test('Nested', async () => {
  const result = await buildTestFile('box-nested.xml');
  expect(result).toBe('<div style="background-color:yellow;display:flex;flex:1 1 0;margin:0;"><div style="background-color:green;display:flex;flex:1 1 0;margin:20px;"><div style="background-color:black;display:flex;flex:1 1 0;margin:10px 100px;"></div></div></div>');
});

test('Children', async () => {
  const result = await buildTestFile('box-children.xml');
  expect(result).toBe('<div style="display:flex;flex:1 1 0;"><div style="display:flex;flex:1 1 0;"> x y z   </div></div>');
});

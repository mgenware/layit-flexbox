import { buildTestFile } from './base';

test('box mixed with styles', async () => {
  const result = await buildTestFile('box-mixed-with-styles.xml');
  expect(result).toBe('<div style="background-color:yellow;font-size:20px;display:flex;flex:1 1 0;"></div>');
});

test('box with margin', async () => {
  const result = await buildTestFile('box-with-margin.xml');
  expect(result).toBe('<div style="background-color:yellow;display:flex;flex:1 1 0;padding:10px 20px;"></div>');
});

test('box with margin', async () => {
  const result = await buildTestFile('box-with-margin.xml');
  expect(result).toBe('<div style="background-color:yellow;display:flex;flex:1 1 0;padding:10px 20px;"></div>');
});

test('box nested', async () => {
  const result = await buildTestFile('box-nested.xml');
  expect(result).toBe('<div style="background-color:yellow;display:flex;flex:1 1 0;margin:0;"><div style="background-color:green;display:flex;flex:1 1 0;margin:20px;"><div style="background-color:black;display:flex;flex:1 1 0;margin:10px 100px;"></div></div></div>');
});

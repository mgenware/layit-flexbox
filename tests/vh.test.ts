import { buildTestFile } from './base';

test('Sizes', async () => {
  const result = await buildTestFile('vh-sizes.xml');
  expect(result).toBe('<div style="display:flex;flex:1 1 0;flex-direction:column;"><div style="display:flex;flex:1 1 0;"><div style="background-color:yellow;flex:1 1 0;">A</div><div style="background-color:green;display:flex;flex:0 1 100;">B</div><div style="background-color:red;display:flex;flex:1 1 0;">A</div></div><div style="background-color:yellow;display:flex;flex:0 1 auto;">Header: auto</div><div style="display:flex;flex:1 1 0;"><div style="background-color:red;display:flex;flex:0 1 100px;">Left bar: 100px</div><div style="background-color:green;display:flex;flex:2 1 0;">Content section: *2</div><div style="background-color:blue;display:flex;flex:1 1 0;">Right bar: *</div></div><div style="background-color:gray;display:flex;flex:0 1 200px;">Footer: 200px</div></div>');
});

test('Children', async () => {
  const result = await buildTestFile('vh-children.xml');
  expect(result).toBe('<div style="display:flex;flex:1 1 0;flex-direction:column;"><div style="display:flex;flex:1 1 0;"><div style="display:flex;flex:1 1 0;flex-direction:column;">  h i </div></div><div style="display:flex;flex:0 1 auto;flex-direction:column;"> i </div><div style="display:flex;flex:1 1 0;">abc</div></div>');
});

test('Styles', async () => {
  const result = await buildTestFile('vh-styles.xml');
  expect(result).toBe('<div style="display:flex;flex:1 1 0;flex-direction:column;"><div style="background-color:green;display:flex;flex:1 1 0;">A</div><div style="background-color:yellow;display:flex;flex:3 1 0;flex-direction:column;">B</div></div>');
});

import { buildTestFile } from './base';

test('v and h', async () => {
  const result = await buildTestFile('vh.xml');
  expect(result).toBe('<div style="display:flex;flex:1 1 0;flex-direction:column;"><div style="background-color:yellow;flex:0 1 auto;">Header: auto</div><div style="display:flex;flex:1 1 0;flex-direction:row;"><div style="background-color:red;flex:0 1 100px;">Left bar: 100px</div><div style="background-color:green;flex:2 1 0;">Content section: *2</div><div style="background-color:blue;flex:1 1 0;">Right bar: *</div></div><div style="background-color:gray;flex:0 1 200px;">Footer: 200px</div></div>');
});

test('vh with leaf text node', async () => {
  const result = await buildTestFile('vh-text.xml');
  expect(result).toBe('<div style="display:flex;flex:1 1 0;flex-direction:column;"><div style="display:flex;flex:1 1 0;flex-direction:row;"><div style="display:flex;flex:1 1 0;flex-direction:column;">  h i </div></div><div style="display:flex;flex:1 1 0;flex-direction:column;"> i </div></div>');
});

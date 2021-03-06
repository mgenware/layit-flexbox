import { buildTestFile } from './base';

test('Formatted', async () => {
  const result = await buildTestFile('formatted.xml', { minify: false });
  expect(result).toBe(`<div style="display:flex;flex:1 1 0;flex-direction:column;">
  <div style="background-color:yellow;display:flex;flex:0 1 auto;">
    Header: auto
  </div>
  <div style="display:flex;flex:1 1 0;">
    <div style="background-color:red;display:flex;flex:0 1 100px;">
      Left bar: 100px
    </div>
    <div style="background-color:green;display:flex;flex:2 1 0;">
      Content section: *2
    </div>
    <div style="background-color:blue;display:flex;flex:1 1 0;">
      Right bar: *
    </div>
  </div>
  <div style="background-color:gray;display:flex;flex:0 1 200px;">
    Footer: 200px
  </div>
</div>;
`);
});

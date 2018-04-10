import { buildTestFile } from './base';

test('Styles', async () => {
  const result = await buildTestFile('box-styles.xml');
  expect(result).toBe('<div style="background-color:yellow;font-size:20px;display:flex;flex:1 1 0;"></div>');
});

test('Margin', async () => {
  const result = await buildTestFile('box-margin.xml');
  expect(result).toBe('<div style="display:flex;flex:1 1 0;"><div style="background-color:red;display:flex;flex:1 1 0;margin:1px 2px 3px;"></div><div style="background-color:green;display:flex;flex:1 1 0;margin:1px 2px 3px 4px;"></div><div style="background-color:yellow;display:flex;flex:1 1 0;margin:10px 20px;"></div><div style="background-color:green;display:flex;flex:1 1 0;margin:1px;"></div></div>');
});

test('Nested', async () => {
  const result = await buildTestFile('box-nested.xml');
  expect(result).toBe('<div style="background-color:yellow;display:flex;flex:1 1 0;margin:0;"><div style="display:flex;flex:1 1 0;justify-content:flex-end;"><div style="background-color:green;display:flex;flex:0 0 auto;margin:20px;"><div style="display:flex;flex:1 1 0;"><div style="display:flex;flex:1 1 0;">A</div><div style="display:flex;flex:1 1 0;margin:10;">B</div><h2 style="flex:1 1 0;">hhh</h2><div style="display:flex;flex:1 1 0;justify-content:flex-start;align-items:flex-start;"><div style="display:flex;flex:0 0 auto;">C</div></div></div></div></div></div>');
});

test('Alignment', async () => {
  const result = await buildTestFile('box-alignment.xml');
  expect(result).toBe('<div style="display:flex;flex:1 1 0;flex-direction:column;"><div style="display:flex;flex:1 1 0;flex-direction:column;"><div style="background:green;display:flex;flex:1 1 0;">ABC</div><div style="display:flex;flex:1 1 0;justify-content:center;"><div style="background:green;display:flex;flex:0 0 auto;">ABC</div></div><div style="background:green;display:flex;flex:1 1 0;">ABC</div><div style="display:flex;flex:1 1 0;justify-content:flex-start;"><div style="background:green;display:flex;flex:0 0 auto;">ABC</div></div><div style="display:flex;flex:1 1 0;justify-content:flex-end;"><div style="background:green;display:flex;flex:0 0 auto;">ABC</div></div></div><div style="display:flex;flex:1 1 0;"><div style="background:green;display:flex;flex:1 1 0;">ABC</div><div style="display:flex;flex:1 1 0;align-items:center;"><div style="background:green;display:flex;flex:1 0 0;">ABC</div></div><div style="display:flex;flex:1 1 0;align-items:center;"><div style="background:green;display:flex;flex:1 0 0;">ABC</div></div><div style="display:flex;flex:1 1 0;align-items:flex-start;"><div style="background:green;display:flex;flex:1 0 0;">ABC</div></div><div style="display:flex;flex:1 1 0;align-items:flex-end;"><div style="background:green;display:flex;flex:1 0 0;">ABC</div></div><div style="background:green;display:flex;flex:1 1 0;">ABC</div></div></div>');
});

test('Alignment + Margin', async () => {
  const result = await buildTestFile('box-alignment-margin.xml');
  expect(result).toBe('<div style="display:flex;flex:1 1 0;flex-direction:column;"><div style="background:green;display:flex;flex:1 1 0;">ABC</div><div style="display:flex;flex:1 1 0;justify-content:center;align-items:flex-end;"><div style="background:green;display:flex;flex:0 0 auto;margin:30px;">ABC</div></div><div style="background:green;display:flex;flex:1 1 0;margin:30px;">ABC</div><div style="display:flex;flex:1 1 0;justify-content:flex-start;align-items:center;"><div style="background:green;display:flex;flex:0 0 auto;margin:30px;">ABC</div></div><div style="display:flex;flex:1 1 0;align-items:center;"><div style="background:green;display:flex;flex:1 0 0;margin:30px;">ABC</div></div></div>');
});

test('Width', async () => {
  const result = await buildTestFile('box-width.xml');
  expect(result).toBe('<div style="display:flex;flex:1 1 0;flex-direction:column;"><div style="display:flex;flex:1 1 0;justify-content:center;"><div style="background-color:red;display:flex;flex:0 0 auto;width:10px;">A</div></div><div style="display:flex;flex:1 1 0;align-items:flex-end;"><div style="background-color:green;display:flex;flex:1 0 0;height:10px;">A</div></div><div style="display:flex;flex:1 1 0;justify-content:flex-start;align-items:flex-end;"><div style="background-color:yellow;display:flex;flex:0 0 auto;width:10px;height:10px;">A</div></div><div style="display:flex;flex:1 1 0;justify-content:flex-start;align-items:flex-start;"><div style="background-color:green;display:flex;flex:0 0 auto;margin:20px;width:10px;height:10px;">A</div></div><div style="display:flex;flex:1 1 0;justify-content:center;align-items:center;"><div style="background-color:yellow;display:flex;flex:0 0 auto;width:10px;height:10px;">A</div></div><div style="display:flex;flex:1 1 0;justify-content:flex-end;align-items:flex-end;"><div style="background-color:yellow;display:flex;flex:0 0 auto;width:10px;height:10px;">A</div></div></div>');
});

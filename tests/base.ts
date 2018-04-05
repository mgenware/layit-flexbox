import IOption from '../lib/option';
import FlexBuilder from '../lib/flexBuilder';
import * as mfs from 'm-fs';

export async function buildTestFile(fileName: string, opt?: IOption): Promise<string> {
  const src = await mfs.readTextFileAsync(__dirname + `/data/${fileName}`);
  const builder = new FlexBuilder(opt);
  const element = FlexBuilder.documentFromXML(src);
  return builder.build(element);
}

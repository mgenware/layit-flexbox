const { FlexBuilder } = require('..');

const builder = new FlexBuilder();
const xml = `<layit><box h-align="right" style="background:green" margin="20px">ABC</box></layit>`;
console.log(builder.build(FlexBuilder.documentFromXML(xml)));

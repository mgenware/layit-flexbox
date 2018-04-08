const { FlexBuilder } = require('..');

const builder = new FlexBuilder();
const xml = `<layit><box h-align="stretch" style="background:green">ABC</box></layit>`;
console.log(builder.build(FlexBuilder.documentFromXML(xml)));

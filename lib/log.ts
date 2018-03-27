const util = require('util');

export default function log(msg: string, payload?: object) {
  // tslint:disable-next-line no-console
  console.log(`[${msg}]`, payload ? util.inspect(payload, { depth: null}) : undefined);
}

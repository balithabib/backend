//
// Super simple base64 encoding / decoding with node.js
//

export class Base64 {
  static encode(unencoded) {
    return new Buffer(unencoded).toString('base64');
  }

  static decode(encoded) {
    return new Buffer(encoded, 'base64').toString('utf8');
  }
}

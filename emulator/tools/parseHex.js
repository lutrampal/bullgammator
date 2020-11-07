const assert = require("./assert");

/**
 * Function that return the hex code without comments, return, tab, spaces
 * @param entry string with comments, hex code, spaces...
 * @param size the number of hex chunks expected, completes with 0
 * @returns hex code
 * @throws error in case of incorrect entry
 */
module.exports = function parse_hex_code(entry, size) {
  assert(size, "Number of expected hex chunks must be given.");
  hexCode = entry.replace(/--[^\n\r]*(\n\r?|$)/g, ''); // remove comments
  hexCode = hexCode.replace(/[\s\n\r\t]/g, ''); // remove white space and line breaks
  hexCode = hexCode.padEnd(size, "0");
  if (!/^[0-9a-fA-F]*$/.test(hexCode)){
    throw new Error("Invalid hex code.");
  }
  if (hexCode.length != size) {
    throw new Error("Hex entry too long. Expected length '" + size + "', got '" + hexCode.length + "'.");
  }
  return hexCode;
}

AMD = require("./AMD").AMD;
AN = require("./AN").AN;
BD = require("./BD").BD;
BO = require("./BO").BO;
CB = require("./CB").CB;
CD = require("./CD").CD;
CN = require("./CN").CN;
CO = require("./CO").CO;
CSz = require("./CSz").CSz;
DC = require("./DC").DC;
DR = require("./DR").DR;
ES = require("./ES").ES;
GG = require("./GG").GG;
IL = require("./IL").IL;
VCS = require("./VCS").VCS;
VRS = require("./VRS").VRS;
ZB = require("./ZB").ZB;
KB = require("./KB").KB;
OB = require("./OB").OB;
SN = require("./SN").SN;
MR = require("./MR").MR;
MC = require("./MC").MC;
SL = require("./SL").SL;
TB = require("./TB").TB;
BT = require("./BT").BT;

function _parse_four_hex_chunk_to_instr(instruction, bullGamma) {
  if (instruction.length !== 4) {
    throw Error("Invalid instruction length: got " + instruction.length + ", expected 4.");
  }
  let operands = instruction.toLowerCase().split('');

  let TO = parseInt(operands[0], 16);
  let AD = parseInt(operands[1], 16);
  let OD = parseInt(operands[2], 16);
  let OF = parseInt(operands[3], 16);

  switch (TO) {
    case 0:
      return new SL(AD, OD, OF, bullGamma)
    case 1:
    switch (AD) {
      case 0: case 1: case 2: case 3:
        return new VCS(AD, OD, OF, bullGamma);
      case 5: case 6: case 7:
        return new VRS(AD, OD, OF, bullGamma);
      case 8: case 9:
        return new ES(AD, OD, OF, bullGamma);
      case 10:
        return new CD(OD, OF, bullGamma);
      case 12:
        return new CO(OD, OF, bullGamma);
      case 13:
        return new CSz(OD, OF, bullGamma);
      case 15:
        return new CB(OD, OF, bullGamma);
      default:
        throw Error("Invalid instruction 1" + Instruction.getChar(AD) + "xx");
    }
    case 2:
      if (OF & 0x1) { // OF and 0001 to select last bit
        return new TB(AD, OD, OF, bullGamma)
      } else {
        return new BT(AD, OD, OF, bullGamma)
      }
    case 3:
      return new ZB(AD, OD, OF, bullGamma);
    case 4:
      return new KB(AD, OD, OF, bullGamma);
    case 5:
      if (AD !== 0) {
        throw Error("Invalid instruction 5" + Instruction.getChar(AD) + "xx");
      }
      return new GG(OD, OF, bullGamma);
    case 6:
      return new BO(AD, OD, OF, bullGamma);
    case 7:
      switch (AD) {
        case 0:
          return new AMD(OD, OF, bullGamma);
        case 2:
          return new BD(OD, OF, bullGamma);
        case 10:
        case 12:
          return new IL(AD, OD, OF, bullGamma);
        default:
          throw Error("Invalid instruction 7" + Instruction.getChar(AD) + "xx");
      }
    case 8:
      return new OB(AD, OD, OF, bullGamma);
    case 9:
      return new CN(AD, OD, OF, bullGamma);
    case 10:
      return new AN(AD, OD, OF, bullGamma);
    case 11:
      return new SN(AD, OD, OF, bullGamma);
    case 12:
      return new MR(AD, OD, OF, bullGamma);
    case 13:
      return new DR(AD, OD, OF, bullGamma);
    case 14:
      return new MC(AD, OD, OF, bullGamma);
    case 15:
      return new DC(AD, OD, OF, bullGamma);
    // default:
    //   throw Error("Fell in default case when it shouldn't have happened");
  }
}

/**
 * Function that return the hex code without comments, return, tab, spaces
 * @param entry string with comments, hex code, spaces...
 * @returns hex code
 * @throws error in case of incorrect entry
 */
function parse_hex_code(entry) {
  hexCode = entry.replace(/--[^\n\r]*(\n\r?|$)/g, ''); // remove comments
  hexCode = hexCode.replace(/[\s\n\r\t]/g, ''); // remove white space and line breaks
  if (!/^[0-9a-fA-F]*$/.test(hexCode)){
    throw Error("Invalid hex code");
  }
  return hexCode;
}

/**
 * Given hexadecimal code for Bull Gamma 3, returns a set of instructions for the machine.
 * @param entry the string representing the code to be parsed. code may include single line comments starting with --.
 * @param bullGamma the machine to which the returned instructions should be attached
 * @returns {Array} the array of parsed instructions
 */
function parse_hex_str_to_instructions(entry, bullGamma) {
  let hexCode = parse_hex_code(entry);
  let instructions = [];
  let i = 1;
  hexCode.match(/.{1,4}/g).forEach(function (four_hex_chunk) { // break the string into chunks of 4 chars
    try {
      instructions.push(_parse_four_hex_chunk_to_instr(four_hex_chunk, bullGamma));
      i++;
    } catch (error) {
      throw Error("Parsing error at instruction #" + i + ": " + error.message);
    }
  });
  return instructions;
}

/**
 * Parser generating instruction for the given bullGamma
 */
class InstructionsParser {
  constructor(bullGamma) {
    this.bullGamma = bullGamma;
  }

  /**
   * Function that return the hex code without comments, return, tab, spaces
   * @param entry string with comments, hex code, spaces...
   * @returns hex code
   * @throws error in case of incorrect entry
   */
  static parseHex(entry) {
    return parse_hex_code(entry);
  }

  /**
   * function that returns a list of instructions from the given code
   * @param entry code with comments, spaces, returns allowed
   */
  parseInstructions(entry) {
    return parse_hex_str_to_instructions(entry, this.bullGamma);
  }

  /**
   * function that returns the instruction corresponding to the params
   * @param TO string or number
   * @param AD string or number
   * @param OD string or number
   * @param OF string or number
   */
  parseInstruction(TO, AD, OD, OF) {
    TO = TO.toString(16);
    AD = AD.toString(16);
    OD = OD.toString(16);
    OF = OF.toString(16);
    return _parse_four_hex_chunk_to_instr(TO + AD + OD + OF, this.bullGamma);
  }
}

module.exports.InstructionsParser = InstructionsParser;

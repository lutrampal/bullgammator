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
EL = require("./EL").EL;
Vn = require("./Vn").Vn;
Vac = require("./Vac").Vac;
TB = require("./TB").TB;
BT = require("./BT").BT;

InvalidInstructionError = require("./instruction").InvalidInstructionError;

function parseInstruction(TO, AD, OD, OF, bullGamma) {
  switch (TO) {
    case 0:
      if (OF%4 < 2) {
        switch (AD) {
          case 0: case 1: case 2: case 3: case 4:
            return new SL(AD, OD, OF, bullGamma);
          case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15:
            return new EL(AD, OD, OF, bullGamma);
          default:
            throw new InvalidInstructionError("0" + Instruction.getChar(AD) + "x" + Instruction.getChar(OF));
        }
      } else {
        switch (AD) {
          case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            return new Vn(AD, OD, OF, bullGamma);
          case 9: case 10: case 11: case 12: case 13: case 14: case 15:
            return new Vac(AD, OD, OF, bullGamma);
          default:
            throw new InvalidInstructionError("0" + Instruction.getChar(AD) + "x" + Instruction.getChar(OF));
        }
      }
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
        throw new InvalidInstructionError("1" + Instruction.getChar(AD) + "xx");
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
        throw new InvalidInstructionError("5" + Instruction.getChar(AD) + "xx");
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
          throw new InvalidInstructionError("7" + Instruction.getChar(AD) + "xx");
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
    //   throw new Error("Fell in default case when it shouldn't have happened");
  }
}

/**
 * Function that return the hex code without comments, return, tab, spaces
 * @param entry string with comments, hex code, spaces...
 * @param size the number of hex chunks expected, completes with 0
 * @returns hex code
 * @throws error in case of incorrect entry
 */
function parse_hex_code(entry, size) {
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

/**
 * Given hexadecimal code for Bull Gamma 3, returns a set of instructions for the machine.
 * @param entry the string representing the code to be parsed. code may include single line comments starting with --.
 * @param size the number of expected instruction, completes with NOP
 * @param bullGamma the machine to which the returned instructions should be attached
 * @returns {Array} the array of parsed instructions
 */
function parse_hex_str_to_instructions(entry, size, bullGamma) {
  assert(size, "Number of expected instructions must be given.");
  let hexCode = parse_hex_code(entry, size * 4);
  let instructions = [];
  let i = 1;
  hexCode.match(/.{4}/g).forEach(function (four_hex_chunk) { // break the string into chunks of 4 chars
    try {
      instructions.push(parseInstruction(
        parseInt(four_hex_chunk[0], 16),
        parseInt(four_hex_chunk[1], 16),
        parseInt(four_hex_chunk[2], 16),
        parseInt(four_hex_chunk[3], 16),
        bullGamma
      ));
      i++;
    } catch (error) {
      throw new Error("Parsing error at instruction #" + i + ": " + error.message);
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
   * @param size the number of hex chunks expected, completes with 0
   * @returns hex code
   * @throws error in case of incorrect entry
   */
  static parseHex(entry, size) {
    return parse_hex_code(entry, size);
  }

  /**
   * function that returns a list of instructions from the given code
   * @param entry code with comments, spaces, returns allowed
   * @param size the number of expected instruction, completes with NOP
   */
  parseInstructions(entry, size) {
    return parse_hex_str_to_instructions(entry, size, this.bullGamma);
  }

  /**
   * function that returns the instruction corresponding to the params
   * @param TO string or number
   * @param AD string or number
   * @param OD string or number
   * @param OF string or number
   */
  parseInstruction(TO, AD, OD, OF) {
    TO = parseInt(TO.toString(16), 16);
    AD = parseInt(AD.toString(16), 16);
    OD = parseInt(OD.toString(16), 16);
    OF = parseInt(OF.toString(16), 16);
    return parseInstruction(TO, AD, OD, OF, this.bullGamma);
  }
}

module.exports.InstructionsParser = InstructionsParser;

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
V = require("./V").V;
TB = require("./TB").TB;
BT = require("./BT").BT;

function _parse_four_hex_chunk_to_instr(instruction, bullGamma) {
  if (instruction.length !== 4) {
    throw "incorrect instruction length: got " + instruction.length + ", expected 4.";
  }
  let operands = instruction.toLowerCase().split('');

  operands.forEach(function (operand) {
    if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'].includes(operand)) {
      throw "not a hex digit: " + operand + ".";
    }
  });
  let TO = parseInt(operands[0], 16);
  let AD = parseInt(operands[1], 16);
  let OD = parseInt(operands[2], 16);
  let OF = parseInt(operands[3], 16);

  switch (TO) {
    case 0:
      return new V(AD, OD, OF, bullGamma)
    case 1:
      switch (AD) {
        case 0:
          return new VCS(AD, OD, OF, bullGamma);
        case 1:
          return new VCS(AD, OD, OF, bullGamma);
        case 2:
          return new VCS(AD, OD, OF, bullGamma);
        case 3:
          return new VCS(AD, OD, OF, bullGamma);
        case 5:
          return new VRS(AD, OD, OF, bullGamma);
        case 6:
          return new VRS(AD, OD, OF, bullGamma);
        case 7:
          return new VRS(AD, OD, OF, bullGamma);
        case 8:
        case 9:
          throw "not supported yet: ES";
        case 10:
          return new CD(AD, OD, OF, bullGamma);
        case 12:
          return new CO(OF, bullGamma);
        case 13:
          return new CSz(OD, OF, bullGamma);
        case 15:
          return new CB(OD, OF, bullGamma);
        default:
          throw "incorrect instruction for TO = 1: got AD = " + AD;
      }
    case 2:
      if (OF & 0x1) { // OF and 0001 to select last bit
        return new TB(AD, OD, OF, bullGamma)
      } else {
        return new BT(AD, OD, OF, bullGamma)
      }
    case 3:
      if (AD === 0) {
        throw "incorrect instruction for TO = 3: got AD = 0";
      }
      return new ZB(AD, OD, OF, bullGamma);
    case 4:
      return new KB(AD, OD, OF, bullGamma);
    case 5:
      if (AD !== 0) {
        throw "incorrect instruction for TO = 5: got AD = " + AD;
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
          throw "incorrect instruction for TO = 7: got AD = " + AD;
      }
    case 8:
      if (AD === 0) {
        throw "incorrect instruction for TO = 8: got AD = 0";
      }
      return new OB(AD, OD, OF, bullGamma);
    case 9:
      return new CN(AD, OD, OF, bullGamma);
    case 10:
      return new AN(AD, OD, OF, bullGamma);
    case 11:
      return new SN(AD, OD, OF, bullGamma);
    case 12:
      if (AD === 1) {
        throw "incorrect instruction for TO = 12: got AD = 1";
      }
      return new MR(AD, OD, OF, bullGamma);
    case 13:
      if (AD === 1) {
        throw "incorrect instruction for TO = 13: got AD = 1";
      }
      return new DR(AD, OD, OF, bullGamma);
    case 14:
      if (AD === 1 || AD === 2) {
        throw "incorrect instruction for TO = 14: got AD = " + AD;
      }
      return new MC(AD, OD, OF, bullGamma);
    case 15:
      if (AD === 1 || AD === 2) {
        throw "incorrect instruction for TO = 15: got AD = " + AD;
      }
      return new DC(AD, OD, OF, bullGamma);
    default:
      throw "fell in default case when it shouldn't have happened";
  }
}

/**
 * Given hexadecimal code for Bull Gamma 3, returns a set of instructions for the machine.
 * @param hexCode the string representing the code to be parsed. code may include single line comments starting with --.
 * @param bullGamma the machine to which the returned instructions should be attached
 * @returns {Array} the array of parsed instructions
 */
function parse_hex_str_to_instructions(hexCode, bullGamma) {
  let instructions = [];
  hexCode = hexCode.replace(/--[^\n\r]*(\n\r?|$)/g, ''); // remove comments
  hexCode = hexCode.replace(/[\s\n\r\t]/g, ''); // remove white space and line breaks
  let i = 1;
  hexCode.match(/.{1,4}/g).forEach(function (four_hex_chunk) { // break the string into chunks of 4 chars
    try {
      instructions.push(_parse_four_hex_chunk_to_instr(four_hex_chunk, bullGamma));
      i++;
    } catch (error) {
      throw "parsing error at instruction #" + i + ": " + error;
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
   * function that returns a list of instructions from the given code
   * @param hexCode code with comments, spaces, returns allowed
   */
  parseInstructions(hexCode) {
    return parse_hex_str_to_instructions(hexCode, this.bullGamma);
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

const assert = require('../../tools/assert');

const NB_INST_SERIES_3 = require("../constants").NB_INST_SERIES_3;
const NB_HEX_VALUES_PER_INST = require("../constants").NB_HEX_VALUES_PER_INST;
const NB_HEX_VALUES = 16;

/**
 * A connection table was used to define the code in series 3 using voltages and wires
 */
class ConnectionsTable {

  /**
   * Constructs a new instance of ConnectionsTable
   * @param bullGamma the machine to which this drum is attached
   */
  constructor(bullGamma) {
    assert(bullGamma, "bullGamma must not be null or undefined");
    this.bullGamma = bullGamma;
    this.instructions = new Array(NB_INST_SERIES_3);
    this.reset();
  }

  reset() {
    for (let instIndex = 0; instIndex < NB_INST_SERIES_3; ++instIndex) {
      this.instructions[instIndex] = new Array(NB_HEX_VALUES_PER_INST);
      for (var hexIndex = 0; hexIndex < NB_HEX_VALUES_PER_INST; hexIndex++) {
        this.instructions[instIndex][hexIndex] = 0;
      }
    }
  }

  /**
   * Set the Series3's content with hex values
   * @param hexCode a String that represents the new hex values of the array
   */
  setInstructions(hexCode) {
    this.reset();
    let instructions = this.bullGamma.parser.parseInstructions(hexCode);
    if (instructions.length > NB_INST_SERIES_3) {
      throw Error("Instructions number should not be greater than " + NB_INST_SERIES_3);
    }
    for (let instIndex = 0; instIndex < instructions.length; ++instIndex) {
      this.instructions[instIndex] = new Array(NB_HEX_VALUES_PER_INST);
      // NB: .toString() is prefered to .TO/.AD/.OD/.OF so that A100 does not become A10C
      var hex = instructions[instIndex].toString();
      this.instructions[instIndex][3] = parseInt(hex[0], 16);
      this.instructions[instIndex][2] = parseInt(hex[1], 16);
      this.instructions[instIndex][1] = parseInt(hex[2], 16);
      this.instructions[instIndex][0] = parseInt(hex[3], 16);
    }
  }

  /**
   * Sets a value for the given instruction digit
   * @param instIndex The instruction index in the Series3
   * @param hexIndex The index of the hex digit in the instruction (0: OF, 1: OD, 2: AD, 3: TO)
   * @param hexValue The value of the hex digit in base 10 (from 0 to 15)
   */
  setHexValue(instIndex, hexIndex, hexValue) {
    assert(instIndex >= 0, "Instruction index must be >= 0");
    assert(hexIndex >= 0, "Hex digit index must be >= 0");
    assert(hexValue >= 0, "Hex digit must be >= 0");
    assert(instIndex < NB_INST_SERIES_3, "Instruction index " + instIndex + " does not exist (<" + NB_INST_SERIES_3 + ")");
    assert(hexIndex < NB_HEX_VALUES_PER_INST, "Hex digit index " + hexIndex + " does not exist (0: OF, 1: OD, 2: AD, 3: TO)");
    assert(hexValue < NB_HEX_VALUES, "Hex value must be strictly lower that " + NB_HEX_VALUES);
    this.instructions[instIndex][hexIndex] = hexValue;
  }

  /**
   * Returns the instructions digits that by value and ordered by instruction index and hex digit index.
   * The parameters give the instructions to be considered
   * @param startIndex The index of the first instruction
   * @param stopIndex The index of the last instruction (excluded)
   * @param step The step to skip some indices
   */
  _getConnections(startIndex, stopIndex, step) {
    assert(startIndex >= 0, "Incorrect index");
    assert(stopIndex <= NB_INST_SERIES_3, "Incorrect index")
    var connections = new Array(NB_HEX_VALUES);
    for (var hexValue = 0; hexValue < NB_HEX_VALUES; hexValue++) {
      connections[hexValue] = new Array();
    }
    for (var instIndex = startIndex; instIndex < stopIndex; instIndex+=step) {
      for (var hexIndex = 0; hexIndex < NB_HEX_VALUES_PER_INST; hexIndex++) {
        var hexValue = this.instructions[instIndex][hexIndex];
        connections[hexValue].push([instIndex, hexIndex]);
      }
    }
    return connections;
  }

  /**
   * Returns the instructions digits that by value and ordered by instruction index and hex digit index.
   * The instructions considered are only the ones on the top left of the table
   * @returns An array of arrays
   */
  getConnectionsTopLeft() {
    return this._getConnections(0, 16, 1)
  }

  /**
   * Returns the instructions digits that by value and ordered by instruction index and hex digit index.
   * The instructions considered are only the ones on the bottom left of the table
   * @returns An array of arrays
   */
  getConnectionsBottomLeft() {
    return this._getConnections(16, 32, 1)
  }

  /**
   * Returns the instructions digits that by value and ordered by instruction index and hex digit index.
   * The instructions considered are only the ones on the top right of the table
   * @returns An array of arrays
   */
  getConnectionsTopRight() {
    return this._getConnections(32, 48, 1)
  }

  /**
   * Returns the instructions digits that by value and ordered by instruction index and hex digit index.
   * The instructions considered are only the ones on the bottom right of the table
   * @returns An array of arrays
   */
  getConnectionsBottomRight() {
    return this._getConnections(48, 64, 1)
  }

  getInstructionCode(instIndex) {
    return new Instruction(
      this.instructions[instIndex][3],
      this.instructions[instIndex][2],
      this.instructions[instIndex][1],
      this.instructions[instIndex][0],
      this.bullGamma
    ).toString();
  }

  getHexCode() {
    var code = "-- Code généré par le tableau de connexions\n";
    for (var instIndex = 0; instIndex < NB_INST_SERIES_3; instIndex++) {
      code += this.getInstructionCode(instIndex) + "\n";
      // for (var hexIndex = 0; hexIndex < NB_HEX_VALUES_PER_INST; hexIndex++) {
      //   hexValue = this.instructions[instIndex][hexIndex];
      //   code += Number(hexValue).toString(16).toUpperCase();
      // }
      // code += "\n";
    }
    return code;
  }

  toString() {
    return this.getHexCode();
  }

  loadInstructions() {
    this.bullGamma.getSerie(3).setInstructions(this.getHexCode());
  }
}

module.exports.ConnectionsTable = ConnectionsTable;

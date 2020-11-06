Console = require("../machine/connectedMachines/console").Console;

class Execution {

  constructor(bullGamma) {
    this.bullGamma = bullGamma;
    this.console = new Console();
    this.bullGamma.connectMachine(this.console);
  }

  /**
   * Executes the next instruction in the program
   */
  executeNextInstruction() {
    this.bullGamma.executeNextInstruction();
  }

  /**
   * Executes instructions until the given line in the given series is reached
   * Don't execute the instruction at the given line
   * @param line the line number the instruction ot stop before
   * @param seriesId the series id of the instruction
   */
  executeUntil(line, seriesId) {
    // test if the series and the instruction exists
    this.bullGamma.getSerie(seriesId).getInstruction(line);

    do {
      this.executeNextInstruction();
    } while (this.getCurrentLine() != line || this.getCurrentSeries() != seriesId);
  }

  /**
   * Returns the current instruction line in the current series
   * @returns the line number
   */
  getCurrentLine() {
    return this.bullGamma.nl;
  }

  /**
   * Returns the current series where the instructions read from
   * @returns the series id
   */
  getCurrentSeries() {
    return this.bullGamma.ns;
  }

  /**
   * Returns the list of instructions of the given series
   * @param seriesId the id of the series
   * @returns Instruction[]
   */
  getInstructions(seriesId) {
    return this.bullGamma.getSerie(seriesId).getInstructions();
  }

  /**
   * Returns the number of instructions of the given series
   * @param seriesId the id of the series
   * @returns the number of instructions
   */
  getNumberOfInstructions(seriesId) {
    return this.bullGamma.getSerie(seriesId).maxNbInst;
  }

  /**
   * Writes a line in the execution console
   * @param line the string to be written
   */
  writeConsoleLine(line) {
    this.console.push(line);
  }
}

module.exports.Execution = Execution;

ConnectedMachine = require('./connectedMachine').ConnectedMachine;
NB_MEMORIES_PER_HALF_OCTAD = require('../constants').NB_MEMORIES_PER_HALF_OCTAD;

/**
 * NB: This connected machine is not an actual device af the Bull Gamma
 * It is used for debug purposes only
 */
class Console extends ConnectedMachine {

  constructor() {
    super();
    this.lines = [];
  }

  /**
   * Function triggered by an instruction of the Bull Gamma
   */
  on48V() {
    let i = NB_MEMORIES_PER_HALF_OCTAD;
    for (let ex of this.bullGamma.getExtractors()) {
      this.lines.push(
        "Sortie "+ (i - NB_MEMORIES_PER_HALF_OCTAD) + ": " + ex.toString()
      );
      i++;
    }
  }

  convertToFloat(value) {
    let exponent = (parseInt(value.charAt(0), 16) & 0x7) * (2**5)
      + parseInt(value.charAt(1), 16) * 2
      + (parseInt(value.charAt(2), 16) >> 3);
    exponent -= 7 * 16 + 15;

    let sign = ((parseInt(value.charAt(0), 16) & 0x8) >> 3) ? -1: 1

    let mantissa = (parseInt(value.charAt(2), 16) & 0x7) / 4;
    for (let i = 3; i < value.length; i++) {
      mantissa += parseInt(value.charAt(i), 16) / (4 * (16**(i-2)));
    }

    return sign * (mantissa * (2**exponent))
  }

  convertToInt(value) {
    let sign = ((parseInt(value.charAt(0), 16) & 0x8) >> 3) ? -1: 1

    let mantissa = (parseInt(value.charAt(2), 16) & 0x7) * (16**11);
    for (let i = 1, j = value.length - 2; i < value.length; i++, j--) {
      mantissa += parseInt(value.charAt(i), 16) * (16**j);
    }

    return sign * mantissa;
  }

  /**
   * Function triggered by the instruction ES1
   */
  onStaticExtraction1(OD, OF) {
    let extractors = this.bullGamma.getExtractors();
    // first extractor is used for error
    // other for standard outputs
    let nb_errors = 1;

    switch (OD) {
      case 0:
        // display outputs
        if (OF < extractors.length - nb_errors) {
          this.lines.push(
            "Sortie "+ OF + " : " + extractors[OF + nb_errors].toString()
          );
        }
        break;
      case 1:
        // display errors
        if (OF < nb_errors) {
          this.lines.push(
            "Erreur: " + extractors[OF].toString()
          );
        }
        break;
      case 2:
        // display outputs
        if (OF < extractors.length - nb_errors) {
          this.lines.push(
            "Sortie "+ OF + " : " + this.convertToFloat(extractors[OF + nb_errors].toString())
          );
        }
        break;
      case 3:
        // display outputs
        if (OF < extractors.length - nb_errors) {
          this.lines.push(
            "Sortie "+ OF + " : " + this.convertToInt(extractors[OF + nb_errors].toString())
          );
        }
        break;
      default:
        break;
    }
  }

  /**
   * Function triggered by the instruction ES1
   */
  onStaticExtraction2(OD, OF) {
    // nothing yet
  }

  /**
   * Returns the list of lines printed to the console
   * @returns String[]
   */
  getLines() {
    return this.lines;
  }

  /**
   * Adds a line to the console
   * @param line string to be added
   */
  push(line) {
    this.lines.push(line);
  }

}

module.exports.Console = Console;

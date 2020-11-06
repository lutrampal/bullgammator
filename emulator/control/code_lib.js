var index = require("./code_samples.json");


class CodeLibrary {
  constructor() {

  }

  /**
   * Returns the list of the programs names
   * @returns string[]
   */
   getProgramsNames() {
     return Object.getOwnPropertyNames(index);
   }

  /**
   * Returns a part of a program
   * @param name the name of the program
   * @param attribute the desired part of the program (series3, drum, mB, ...)
   * @returns string
   */
  getProgram(name, attribute) {
    if (index[name] && index[name][attribute]) {
      return index[name][attribute].replace(/--%n%/g, "\n").replace(/--%t%/g, "\t");
    }
    return ""
  }

  /**
   *
   */
  getDisplayName(name) {
    name = name.replace(/_/g, " ")
    return name.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}

module.exports.CodeLibrary = CodeLibrary;

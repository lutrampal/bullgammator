Serie = require("./serie").Serie;

const NB_INST_IOSERIES = require("./constants").NB_INST_IOSERIES;

class IOSerie extends Serie {
  constructor(id) {
    super();
    this._id = id;
    this.nbInst = NB_INST_IOSERIES;
  }
}

module.exports.IOSerie = IOSerie;

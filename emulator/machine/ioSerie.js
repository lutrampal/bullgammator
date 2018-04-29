Serie = require("./serie").Serie;

const NB_INST_IOSERIES = 64;

class IOSerie extends Serie {
  constructor(id) {
    super();
    this._id = id;
    this.nbInst = NB_INST_IOSERIES;
  }
}

module.exports.IOSerie = IOSerie;
module.exports.NB_INST_IOSERIES = NB_INST_IOSERIES;

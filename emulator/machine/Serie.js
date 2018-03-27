Octad = require("./Octad").Octad;

const NB_OCTADS = 2;

class Serie {
  constructor(id) {
    this._id = id;
    this._octads = new Array(2);
    for (let i = 0; i < NB_OCTADS; ++i) {
      this._octads[i] = new Octad(2*this._id + i);
    }
  }

  getOctad(idx) {
    return this._octads[idx];
  }
}

module.exports.Serie = Serie;
module.exports.NB_OCTADS = NB_OCTADS;
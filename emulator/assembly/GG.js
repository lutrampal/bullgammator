Instruction = require("./instruction").Instruction
NB_OCTADS_PER_GROUP = require("../machine/constants").NB_OCTADS_PER_GROUP
NB_MEMORIES_PER_OCTAD = require("../machine/constants").NB_MEMORIES_PER_OCTAD


class GG extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(5, 0, OD, OF, bullGamma)
  }

	execute() {
		if (this.OD >= 8 && this.OF < 4) {
			this.bullGamma.getGroup(this.OF).setContent("");
			return;
		}
		if (this.OD > 3 || this.OF > 3) {
			throw "invalid parameter for GG: OD = " + this.OD + " and OF = " + this.OF;
		}
		let gsrc = this.bullGamma.getGroup(this.OD);
		let gdest = this.bullGamma.getGroup(this.OF);
		for (let i=0; i<NB_OCTADS_PER_GROUP*NB_MEMORIES_PER_OCTAD; i++) {
			gdest.getWord(i).copy(gsrc.getWord(i));
		}
	}

	getDescription() {
		if (this.OD >= 8 && this.OF < 4) {
			return "GG - Groupe - Groupe\n"
			+ "Met à 0 les octades " + (this.OF << 1) + " et " + ((this.OF << 1) | 0x1);
		}
		if (this.OD > 3 || this.OF > 3) {
			return "Instruction invalide";
		}
		return "GG - Groupe - Groupe\n"
		+ "Copie le contenu des octades " + ((this.OD & 0x7) << 1) + " et " + (((this.OD & 0x7) << 1) | 0x1)
		+ " dans les octades " + ((this.OF & 0x7) << 1) + " et " + (((this.OF & 0x7) << 1) | 0x1);
	}
}

module.exports.GG = GG;

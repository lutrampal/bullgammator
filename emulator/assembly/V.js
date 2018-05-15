Instruction = require("./instruction").Instruction

class V extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(0, AD, OD, OF, bullGamma)
  }

  execute() {
    let jump_cond_matrix = [[
			false,
			this.bullGamma.mc.isGreater(),
			this.bullGamma.mc.isEqual(),
			this.bullGamma.mc.isGreaterOrEqual(),
      this.bullGamma.ms1 === 10
		], [
			true,
			this.bullGamma.mc.isLowerOrEqual(),
			this.bullGamma.mc.isNotEqual(),
			this.bullGamma.mc.isLower(),
      this.bullGamma.ms1 === 0
		]]
    if (jump_cond_matrix[this.OF % 4][this.AD] === undefined) {
      throw "jump condition not implemented yet";
    }
    if (jump_cond_matrix[this.OF%4][this.AD]) {
      this.bullGamma.nl = (this.OD << 2) + (this.OF >> 2);
    }
  }

	getDescription() {
		if (this.AD < 5 && this.OF % 4 < 2) {
			let intro = "V - Variante\n"
			+ "Saute à ligne " + ((this.OD << 2) + (this.OF >> 2))
			+ " de la série courante";

			if (this.AD == 0 ) {
				if (this.OF % 4 == 0) {
					return "V - Variante\nNe fait rien"
				} else {
					return intro;
				}
			} else if (this.AD == 4) {
				if (this.OF % 4 == 0) {
					return intro + " si la mémoire de signe est négative";
				} else {
					return intro + " si la mémoire de signe est positive";
				}
			} else {
				let jump_cond_matrix = [
					["'supérieur'", "'égal'", "'supérieur ou égal'"],
					["'inférieur ou égal'", "'différent'", "'inférieur'"],
				]
				return intro + " si la mémoire de décalage contient le resultat "
				+ jump_cond_matrix[this.OF % 4][this.AD - 1];
			}
		}
		return "Instruction invalide ou non implémentée";
	}
}

module.exports.V = V;

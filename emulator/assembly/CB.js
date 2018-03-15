import {Instruction} from "./instruction"

export class CB extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(1, 15, OD, OF, bullGamma)
  }
}
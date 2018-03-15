import {Instruction} from "./instruction"

export class AMD extends Instruction {
  constructor(OD, OF, bullGamma) {
    super(7, 0, OD, OF, bullGamma)
  }
}
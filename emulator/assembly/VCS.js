import {Instruction} from "./instruction"

export class VCS extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(1, AD, OD, OF, bullGamma)
  }
}
import {Instruction} from "./instruction"

export class MR extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(12, AD, OD, OF, bullGamma)
  }
}
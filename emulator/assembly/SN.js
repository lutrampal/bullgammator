import {Instruction} from "./instruction"

export class SN extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(11, AD, OD, OF, bullGamma)
  }
}
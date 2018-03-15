import {Instruction} from "./instruction"

export class OB extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(8, AD, OD, OF, bullGamma)
  }
}
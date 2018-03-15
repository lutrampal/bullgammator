import {Instruction} from "./instruction"

export class IL extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(7, AD, OD, OF, bullGamma)
  }
}
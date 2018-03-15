import {Instruction} from "./instruction"

export class DC extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(15, AD, OD, OF, bullGamma)
  }
}
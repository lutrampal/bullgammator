import {Instruction} from "./instruction"

export class ZB extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(3, AD, OD, OF, bullGamma)
  }
}
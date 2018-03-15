import {Instruction} from "./instruction"

export class MC extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(14, AD, OD, OF, bullGamma)
  }
}
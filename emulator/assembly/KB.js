import {Instruction} from "./instruction"

export class KB extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(4, AD, OD, OF, bullGamma)
  }
}
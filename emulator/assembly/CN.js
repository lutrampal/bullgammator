import {Instruction} from "./instruction"

export class CN extends Instruction {
  constructor(AD, OD, OF, bullGamma) {
    super(9, AD, OD, OF, bullGamma)
  }
}
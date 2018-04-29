import { Injectable } from '@angular/core';

import { BullGamma } from 'bullgammator';
import { InstructionsParser} from 'bullgammator';

@Injectable()
export class BullgammatorService {

  bullgamma: BullGamma;
  parser: InstructionsParser;

  //TODO: remove this
  instructions: any[] = [];

  constructor() {
    this.bullgamma = new BullGamma();
    this.parser = new InstructionsParser(this.bullgamma);
  }

  parse_hex(code: string) {
    return this.parser.parseInstructions(code);
  }

}

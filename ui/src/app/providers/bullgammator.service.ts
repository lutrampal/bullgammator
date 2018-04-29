import { Injectable } from '@angular/core';

import * as bullgammator from 'bullgammator';

@Injectable()
export class BullgammatorService {

  bullgamma: bullgammator.bullGamma.BullGamma;
  parser: bullgammator.InstructionsParser;

  //TODO: remove this
  instructions: any[] = [];

  constructor() {
    this.bullgamma = new bullgammator.bullGamma.BullGamma();
    this.parser = new bullgammator.InstructionsParser(this.bullgamma);
  }

  parse_hex(code: string) {
    return this.parser.parseInstructions(code);
  }

}

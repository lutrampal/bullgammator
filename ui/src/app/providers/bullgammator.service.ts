import { Injectable } from '@angular/core';

import * as bullgammator from 'bullgammator';

@Injectable()
export class BullgammatorService {

  bullgamma: any;

  //TODO: remove this
  instructions: any[] = [];

  constructor() {
    this.bullgamma = new bullgammator.bullGamma.BullGamma();
  }

  parse_hex(code: string) {
    return bullgammator.parse_hex_str_to_instructions(code, this.bullgamma);
  }

}

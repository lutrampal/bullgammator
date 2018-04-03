import { Injectable } from '@angular/core';

import * as bullgammator from 'bullgammator';

@Injectable()
export class BullgammatorService {

  bullgamma: any;

  constructor() {
    this.bullgamma = null;
  }

  parse_hex_str_to_instructions(code: string) {
    return bullgammator.parse_hex_str_to_instructions(code, null);
  }

}

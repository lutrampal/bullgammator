import { Injectable } from '@angular/core';

import { BullGamma } from 'bullgammator';
import { constants } from 'bullgammator';

@Injectable()
export class BullgammatorService {

  bullgamma: BullGamma;
  constants: any = {};

  constructor() {
    this.bullgamma = new BullGamma();
    this.constants = constants;
  }

}

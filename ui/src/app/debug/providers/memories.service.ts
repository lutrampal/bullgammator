import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BullgammatorService } from '../../providers/bullgammator.service';

@Injectable()
export class MemoriesService {

  constructor(
    private bull: BullgammatorService
  ) { }

  hex(val: number): string {
    return val.toString(16).toUpperCase();
  }
  reverseHex(letter: string): number {
    return parseInt(letter, 16);
  }

  getMemory(id: number, octad: number) {
    octad = octad || 0;
    let mem;
    if (id < 8) {
      mem = this.bull.bullgamma.getMemory(id);
    } else {
      mem = this.bull.bullgamma.getOctad(octad).getMemory(id - 8);
    }
    let value = "";
    mem.blocks.forEach((val) => {
      value = this.hex(val) + value;
    });
    return value;
  }
  setMemory(value: string, id: number, octad: number) {
    octad = octad || 0;
    let mem;
    if (id < 8) {
      mem = this.bull.bullgamma.getMemory(id);
    } else {
      mem = this.bull.bullgamma.getOctad(octad).getMemory(id - 8);
    }
    for (var i = 0; i < 12; i++) {
      mem.blocks[11 - i] = this.reverseHex(value.charAt(i));
    }
  }

  getMode() {
    if (this.bull.bullgamma._memoryMode == this.bull.constants.MEMORY_MODE.BINARY) {
      return "Binaire";
    }
    if (this.bull.bullgamma._memoryMode == this.bull.constants.MEMORY_MODE.DECIMAL) {
      return "Décimal";
    }
  }
  setMode(value: string) {
    if (value == "Binaire") {
      this.bull.bullgamma._memoryMode = this.bull.constants.MEMORY_MODE.BINARY;
    }
    if (value == "Décimal") {
      this.bull.bullgamma._memoryMode = this.bull.constants.MEMORY_MODE.DECIMAL;
    }
  }
  modeValidator(control: FormControl) {
    if (control.value == "Binaire") {
      return null;
    }
    if (control.value == "Décimal") {
      return null;
    }
    return { error : true };
  }

  getNL() {
    return this.hex(this.bull.bullgamma.cp);
  }
  setNL(value: string) {
    this.bull.bullgamma.cp = this.reverseHex(value);
  }
  nlValidator(control: FormControl) {
    if (!control.value.match(/^[0-9A-F][0-9A-F]$/)) {
      return { error : true };
    }
    return null;
  }

  getMS1() {
    return this.hex(this.bull.bullgamma.ms1);
  }
  setMS1(value: string) {
    this.bull.bullgamma.ms1 = this.reverseHex(value);
  }
  ms1Validator(control: FormControl) {
    if (!control.value.match(/^[0-9A-F]$/)){
      return { error: true };
    }
    return null;
  }

  getMD() {
    return this.hex(this.bull.bullgamma.md);
  }
  setMD(value: string) {
    this.bull.bullgamma.md = this.reverseHex(value);
  }
  mdValidator(control: FormControl) {
    if (!control.value.match(/^[0-9A-F]$/)){
      return { error: true };
    }
    return null;
  }

  getMCMP() {
    let mc = this.bull.bullgamma.mc;
    let value = "";
    if (mc.equal) {
      return "=";
    } else {
      if (mc.greater) {
        return ">";
      } else {
        return "<";
      }
    }
  }
  setMCMP(value: string) {
    let mc = this.bull.bullgamma.mc;
    if (value == "=") {
      mc.equal = true;
    } else {
      mc.equal = false;
      if (value == ">") {
        mc.greater = true;
      } else {
        mc.greater = false;
      }
    }
  }
  mcmpValidator(control: FormControl) {
    if (!control.value.match(/^(=|<|>)$/)) {
      return { error : true };
    }
    return null;
  }

  getRNL1() {
    return this.hex(this.bull.bullgamma.rnl1);
  }
  setRNL1(value: string) {
    this.bull.bullgamma.rnl1 = this.reverseHex(value);
  }

  getRNL2() {
    return this.hex(this.bull.bullgamma.rnl2);
  }
  setRNL2(value: string) {
    this.bull.bullgamma.rnl2 = this.reverseHex(value);
  }

  banalMemoryValidator(control: FormControl) {
    if (!control.value.match(/^[0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F]$/)) {
      return { error: true };
    }
    return null;
  }

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

}

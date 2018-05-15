import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BullgammatorService } from '../../providers/bullgammator.service';
import { Debug } from 'bullgammator';

@Injectable()
export class MemoriesService {

  debug: Debug;
  constants: any;

  constructor(
    private bull: BullgammatorService
  ) {
    this.debug = new Debug(this.bull.bullgamma);
    this.constants = this.bull.constants;
  }

  getMemory(id: number, octad: number) {
    return this.debug.getMemory(id, octad);
  }
  setMemory(value: string, id: number, octad: number) {
    this.debug.setMemory(value, id, octad);
  }

  banalMemoryValidator(control: FormControl) {
    if (!Debug.banalMemoryValidate(control.value)) {
      return { error: true };
    }
    return null;
  }

  getMode() {
    return this.debug.getMode();
  }
  setMode(value: string) {
    this.debug.setMode(value);
  }
  modeValidator(control: FormControl) {
    if (!Debug.modeValidate(control.value)) {
      return { error: true };
    }
    return null;
  }

  getNL() {
    return this.debug.getNL();
  }
  setNL(value: string) {
    this.debug.setNL(value);
  }
  nlValidator(control: FormControl) {
    if (!Debug.nlValidate(control.value)) {
      return { error: true };
    }
    return null;
  }

  getMS1() {
    return this.debug.getMS1();
  }
  setMS1(value: string) {
    this.debug.setMS1(value);
  }
  ms1Validator(control: FormControl) {
    if (!Debug.ms1Validate(control.value)) {
      return { error: true };
    }
    return null;
  }

  getMD() {
    return this.debug.getMD();
  }
  setMD(value: string) {
    this.debug.setMD(value);
  }
  mdValidator(control: FormControl) {
    if (!Debug.mdValidate(control.value)) {
      return { error: true };
    }
    return null;
  }

  getMCMP() {
    return this.debug.getMCMP();
  }
  setMCMP(value: string) {
    this.debug.setMCMP(value);
  }
  mcmpValidator(control: FormControl) {
    if (!Debug.mcmpValidate(control.value)) {
      return { error: true };
    }
    return null;
  }

  getRNL1() {
    return this.debug.getRNL1();
  }
  setRNL1(value: string) {
    this.debug.setRNL1(value);
  }

  getRNL2() {
    return this.debug.getRNL2();
  }
  setRNL2(value: string) {
    this.debug.setRNL2(value);
  }

  getOctad() {
    return this.debug.getOctad();
  }
  setOctad(value: string) {
    this.debug.setOctad(value);
  }
	octadValidator(control: FormControl) {
    if (!Debug.octadValidate(control.value)) {
      return { error: true };
    }
    return null;
	}

  getTrackGr() {
    return this.debug.getTrackGr();
  }
  setTrackGr(value: string) {
    this.debug.setTrackGr(value);
  }
	trackGrValidator(control: FormControl) {
    if (!Debug.trackGrValidate(control.value)) {
      return { error: true };
    }
    return null;
	}

}

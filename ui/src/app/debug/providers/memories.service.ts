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

  getMemory(id: number, octad: number): string {
    return this.debug.getMemory(id, octad);
  }
  setMemory(value: string, id: number, octad: number): void {
    this.debug.setMemory(value, id, octad);
  }

  banalMemoryValidator(control: FormControl): object {
    if (!Debug.banalMemoryValidate(control.value)) {
      return { error: true };
    }
    return null;
  }

  getMode(): string {
    return this.debug.getMode();
  }
  setMode(value: string): void {
    this.debug.setMode(value);
  }
  modeValidator(control: FormControl): object {
    if (!Debug.modeValidate(control.value)) {
      return { error: true };
    }
    return null;
  }

  getNL(): string {
    return this.debug.getNL();
  }
  setNL(value: string): void {
    this.debug.setNL(value);
  }
  nlValidator(control: FormControl): object {
    if (!Debug.nlValidate(control.value)) {
      return { error: true };
    }
    return null;
  }

  getMS1(): string {
    return this.debug.getMS1();
  }
  setMS1(value: string): void {
    this.debug.setMS1(value);
  }
  ms1Validator(control: FormControl): object {
    if (!Debug.ms1Validate(control.value)) {
      return { error: true };
    }
    return null;
  }

  getMD(): string {
    return this.debug.getMD();
  }
  setMD(value: string): void {
    this.debug.setMD(value);
  }
  mdValidator(control: FormControl): object {
    if (!Debug.mdValidate(control.value)) {
      return { error: true };
    }
    return null;
  }

  getMCMP(): string {
    return this.debug.getMCMP();
  }
  setMCMP(value: string): void {
    this.debug.setMCMP(value);
  }
  mcmpValidator(control: FormControl): object {
    if (!Debug.mcmpValidate(control.value)) {
      return { error: true };
    }
    return null;
  }

  getRNL1(): string {
    return this.debug.getRNL1();
  }
  setRNL1(value: string): void {
    this.debug.setRNL1(value);
  }

  getRNL2(): string {
    return this.debug.getRNL2();
  }
  setRNL2(value: string): void {
    this.debug.setRNL2(value);
  }

  getOctad(): string {
    return this.debug.getOctad();
  }
  setOctad(value: string): void {
    this.debug.setOctad(value);
  }
  octadValidator(control: FormControl): object {
    if (!Debug.octadValidate(control.value)) {
      return { error: true };
    }
    return null;
  }

  getTrackGr(): string {
    return this.debug.getTrackGr();
  }
  setTrackGr(value: string): void {
    this.debug.setTrackGr(value);
  }
  trackGrValidator(control: FormControl): object {
    if (!Debug.trackGrValidate(control.value)) {
      return { error: true };
    }
    return null;
  }

}

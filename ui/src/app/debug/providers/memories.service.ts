import { Injectable } from '@angular/core';

@Injectable()
export class MemoriesService {

  constructor() { }

  getMemory(id: number, octad: number) {
    octad = octad || 0;
    return 12;
  }
  setMemory(value: string, id: number, octad: number) {
    octad = octad || 0;
    console.log(value);
  }

  getNL() {
    return 12;
  }
  setNL(value: string) {
    console.log(value);
  }

  getMS1() {
    return 12;
  }
  setMS1(value: string) {
    console.log(value);
  }

  getMSB() {
    return 12;
  }
  setMSB(value: string) {
    console.log(value);
  }

  getMCMP() {
    return 12;
  }
  setMCMP(value: string) {
    console.log(value);
  }

  getRNL1() {
    return 12;
  }
  setRNL1(value: string) {
    console.log(value);
  }

  getRNL2() {
    return 12;
  }
  setRNL2(value: string) {
    console.log(value);
  }

}

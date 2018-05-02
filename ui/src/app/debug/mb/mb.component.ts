import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MemoriesService } from '../providers/memories.service';

export class BanalMemory {
  id: number;
  label: string;
}

@Component({
  selector: 'app-mb',
  templateUrl: './mb.component.html',
  styleUrls: ['./mb.component.css']
})
export class MbComponent implements OnInit {

  controls: { [id: number]: FormControl } = {};
  memories: BanalMemory[] = [];
  edit: boolean;

  m0Ctrl: FormControl;
  modeCtrl: FormControl;
  mcmpCtrl: FormControl;
  ms1Ctrl: FormControl;
  mdCtrl: FormControl;
  rnl1Ctrl: FormControl;
  rnl2Ctrl: FormControl;
  nlCtrl: FormControl;

  constructor(
    public m: MemoriesService
  ) {
    for (let mb of [ 2, 3, 4, 5, 6, 7 ]) {
      this.memories.push({ id: mb, label: 'M' + mb.toString() });
    }
    this.edit = false;
  }

  ngOnInit() {
    for (let mb of this.memories) {
      this.controls[mb.id] = new FormControl('', [this.m.banalMemoryValidator]);
    }
    this.m0Ctrl = new FormControl('', [this.m.banalMemoryValidator]);
    this.modeCtrl = new FormControl('', [this.m.modeValidator]);
    this.mcmpCtrl = new FormControl('', [this.m.mcmpValidator]);
    this.ms1Ctrl = new FormControl('', [this.m.ms1Validator]);
    this.mdCtrl = new FormControl('', [this.m.mdValidator]);
    this.rnl1Ctrl = new FormControl('', [this.m.nlValidator]);
    this.rnl2Ctrl = new FormControl('', [this.m.nlValidator]);
    this.nlCtrl = new FormControl('', [this.m.nlValidator]);
  }

  getMemory(id: number, octad: number) {
    return this.m.pad(this.m.getMemory(id, octad), 12, null);
  }
  setBanalMemories() {
    for (let mb of this.memories) {
      this.m.setMemory(this.controls[mb.id].value, mb.id, 0);
    }
  }

  setMemories() {
    this.setBanalMemories();
    this.m.setMemory(this.m0Ctrl.value, 1, 0);
    this.m.setMode(this.modeCtrl.value);
    this.m.setNL(this.nlCtrl.value);
    this.m.setMS1(this.ms1Ctrl.value);
    this.m.setMD(this.mdCtrl.value);
    this.m.setMCMP(this.mcmpCtrl.value);
    this.m.setRNL1(this.rnl1Ctrl.value);
    this.m.setRNL2(this.rnl2Ctrl.value);
  }

  getM0() {
    return this.m.pad(this.m.getMemory(1, 0), 12, null);
  }

  getMode() {
    return this.m.getMode();
  }

  getNL() {
    return this.m.pad(this.m.getNL(), 2, null);
  }

  getMS1() {
    return this.m.getMS1();
  }

  getMD() {
    return this.m.getMD();
  }

  getMCMP() {
    return this.m.getMCMP();
  }

  getRNL1() {
    return this.m.pad(this.m.getRNL1(), 2, null);
  }

  getRNL2() {
    return this.m.pad(this.m.getRNL2(), 2, null);
  }

  valid() {
    for (let mb of this.memories) {
      if (this.controls[mb.id].invalid) {
        return false;
      }
    }
    if (this.m0Ctrl.invalid || this.modeCtrl.invalid ||
      this.mcmpCtrl.invalid || this.ms1Ctrl.invalid || this.mdCtrl.invalid ||
      this.nlCtrl.invalid || this.rnl1Ctrl.invalid || this.rnl2Ctrl.invalid
    ) {
      return false;
    }
    return true;
  }

  editMemories() {
    this.edit = true;
    for (let mb of this.memories) {
      this.controls[mb.id].setValue(this.getMemory(mb.id, 0));
    }
    this.m0Ctrl.setValue(this.getM0());
    this.modeCtrl.setValue(this.getMode());
    this.mcmpCtrl.setValue(this.getMCMP());
    this.ms1Ctrl.setValue(this.getMS1());
    this.mdCtrl.setValue(this.getMD());
    this.rnl1Ctrl.setValue(this.getRNL1());
    this.rnl2Ctrl.setValue(this.getRNL2());
    this.nlCtrl.setValue(this.getNL());
  }

}

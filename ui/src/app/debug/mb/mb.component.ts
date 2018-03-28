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
  mcmpCtrl: FormControl;
  ms1Ctrl: FormControl;
  msbCtrl: FormControl;
  rnl1Ctrl: FormControl;
  rnl2Ctrl: FormControl;
  nlCtrl: FormControl;

  constructor(
    public m: MemoriesService
  ) {
    for (let mb of [ 2, 3, 4, 5, 6, 7 ]) {
      this.memories.push({ id: mb, label: mb.toString() });
    }
  }

  ngOnInit() {
    for (let mb of this.memories) {
      this.controls[mb.id] = new FormControl(this.pad(0, 12, null), [this.banalMemoryValidator]);
    }
    this.m0Ctrl = new FormControl(this.pad(0, 12, null), [this.banalMemoryValidator]);
    this.mcmpCtrl = new FormControl(0, []);
    this.ms1Ctrl = new FormControl(0, []);
    this.msbCtrl = new FormControl(0, []);
    this.rnl1Ctrl = new FormControl(0, []);
    this.rnl2Ctrl = new FormControl(0, []);
    this.nlCtrl = new FormControl(0, []);
  }

  getMemory(id: number, octad: number) {
    let value = this.pad(this.m.getMemory(id, octad), 12, null);
    this.controls[id].setValue(value);
    return value;
  }
  setBanalMemories() {
    for (let mb of this.memories) {
      this.m.setMemory(this.controls[mb.id].value, mb.id, 0);
    }
  }

  setMemories() {
    this.setBanalMemories();
    this.m.setMemory(this.m0Ctrl.value, 0, 0);
    this.m.setNL(this.nlCtrl.value);
    this.m.setMS1(this.ms1Ctrl.value);
    this.m.setMSB(this.msbCtrl.value);
    this.m.setMCMP(this.mcmpCtrl.value);
    this.m.setRNL1(this.rnl1Ctrl.value);
    this.m.setRNL2(this.rnl2Ctrl.value);
  }

  getM0() {
    let value = this.pad(this.m.getMemory(0, 0), 12, null);
    this.m0Ctrl.setValue(value);
    return value;
  }

  getNL() {
    return this.m.getNL();
  }

  getMS1() {
    return this.m.getMS1();
  }

  getMSB() {
    return this.m.getMSB();
  }

  getMCMP() {
    return this.m.getMCMP();
  }

  getRNL1() {
    return this.m.getRNL1();
  }

  getRNL2() {
    return this.m.getRNL2();
  }

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  banalMemoryValidator(control: FormControl) {
    if (!control.value.match(/^[0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F]$/)) {
      return { error: true };
    }
    return null;
  }

  valid() {
    for (let mb of this.memories) {
      if (this.controls[mb.id].invalid) {
        return false;
      }
    }
    return true;
  }

}

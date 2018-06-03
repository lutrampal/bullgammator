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

	nlCtrl: FormControl;
  m0Ctrl: FormControl;
  mcmpCtrl: FormControl;
  ms1Ctrl: FormControl;
  mdCtrl: FormControl;
  rnl1Ctrl: FormControl;
  rnl2Ctrl: FormControl;
  octadCtrl: FormControl;
  trackGrCtrl: FormControl;
	modeCtrl: FormControl;

  constructor(
    public m: MemoriesService
  ) {
    for (var mb=2; mb<this.m.constants.NB_BANAL_MEMORIES; mb++) {
      this.memories.push({ id: mb, label: 'M' + mb.toString() });
    }
    this.edit = false;
  }

  ngOnInit() {
    for (let mb of this.memories) {
      this.controls[mb.id] = new FormControl('', [this.m.banalMemoryValidator]);
    }
		this.nlCtrl = new FormControl('', [this.m.nlValidator]);
    this.m0Ctrl = new FormControl('', [this.m.banalMemoryValidator]);
    this.mcmpCtrl = new FormControl('', [this.m.mcmpValidator]);
    this.ms1Ctrl = new FormControl('', [this.m.ms1Validator]);
    this.mdCtrl = new FormControl('', [this.m.mdValidator]);
    this.rnl1Ctrl = new FormControl('', [this.m.nlValidator]);
    this.rnl2Ctrl = new FormControl('', [this.m.nlValidator]);
    this.octadCtrl = new FormControl('', [this.m.octadValidator]);
    this.trackGrCtrl = new FormControl('', [this.m.trackGrValidator]);
		this.modeCtrl = new FormControl('', [this.m.modeValidator]);
  }

  getMemory(id: number, octad: number) {
    return this.m.getMemory(id, octad);
  }
  setBanalMemories() {
    for (let mb of this.memories) {
      this.m.setMemory(this.controls[mb.id].value, mb.id, 0);
    }
  }

  setMemories() {
    this.setBanalMemories();
    this.m.setMemory(this.m0Ctrl.value, 1, 0);
    this.m.setNL(this.nlCtrl.value);
    this.m.setMS1(this.ms1Ctrl.value);
    this.m.setMD(this.mdCtrl.value);
    this.m.setMCMP(this.mcmpCtrl.value);
    this.m.setRNL1(this.rnl1Ctrl.value);
    this.m.setRNL2(this.rnl2Ctrl.value);
    this.m.setOctad(this.octadCtrl.value);
    this.m.setTrackGr(this.trackGrCtrl.value);
		this.m.setMode(this.modeCtrl.value);
  }

	reset() {
    for (let mb of this.memories) {
      this.m.setMemory("000000000000", mb.id, 0);
    }
    this.m.setMemory("000000000000", 1, 0);
    this.m.setNL("C0");
    this.m.setMS1("0");
    this.m.setMD("0");
    this.m.setMCMP("<");
    this.m.setRNL1("00");
    this.m.setRNL2("00");
    this.m.setOctad("0");
    this.m.setTrackGr("0");
		this.m.setMode("Décimal");
	}

  getM0() {
    return this.m.getMemory(1, 0);
  }

  getMode() {
    return this.m.getMode();
  }

  getNL() {
    return this.m.getNL();
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
    return this.m.getRNL1();
  }

  getRNL2() {
    return this.m.getRNL2();
  }

  getOctad() {
    return this.m.getOctad();
  }

  getTrackGr() {
    return this.m.getTrackGr();
  }

  valid() {
    for (let mb of this.memories) {
      if (this.controls[mb.id].invalid) {
        return false;
      }
    }
    if (this.m0Ctrl.invalid || this.modeCtrl.invalid ||
      this.mcmpCtrl.invalid || this.ms1Ctrl.invalid || this.mdCtrl.invalid ||
      this.nlCtrl.invalid || this.rnl1Ctrl.invalid || this.rnl2Ctrl.invalid ||
			this.octadCtrl.invalid || this.trackGrCtrl.invalid
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
		this.nlCtrl.setValue(this.getNL());
    this.m0Ctrl.setValue(this.getM0());
    this.mcmpCtrl.setValue(this.getMCMP());
    this.ms1Ctrl.setValue(this.getMS1());
    this.mdCtrl.setValue(this.getMD());
    this.rnl1Ctrl.setValue(this.getRNL1());
    this.rnl2Ctrl.setValue(this.getRNL2());
    this.octadCtrl.setValue(this.getOctad());
    this.trackGrCtrl.setValue(this.getTrackGr());
		this.modeCtrl.setValue(this.getMode());
  }

	getDescription() {
		return "Le panneau “Contrôle” présente le contenu des mémoires internes à la machine. Il est possible de les " +
      "éditer et des les réinitialiser manuellement. Ce qui n’aurait bien entendu pas été faisable sur le véritable " +
      "calculateur."
	}

}

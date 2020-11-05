import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MemoriesService } from '../providers/memories.service';

export class MemoryInfo {
	id: number;
	label: string;
}

@Component({
  selector: 'app-octads',
  templateUrl: './octads.component.html',
  styleUrls: ['./octads.component.css']
})
export class OctadsComponent implements OnInit {

  octad: number;
  octads: { [id: number]: MemoryInfo[] } = {};
  nbOctads: number;

  controls: { [id: number]: FormControl } = {};
  edit: boolean;

  constructor(
    public m: MemoriesService
  ) {
    this.octad = 0;
    this.octads = {};
    this.nbOctads = this.m.constants.NB_COMMUTED_OCTADS;

    for (var octad=0; octad<this.nbOctads; octad++) {
      this.octads[octad] = [];
      for (
        var mb = this.m.constants.NB_BANAL_MEMORIES;
        mb<this.m.constants.NB_BANAL_MEMORIES+this.m.constants.NB_MEMORIES_PER_OCTAD;
        mb++
      ) {
        this.octads[octad].push({ id: mb, label: 'M' + mb.toString() });
      }
    }
    this.edit = false;
  }

  ngOnInit(): void {
    for (var octad=0; octad<this.nbOctads; octad++) {
      for (let mb of this.octads[octad]) {
        let id = octad * this.nbOctads + mb.id;
        this.controls[id] = new FormControl('', [this.m.banalMemoryValidator]);
      }
    }
  }

  editMemories(): void {
    this.edit = true;
    for (var octad=0; octad<this.nbOctads; octad++) {
      for (let mb of this.octads[octad]) {
        let id = octad * this.nbOctads + mb.id;
        this.controls[id].setValue(this.getMemory(mb.id, octad));
      }
    }
  }

  setMemories(): void {
    for (var octad=0; octad<this.nbOctads; octad++) {
      for (let mb of this.octads[octad]) {
        let id = octad * this.nbOctads + mb.id;
        this.m.setMemory(this.controls[id].value, mb.id, octad);
      }
    }
  }

	reset(): void {
    for (var octad=0; octad<this.nbOctads; octad++) {
      for (let mb of this.octads[octad]) {
        let id = octad * this.nbOctads + mb.id;
        this.m.setMemory("000000000000", mb.id, octad);
      }
    }
	}

  valid(): boolean {
    for (var octad=0; octad<this.nbOctads; octad++) {
      for (let mb of this.octads[octad]) {
        let id = octad * this.nbOctads + mb.id;
        if (this.controls[id].invalid) {
          return false;
        }
      }
    }
    return true;
  }

  getOctad(): MemoryInfo[] {
    return this.octads[this.octad] || [];
  }

  getMemory(id: number, octad: number): string {
    return this.m.getMemory(id, octad);
  }

  plus(): void {
    this.octad = (this.octad + 1) % this.nbOctads;
  }

  minus(): void {
    this.octad = (this.octad + 7) % this.nbOctads;
  }

	getDescription(): string {
		return "La panneau “Octade” montre le contenu des octades ajoutées par l’extension tambour."
	}
}

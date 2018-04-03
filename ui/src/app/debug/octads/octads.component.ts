import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MemoriesService } from '../providers/memories.service';

@Component({
  selector: 'app-octads',
  templateUrl: './octads.component.html',
  styleUrls: ['./octads.component.css']
})
export class OctadsComponent implements OnInit {

  octad: number;
  octads: { [id: number]: any } = {};
  octadsIds: number[] = [ 0, 1, 2, 3, 4, 5, 6, 7 ];

  controls: { [id: number]: FormControl } = {};
  edit: boolean;

  constructor(
    public m: MemoriesService
  ) {
    this.octad = 0;
    this.octads = {};

    for (let octad of [0, 1, 2, 3, 4, 5, 6, 7]) {
      this.octads[octad] = [];
      for (let mb of [ 8, 9, 10, 11, 12, 13, 14, 15 ]) {
        this.octads[octad].push({ id: mb, label: 'M' + mb.toString() });
      }
    }
    this.edit = false;
  }

  ngOnInit() {
    for (let octad of this.octadsIds) {
      for (let mb of this.octads[octad]) {
        this.controls[octad * this.octadsIds.length + mb.id] = new FormControl('', [this.m.banalMemoryValidator]);
      }
    }
  }

  editMemories() {
    this.edit = true;
    for (let octad of this.octadsIds) {
      for (let mb of this.octads[octad]) {
        this.controls[octad * this.octadsIds.length + mb.id].setValue(this.getMemory(mb.id, octad));
      }
    }
  }

  setMemories() {
    for (let octad of this.octadsIds) {
      for (let mb of this.octads[octad]) {
        this.m.setMemory(this.controls[octad * this.octadsIds.length + mb.id].value, mb.id, octad);
      }
    }
  }

  valid() {
    for (let octad of this.octadsIds) {
      for (let mb of this.octads[octad]) {
        if (this.controls[octad * this.octadsIds.length + mb.id].invalid) {
          return false;
        }
      }
    }
    return true;
  }

  getOctad() {
    return this.octads[this.octad] || [];
  }

  getMemory(id: number, octad: number) {
    return this.m.pad(this.m.getMemory(id, octad), 12, null);
  }

  plus() {
    this.octad = (this.octad + 1) % this.octadsIds.length;
  }

  minus() {
    this.octad = (this.octad + 7) % this.octadsIds.length;
  }
}

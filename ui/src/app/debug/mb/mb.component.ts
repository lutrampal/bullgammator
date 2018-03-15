import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export class BanalMemory {
  id: number;
  value: number;
}

@Component({
  selector: 'app-mb',
  templateUrl: './mb.component.html',
  styleUrls: ['./mb.component.css']
})
export class MbComponent implements OnInit {

  controls: { [id: number]: FormControl } = {};

  constructor() { }

  ngOnInit() {
    for (let mb of this.getBanalMemories()) {
      this.controls[mb.id] = new FormControl(this.pad(mb.value, 12, null), [this.banalMemoryValidator]);
    }
  }

  getBanalMemories(): BanalMemory[] {
    return [
      { id: 2, value: 12345 },
      { id: 3, value: 12345 },
      { id: 4, value: 1345645 },
      { id: 5, value: 12345 },
      { id: 6, value: 12345 },
      { id: 7, value: 12345 }
    ]
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

}

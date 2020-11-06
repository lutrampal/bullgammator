import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit {

  breakpoints: FormControl[];
  update: boolean;

  @Output()
  inst_emit = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  openInstruction(inst: string): void {
    this.inst_emit.emit(inst);
  }

}

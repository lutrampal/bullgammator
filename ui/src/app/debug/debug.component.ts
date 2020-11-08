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
  instEmit = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  openInstruction(inst: string): void {
    this.instEmit.emit(inst);
  }

}

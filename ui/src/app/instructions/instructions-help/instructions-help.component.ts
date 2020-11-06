import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Subject, Observable } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

import { BullgammatorService } from '../../providers/bullgammator.service'
import { Instruction } from 'bullgammator';

const HEX_VALUES = Array.from(Array(16).keys());

@Component({
  selector: 'app-instructions-help',
  templateUrl: './instructions-help.component.html',
  styleUrls: ['./instructions-help.component.css']
})
export class InstructionsHelpComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();

  public instructions: Instruction[][];
  public control: FormControl;
  public operationType: number = 10;
  public selectedAddr: number = 0;
  public instructionError: {[TO: number]: {[AD: number]: boolean}};

  @Input()
  set inst(inst: string) {
    if (inst && inst.length == 4) {
      inst = inst.toUpperCase();
      this.operationType = parseInt(inst[0], 16);
      this.selectedAddr = parseInt(inst[1], 16);
      this.control.setValue(inst[2] + inst[3]);
    }
  }

  constructor(
    private bull: BullgammatorService
  ) { }

  ngOnInit(): void {
    this.instructions = this.getInstructions(0, 0);
    this.control = new FormControl(null, [Validators.pattern('[0-9A-F]{2}'), Validators.required, Validators.minLength(2)]);
    this.control.valueChanges.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(value => {
      if (this.control.valid) {
        this.instructions = this.getInstructions(parseInt(value[0], 16), parseInt(value[1], 16));
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getInstructionAddress(inst): string {
    // return inst.toLineString();
    return inst.TO.toString(16).toUpperCase() + inst.AD.toString(16).toUpperCase();
  }

  getDescription(inst): string {
    return inst.getShortType() + " - " + inst.getLongType() + " -- " + inst.getDescription();
  }

  getInstructions(OD, OF): Instruction[][] {
    let instructions = []
    this.instructionError = {};

    for (let TO of HEX_VALUES) {
      instructions.push([]);
      this.instructionError[TO] = {};
      for (let AD of HEX_VALUES) {
        this.instructionError[TO][AD] = false;
        try {
          let inst = this.bull.bullgamma.parser.parseInstruction(TO, AD, OD, OF);
          instructions[TO].push(inst);
        } catch (error) {
          try {
            this.instructionError[TO][AD] = true;
            let inst = this.bull.bullgamma.parser.parseInstruction(TO, AD, 0, 0);
            instructions[TO].push(inst);
          } catch (error) {
            // do nothing
          }
        }
      }
    }
    return instructions;
  }

}

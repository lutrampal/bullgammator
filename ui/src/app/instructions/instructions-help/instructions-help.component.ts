import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Subject, Observable } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

import { BullgammatorService } from '../../providers/bullgammator.service';
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
  public operationType = 10;
  public selectedAddr = 0;
  public selectedOF = 0;
  public instructionError: {[TO: number]: {[AD: number]: boolean}};

  @Input()
  set inst(inst: string) {
    this.select(inst);
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
        this.selectedOF = parseInt(value[1], 16);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  select(inst: string): void {
    if (inst && inst.length === 4) {
      inst = inst.toUpperCase();
      this.operationType = parseInt(inst[0], 16);
      this.selectedAddr = parseInt(inst[1], 16);
      this.selectedOF = parseInt(inst[3], 16);
      this.control.setValue(inst[2] + inst[3]);
    }
  }

  isSelected(inst: string): boolean {
    return (
      parseInt(inst[0], 16) === this.operationType
      && parseInt(inst[1], 16) === this.selectedAddr
      && parseInt(inst[3], 16) === this.selectedOF
    );
  }

  getInstructionAddress(inst): string {
    // return inst.toLineString();
    return inst.TO.toString(16).toUpperCase() + inst.AD.toString(16).toUpperCase();
  }

  getDescription(inst): string {
    return inst.getShortType() + ' - ' + inst.getLongType() + ' -- ' + inst.getDescription();
  }

  getInstructions(OD, OF): Instruction[][] {
    const instructions = [];
    this.instructionError = {};

    for (const TO of HEX_VALUES) {
      instructions.push([]);
      this.instructionError[TO] = {};
      for (const AD of HEX_VALUES) {
        this.instructionError[TO][AD] = false;
        if (TO !== 0) {
          try {
            const inst = this.bull.bullgamma.parser.parseInstruction(TO, AD, OD, OF);
            inst.getDescription();
            instructions[TO].push(inst);
          } catch (error) {
            try {
              this.instructionError[TO][AD] = true;
              const inst = this.bull.bullgamma.parser.parseInstruction(TO, AD, 0, 0);
              inst.getDescription();
              instructions[TO].push(inst);
            } catch (error) {
              // do nothing
            }
          }
        } else {
          for (const _OF of [0, 1, 2, 3]) {
            try {
              const inst = this.bull.bullgamma.parser.parseInstruction(TO, AD, OD, OF - OF % 4 + _OF % 4);
              inst.getDescription();
              instructions[TO].push(inst);
            } catch (error) {
                // do nothing
            }
          }
        }
      }
    }
    return instructions;
  }

}

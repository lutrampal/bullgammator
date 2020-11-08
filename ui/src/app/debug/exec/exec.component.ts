import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ExecService } from '../providers/exec.service';

@Component({
  selector: 'app-exec',
  templateUrl: './exec.component.html',
  styleUrls: ['./exec.component.css']
})
export class ExecComponent implements OnInit {

  breakpointsVar: FormControl[][];

  @Input()
  set breakpoints(breakpoints: FormControl[][]) {
    if (breakpoints && breakpoints.length > 0) {
      this.breakpointsVar = breakpoints;
    }
  }

  error: any;

  constructor(
    private exec: ExecService
  ) { }

  ngOnInit(): void {
  }

  /*
   *  Executes one instruction and prepare the next
   */
  executeNextInstruction(): void {
    try {
      this.error = null;
      this.exec.executeNextInstruction();
    } catch (error) {
      this.error = error;
    }
  }

  /*
   *  Executes instructions until the next breakpoint
   */
  execUntilBreakPoint(): void {
    try {
      this.error = null;
      if (!this.breakpointsVar) {
        this.exec.executeUntil(0, 3);
      } else {
        do {
          this.exec.executeNextInstruction();
        } while (!this.breakpointAtCurrentLine());
      }
    } catch (error) {
      this.error = error;
    }
  }

  /*
   *  Returns wether the is a breakpoint at the next line to bez executed
   */
  breakpointAtCurrentLine(): boolean {
    if (!this.breakpointsVar) {
      return true;
    }
    return this.breakpointsVar[this.exec.getSeries()][this.exec.getLine()].value;
  }

  getConsoleLines(): string[] {
    return this.exec.getConsoleLines();
  }

  getDescription(): string {
    return 'Le panneau \'Exécution\' affiche tout ce qui est écrit sur la sortie du Gamma 3. Dans la réalité, il ' +
      's\'agirait plutôt d\'une imprimante à cartes perforées. Le bouton \'titiller\' (vocabulaire de l\'époque) permet de ' +
      'passer à l\'instruction suivante tandis que \'continuer\' exécute tout le code jusqu\'au prochain point d\'arrêt.';
  }

}

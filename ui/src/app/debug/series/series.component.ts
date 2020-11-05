import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SeriesService } from '../providers/series.service';
import { Instruction } from 'bullgammator';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  @Output()
  breakpts_emit = new EventEmitter<FormControl[][]>();

	@Output()
	inst_emit = new EventEmitter<string>()

  seriesId: number;
  breakpoints: FormControl[][] = [];
	instructions: Instruction[][];

	currentLine: number = 0;
	currentSeries: number = 3;

  constructor(
    public series: SeriesService
  ) {
		this.currentLine = this.series.getLine();
		this.currentSeries = this.series.getSeries();

		this.instructions = new Array(this.series.getSeriesNumber() - 1);
		this.updateAllInstructions();

		for (let seriesIndex of this.series.getSeriesList()) {
			this.breakpoints.push([]);
			for (var i = 0; i < this.getNbInst(seriesIndex); i++) {
				this.breakpoints[seriesIndex].push(new FormControl(false, []));
			}
		}
		this.seriesId = this.series.getSeriesNumber() - 1;
    this.breakpoints[this.seriesId][0].setValue(true);
    this.breakpoints[this.seriesId][0].disable();
		this.emitBreakpoints();
  }

  ngOnInit(): void {
  }

	updateAllInstructions(): void {
		for (let seriesIndex of this.series.getSeriesList()) {
			if (seriesIndex != this.series.getSeriesNumber() - 1) {
				this.updateInstructions(seriesIndex);
			}
		}
	}

	updateInstructions(seriesIndex: number): void {
		this.instructions[seriesIndex] = this.series.getInstructions(seriesIndex);
	}

  getInstructions(seriesIndex, columnIndex): Instruction[] {
		// update the regular series
		let instructions: Instruction[];
		let line = this.series.getLine();
		let series = this.series.getSeries();
		if (this.currentLine != line || this.currentSeries != series) {
			this.updateInstructions(this.seriesId);
			this.currentLine = line;
			this.currentSeries = series;
		}
		// get the complete list of instructions
		if (seriesIndex == this.series.getSeriesNumber() - 1) {
			// connections table is fetched directly
			instructions = this.series.getInstructions(seriesIndex);
		} else {
			instructions = this.instructions[seriesIndex];
		}
		// slice the list
		if (columnIndex == 0) {
			instructions = instructions.slice(
				0, this.getHalfNbInst(seriesIndex)
			);
		} else {
			instructions = instructions.slice(
				this.getHalfNbInst(seriesIndex), this.getNbInst(seriesIndex)
			);
		}
		return instructions;
  }

  plus(): void {
    this.seriesId = (this.seriesId + 1) % this.series.getSeriesNumber();
		this.updateInstructions(this.seriesId);
  }

  minus(): void {
    this.seriesId = (this.seriesId + this.series.getSeriesNumber() - 1) % this.series.getSeriesNumber();
		this.updateInstructions(this.seriesId);
  }

	isProgramLine(seriesIndex: number, columnIndex: number, lineIndex: number): boolean {
		let instIndex = this.getLineNumber(seriesIndex, columnIndex, lineIndex);
		return (instIndex == this.series.getLine()) && (seriesIndex == this.series.getSeries());
	}

  getNbInst(seriesIndex: number): number {
    return this.series.getNumberOfInstructions(seriesIndex);
  }

  getHalfNbInst(seriesIndex: number): number {
    return Math.floor(this.series.getNumberOfInstructions(seriesIndex) / 2);
  }

  getControl(seriesIndex: number, columnIndex: number, lineIndex: number): FormControl {
		let instIndex = this.getLineNumber(seriesIndex, columnIndex, lineIndex);
		return this.breakpoints[seriesIndex][instIndex];
  }

  emitBreakpoints(): void {
    this.breakpts_emit.emit(this.breakpoints);
  }

	getDescription(): string {
		return "Le panneau des serie montre le code qui sera exécuté. On peut fixer des points d’arrêts en cochant les " +
      "cases avant chaque instruction. Le calculateur retourne à l’instruction 0 aprèseries la 63ème ligne comme le " +
      "véritable calculateur. Le passage à une autre seriesérie nécessite une instruction."
	}

	openInstruction(inst): void {
		this.inst_emit.emit(inst.toString());
	}

	getLineNumber(seriesIndex: number, columnIndex: number, lineIndex: number): number {
		return columnIndex * this.getHalfNbInst(seriesIndex) + lineIndex;
	}

	getInstructionText(inst): string {
		return inst.toString() + " -- " + inst.getShortType();
	}

}

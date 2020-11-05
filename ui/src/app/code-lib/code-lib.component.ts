import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CodeLibService } from './providers/code-lib.service';

@Component({
  selector: 'app-code-lib',
  templateUrl: './code-lib.component.html',
  styleUrls: ['./code-lib.component.css']
})
export class CodeLibComponent implements OnInit {

	message: any;

	@Output()
	series3_emit = new EventEmitter<string>();
	@Output()
	drum_emit = new EventEmitter<string>();

  constructor(
		private snackBar: MatSnackBar,
		private lib: CodeLibService
	) { }

  ngOnInit() {
  }

	getProgramsNames(): string[] {
		return this.lib.getProgramsNames();
	}

	loadProgram(name: string): void {
		try {
			this.lib.loadProgram(name);
			this.series3_emit.emit(this.lib.getProgram(name, "series3"));
			this.drum_emit.emit(this.lib.getProgram(name, "drum") || "");
			this.message = "";
			this.snackBar.open(
				"Programme '" + this.displayName(name) + "' chargé. \
				Contrôlez son exécution dans l'onglet 'Supervision'.",
				"OK", {duration: 8000}
			);
		} catch (error) {
			this.message = error;
		}
	}

	displayName(name: string): string {
		return this.lib.displayName(name);
	}

	description(name: string): string {
		return this.lib.getProgram(name, "description");
	}

}

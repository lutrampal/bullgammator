import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup } from '@angular/forms';

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
		private lib: CodeLibService
	) { }

  ngOnInit() {
  }

	getProgramsNames() {
		return this.lib.getProgramsNames();
	}

	loadProgram(name: string) {
		try {
			this.lib.loadProgram(name);
			this.series3_emit.emit(this.lib.getProgram(name, "series3"));
			this.drum_emit.emit(this.lib.getProgram(name, "drum") || "");
			this.message = 'Programme "' + this.displayName(name) + '" chargé, \
				vous pouvez controler l\'exécution de ce programme dans l\'onglet "Debug"';
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

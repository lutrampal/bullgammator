import { Component, OnInit, Input } from '@angular/core';
import {FormGroup } from '@angular/forms';

import { CodeLibService } from './providers/code-lib.service';

@Component({
  selector: 'app-code-lib',
  templateUrl: './code-lib.component.html',
  styleUrls: ['./code-lib.component.css']
})
export class CodeLibComponent implements OnInit {

	message: any;

	@Input()
	series3: FormGroup;
	@Input()
	drum: FormGroup;

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
			if (this.series3) {
				this.series3.get("hex_entry").setValue(this.lib.getProgram(name, "series3"));
			}
			if (this.drum) {
				this.drum.get("hex_entry").setValue(this.lib.getProgram(name, "drum"));
			}
			this.message = 'Programme "' + this.displayName(name) + '" chargé, \
				vous pouvez controler l\'exécution de ce programme dans l\'onglet "Debug"';
		} catch (error) {
			this.message = error;
		}
	}

	displayName(name: string) {
		return this.lib.displayName(name);
	}

}

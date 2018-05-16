import { Component, OnInit } from '@angular/core';

import { CodeLibService } from './providers/code-lib.service';

@Component({
  selector: 'app-code-lib',
  templateUrl: './code-lib.component.html',
  styleUrls: ['./code-lib.component.css']
})
export class CodeLibComponent implements OnInit {

	message: any;

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

import { Injectable } from '@angular/core';

import { CodeLibrary } from 'bullgammator';
import { BullgammatorService } from '../../providers/bullgammator.service';
import { EditorService } from '../../editors/providers/editor.service';
import { ExecService } from '../../debug/providers/exec.service';
import { MemoriesService } from '../../debug/providers/memories.service';

@Injectable()
export class CodeLibService {

	lib: CodeLibrary;

  constructor(
		private edit: EditorService,
		private exec: ExecService,
		private mems: MemoriesService,
		private bull: BullgammatorService
	) {
		this.lib = new CodeLibrary();
	}

	getProgramsNames() {
		return this.lib.getProgramsNames();
	}

	loadProgram(name: string) {
		this.edit.editConnexionArray(
			this.lib.getProgram(name, "series3")
		);
		this.edit.editDrum(
			this.lib.getProgram(name, "drum")
		);
		for (let i=1; i<this.bull.constants.NB_BANAL_MEMORIES; i++) {
			if (this.lib.getProgram(name, "m" + i)) {
				this.mems.setMemory(this.lib.getProgram(name, "m" + i), i, 0);
			}
		}
		this.exec.exec.console.push('Programme "' + this.displayName(name) + '" chargé');
	}

	displayName(name: string) {
		return this.lib.getDisplayName(name);
	}

}

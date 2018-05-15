import { Injectable } from '@angular/core';

import { Editor } from 'bullgammator'
import { BullgammatorService } from '../../providers/bullgammator.service'


@Injectable()
export class EditorService {

	editor: Editor;

  constructor(
		private bull: BullgammatorService
	) {
		this.editor = new Editor(this.bull.bullgamma);
	}

	editConnexionArray(hexCode: string) {
		this.editor.editConnexionArray(hexCode);
	}

	editDrum(hexCode: string) {
		this.editor.editDrum(hexCode);
	}

}

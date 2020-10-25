import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EditorService } from '../providers/editor.service';
import { ExecService } from '../../debug/providers/exec.service';

@Component({
  selector: 'app-wire-editor',
  templateUrl: './wire-editor.component.html',
  styleUrls: ['./wire-editor.component.css']
})
export class WireEditorComponent implements OnInit {

	error: string = "Fonctionnalité en cours de développement";

	@Input()
	set series3(series3: string) {
		if (series3) {
			// Here when receiving hex code from code library or Hex editor
			// TODO: Display hex code on connections table
		}
	}

	@Output()
	series3_emit = new EventEmitter<string>();

  constructor(
    private edit: EditorService,
		private exec: ExecService
  ) { }

  ngOnInit(): void {
  }

	getHexCode(): string {
		// TODO: Implement here to read the hex code from the connections table
		return "1234";
	}

  validateSeries3Hex() {
    try {
			let hexCode = this.getHexCode();
      this.edit.editConnexionArray(hexCode);
			this.series3_emit.emit(hexCode);
			this.exec.writeConsoleLine("Série 3 chargée depuis l'éditeur");
    }
    catch(error) {
      console.error(error);
      this.error = error;
    }
  }


}

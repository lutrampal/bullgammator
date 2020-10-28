import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EditorService } from '../providers/editor.service';
import { ExecService } from '../../debug/providers/exec.service';

@Component({
  selector: 'app-hex-editor',
  templateUrl: './hex-editor.component.html',
  styleUrls: ['./hex-editor.component.css']
})
export class HexEditorComponent implements OnInit, OnDestroy {

  series3HexCtrl: FormGroup;
  magDrumHexCtrl: FormGroup;

  series3HexWatcher: any;
  magDrumHexWatcher: any;

	series3HexError: string;
	magDrumHexError: string;

	@Input()
	set series3(series3: string) {
		if (series3) {
			this.series3HexCtrl.get("hex_entry").setValue(series3);
		}
	}
	@Input()
	set drum(drum: string) {
		if (drum || drum === "") {
			this.magDrumHexCtrl.get("hex_entry").setValue(drum);
		}
	}

	@Output()
	series3_emit = new EventEmitter<string>();

  constructor(
		private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private edit: EditorService,
		private exec: ExecService
  ) {

  }

  ngOnInit() {
    this.series3HexCtrl = this.fb.group({
      hex_entry: ["", [Validators.required, this.hex_validator]]
    })
    this.series3HexWatcher = this.series3HexCtrl.valueChanges.subscribe(() => {
      this.series3HexError = null;
    });
    this.magDrumHexCtrl = this.fb.group({
      hex_entry: ["", [Validators.required, this.hex_validator]]
    })
    this.magDrumHexWatcher = this.magDrumHexCtrl.valueChanges.subscribe(() => {
      this.magDrumHexError = null;
    });
  }

  ngOnDestroy() {
	  if (this.series3HexWatcher) {
	    this.series3HexWatcher.unsubscribe();
	  }
	  if (this.magDrumHexWatcher) {
	    this.magDrumHexWatcher.unsubscribe();
	  }
  }

  hex_validator(control: FormControl) {
    return null;
  }

  validateSeries3Hex() {
    try {
			let hexCode = this.series3HexCtrl.get("hex_entry").value;
			this.edit.editConnexionArray(hexCode);
			this.series3_emit.emit(hexCode);
			this.exec.writeConsoleLine("Série 3 chargée depuis l'éditeur");
			this.snackBar.open(
				"Série 3 et 'Tableau de connnexions' mis à jour.",
				"OK", {duration: 6000}
			);
    }
    catch(error) {
      console.error(error);
      this.series3HexError = error;
    }
  }

	validateDrumHex() {
			try {
				this.edit.editDrum(this.magDrumHexCtrl.get("hex_entry").value);
				this.exec.writeConsoleLine("Tambour chargé depuis l'éditeur");
				this.snackBar.open(
					"Tambour mise à jour.",
					"OK", {duration: 5000}
				);
			}
			catch(error) {
				console.error(error);
				this.magDrumHexError = error;
			}
	}

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EditorService } from '../providers/editor.service';

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

  constructor(
    private fb: FormBuilder,
    private edit: EditorService
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
      this.edit.editConnexionArray(this.series3HexCtrl.get("hex_entry").value);
    }
    catch(error) {
      console.error(error);
      this.series3HexError = error;
    }
  }

	validateDrumHex() {
			try {
				this.edit.editDrum(this.magDrumHexCtrl.get("hex_entry").value);
			}
			catch(error) {
				console.error(error);
				this.magDrumHexError = error;
			}
	}

}

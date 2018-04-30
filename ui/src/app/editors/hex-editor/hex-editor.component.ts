import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BullgammatorService } from '../../providers/bullgammator.service';

@Component({
  selector: 'app-hex-editor',
  templateUrl: './hex-editor.component.html',
  styleUrls: ['./hex-editor.component.css']
})
export class HexEditorComponent implements OnInit, OnDestroy {

  control: FormGroup;
  error: string;
  watcher: any;

  constructor(
    private fb: FormBuilder,
    private bull: BullgammatorService
  ) {

  }

  ngOnInit() {
    this.control = this.fb.group({
      hex_entry: ["", [Validators.required, this.hex_validator]]
    })
    this.watcher = this.control.valueChanges.subscribe(() => {
      this.error = null;
    });
  }

  ngOnDestroy() {
    if (this.watcher) {
      this.watcher.unsubscribe();
    }
  }

  hex_validator(control: FormControl) {
    return null;
  }

  validate() {
    try {
      this.bull.bullgamma.getSerie(3).setInstructions(this.control.get("hex_entry").value);
    }
    catch(error) {
      console.error(error);
      this.error = error;
    }
  }

}

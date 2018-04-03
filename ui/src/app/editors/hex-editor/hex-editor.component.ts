import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BullgammatorService } from '../../providers/bullgammator.service';

@Component({
  selector: 'app-hex-editor',
  templateUrl: './hex-editor.component.html',
  styleUrls: ['./hex-editor.component.css']
})
export class HexEditorComponent implements OnInit {

  control: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bull: BullgammatorService
  ) {

  }

  ngOnInit() {
    this.control = this.fb.group({
      hex_entry: ["", [Validators.required, this.hex_validator]]
    })
  }

  hex_validator(control: FormControl) {
    return null;
  }

  validate() {
    let insts = this.bull.parse_hex(this.control.get("hex_entry").value);
    this.bull.instructions = insts;
  }

}

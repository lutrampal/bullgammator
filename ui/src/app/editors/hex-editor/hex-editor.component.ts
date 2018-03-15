import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hex-editor',
  templateUrl: './hex-editor.component.html',
  styleUrls: ['./hex-editor.component.css']
})
export class HexEditorComponent implements OnInit {

  control: FormGroup;

  constructor(
    private fb: FormBuilder
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
    console.log(this.control.get("hex_entry").value);
  }

}

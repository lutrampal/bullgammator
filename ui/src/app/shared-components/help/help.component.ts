import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

	@Input() public title: string = "Aide";

  constructor() { }

  ngOnInit(): void {
  }

}

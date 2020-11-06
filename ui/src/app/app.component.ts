import { Component, ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'ui';
  series3: string;
  inst: string;
  drum: string;

  @ViewChild(MatSidenav) snav: MatSidenav;

  updateInstruction(inst): void {
    this.inst = inst;
    this.snav.open();
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { HexEditorComponent } from './editors/hex-editor/hex-editor.component';

import { MbComponent } from './debug/mb/mb.component';
import { OctadsComponent } from './debug/octads/octads.component';
import { SeriesComponent } from './debug/series/series.component';

import { MemoriesService } from './debug/providers/memories.service';
import { SeriesService } from './debug/providers/series.service';
import { BullgammatorService } from './providers/bullgammator.service';

@NgModule({
  declarations: [
    AppComponent,
    HexEditorComponent,
    MbComponent,
    OctadsComponent,
    SeriesComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatExpansionModule, MatIconModule
  ],
  providers: [MemoriesService, SeriesService, BullgammatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { HexEditorComponent } from './editors/hex-editor/hex-editor.component';

import { DebugComponent } from './debug/debug.component';
import { MbComponent } from './debug/mb/mb.component';
import { OctadsComponent } from './debug/octads/octads.component';
import { SeriesComponent } from './debug/series/series.component';
import { ExecComponent } from './debug/exec/exec.component';
import { DrumComponent } from './drum/drum.component';

import { MemoriesService } from './debug/providers/memories.service';
import { SeriesService } from './debug/providers/series.service';
import { ExecService } from './debug/providers/exec.service';
import { BullgammatorService } from './providers/bullgammator.service';
import { DrumService } from './drum/providers/drum.service';
import { EditorService } from './editors/providers/editor.service';

@NgModule({
  declarations: [
    AppComponent,
    HexEditorComponent,
    DebugComponent, MbComponent, OctadsComponent, SeriesComponent, ExecComponent,
		DrumComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatExpansionModule, MatIconModule, MatTabsModule, MatTooltipModule
  ],
  providers: [
		MemoriesService, SeriesService, ExecService,
		BullgammatorService, DrumService, EditorService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }

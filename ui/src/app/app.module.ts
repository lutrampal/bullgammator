import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HexEditorComponent } from './editors/hex-editor/hex-editor.component';
import { WireEditorComponent } from './editors/wire-editor/wire-editor.component';
import { CodeLibComponent } from './code-lib/code-lib.component';

import { DebugComponent } from './debug/debug.component';
import { MbComponent } from './debug/mb/mb.component';
import { OctadsComponent } from './debug/octads/octads.component';
import { SeriesComponent } from './debug/series/series.component';
import { ExecComponent } from './debug/exec/exec.component';
import { DrumComponent } from './drum/drum.component';

import { InstructionsHelpComponent } from './instructions/instructions-help/instructions-help.component';

import { MemoriesService } from './debug/providers/memories.service';
import { SeriesService } from './debug/providers/series.service';
import { ExecService } from './debug/providers/exec.service';
import { BullgammatorService } from './providers/bullgammator.service';
import { DrumService } from './drum/providers/drum.service';
import { EditorService } from './editors/providers/editor.service';
import { CodeLibService } from './code-lib/providers/code-lib.service';

import { HelpComponent } from './shared-components/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    HexEditorComponent, WireEditorComponent, InstructionsHelpComponent, CodeLibComponent,
    DebugComponent, MbComponent, OctadsComponent, SeriesComponent, ExecComponent,
    DrumComponent,
    HelpComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatExpansionModule, MatIconModule, MatTabsModule,
		MatTooltipModule, MatListModule, MatSnackBarModule, MatSidenavModule, MatToolbarModule
  ],
  providers: [
    MemoriesService, SeriesService, ExecService,
    BullgammatorService, DrumService, EditorService, CodeLibService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

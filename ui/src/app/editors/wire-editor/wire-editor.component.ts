import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EditorService } from '../providers/editor.service';
import { ExecService } from '../../debug/providers/exec.service';
import { Instruction } from 'bullgammator';

@Component({
  selector: 'app-wire-editor',
  templateUrl: './wire-editor.component.html',
  styleUrls: ['./wire-editor.component.css']
})
export class WireEditorComponent implements OnInit {

	public error: string;
	public tensed: boolean = false;

	public canvasWidth: number = 563;
	public canvasHeight: number = 1000;
	private context: any;

	private currentValue: number = 0;

	private rowHeight: number = 27;
	private linesNumber: number = 32; // NB_INST_CONNEXION_ARRAY / 2
	private offsetX: number = 14;
	private offsetY: number = 20;

	private columns = {
		0: { label: "NL", textOffset: 5, offset: 0, width: 30, circleOffsetX1: 0, circleOffsetX2: 0, type: -1, hex: -1, color: "#FFFFFF"},
		1: { label: "TO", textOffset: 14, offset: 30, width: 50, circleOffsetX1: 14, circleOffsetX2: 37, type: 0, hex: 3, color: "#F8FF85"},
		2: { label: "AD", textOffset: 14, offset: 80, width: 50, circleOffsetX1: 14, circleOffsetX2: 37, type: 0, hex: 2, color: "#FFC085"},
		3: { label: "OD", textOffset: 14, offset: 130, width: 50, circleOffsetX1: 14, circleOffsetX2: 37, type: 0, hex: 1, color: "#E3D0FF"},
		4: { label: "OF", textOffset: 14, offset: 180, width: 50, circleOffsetX1: 14, circleOffsetX2: 37, type: 0, hex: 0, color: "#CAFCFC"},
		5: { label: "Distrib", textOffset: 12, offset: 230, width: 50 + 25, circleOffsetX1: 26, circleOffsetX2: 50, type: 1, hex: -1, color: "#D0FFBC"},
		6: { label: "TO", textOffset: 14, offset: 305, width: 50, circleOffsetX1: 14, circleOffsetX2: 37, type: 0, hex: 3, color: "#F8FF85"},
		7: { label: "AD", textOffset: 14, offset: 355, width: 50, circleOffsetX1: 14, circleOffsetX2: 37, type: 0, hex: 2, color: "#FFC085"},
		8: { label: "OD", textOffset: 14, offset: 405, width: 50, circleOffsetX1: 14, circleOffsetX2: 37, type: 0, hex: 1, color: "#E3D0FF"},
		9: { label: "OF", textOffset: 14, offset: 455, width: 50, circleOffsetX1: 14, circleOffsetX2: 37, type: 0, hex: 0, color: "#CAFCFC"},
		10: { label: "NL", textOffset: 5, offset: 505, width: 30, circleOffsetX1: 0, circleOffsetX2: 0, type: -1, hex: -1, color: "#FFFFFF"}
	}
	private valuesColors = [
		"#FFFFFF", "#103080", "#205040", "#408FBF",   "#205040", "#50AF80", "#60CF40", "#70EF00",
		"#8010BF", "#8F3080", "#9F5040", "#AF7000",   "#BF8FBF", "#CFAF80", "#DDD140", "#EFEF00"
	];

	@Input()
	set series3(series3: string) {
		if (series3) {
			this.edit.getConnectionsTable().setInstructions(series3);
			this.draw();
		}
	}

	@Output()
	series3_emit = new EventEmitter<string>();

	@Output()
	inst_emit = new EventEmitter<string>();

	@ViewChild("canvas", { read: ElementRef, static: true }) canvas: ElementRef;

  constructor(
		private snackBar: MatSnackBar,
    private edit: EditorService,
		private exec: ExecService
  ) { }

  ngOnInit(): void {
		this.context = this.canvas.nativeElement.getContext("2d");
		this.draw();
  }

  validateSeries3Hex(): void {
    try {
      this.edit.getConnectionsTable().loadInstructions();
			this.series3_emit.emit(this.edit.getConnectionsTable().getHexCode());
			this.exec.writeConsoleLine("Série 3 chargée depuis l'éditeur");
			this.snackBar.open(
				"Série 3 et 'Editeur' mis à jour.",
				"OK", {duration: 6000}
			);
    }
    catch(error) {
      console.error(error);
      this.error = error;
    }
  }

	setHexValue(instIndex, hexIndex, hexValue): void {
		return this.edit.getConnectionsTable().setHexValue(instIndex, hexIndex, hexValue);
	}

	reset(): void {
		this.edit.getConnectionsTable().reset();
		this.draw();
	}

	getConnectionsTopLeft(): number[][] {
		return this.edit.getConnectionsTable().getConnectionsTopLeft();
	}

	getConnectionsBottomLeft(): number[][] {
		return this.edit.getConnectionsTable().getConnectionsBottomLeft();
	}

	getConnectionsTopRight(): number[][] {
		return this.edit.getConnectionsTable().getConnectionsTopRight();
	}

	getConnectionsBottomRight(): number[][] {
		return this.edit.getConnectionsTable().getConnectionsBottomRight();
	}

	dist(x1: number, y1: number, x2: number, y2: number): number {
		return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
	}

	getScale(): number {
		var rect = this.canvas.nativeElement.getBoundingClientRect();
		return (rect.right - rect.left) / this.canvasWidth;
	}

	onImageClick(event: MouseEvent): void {
		var rect = this.canvas.nativeElement.getBoundingClientRect();
		var xCoord = event.clientX - rect.left;
		var yCoord = event.clientY - rect.top;
		this.onClick(
			(event.clientX - rect.left) / this.getScale(),
			(event.clientY - rect.top) / this.getScale()
		);
	}

	// normalized coodinates 0 <= x,y <= 1
	onClick(xCoord: number, yCoord: number): void {
		var currentX = this.offsetX;
		var clickedColumn = -1;
		var clickedLine = -1;
		for (let columnIndex = 0; columnIndex < 11; columnIndex++) {
			var column = this.columns[columnIndex];
			if (xCoord <= currentX) {
				return
			}
			if (xCoord < currentX + column.width) {
				clickedColumn = columnIndex;
				break;
			}
			currentX += column.width;
		}

		clickedLine = Math.floor((yCoord - this.offsetY) / this.rowHeight);

		if (clickedColumn < 0 || clickedColumn < 0) {
			return;
		}

		var column = this.columns[clickedColumn];

		if (column.type < 0) {
			return;
		}

		var side = -1;
		var centerX;
		var centerY = 15 + this.offsetY + clickedLine * this.rowHeight;

		if (this.dist(xCoord, yCoord, currentX + column.circleOffsetX1, centerY) < 8) {
			side = 0;
			centerX = currentX + column.circleOffsetX1;
		} else if (this.dist(xCoord, yCoord, currentX + column.circleOffsetX2, centerY) < 8) {
			side = 1;
			centerX = currentX + column.circleOffsetX2;
		}
		if (side < 0) {
			return;
		}

		if (column.label == "Distrib") {
			var instructionIndex = clickedLine + (side == 1 ? this.linesNumber : 0);
			this.selectValue(this.context, instructionIndex);
			this.draw();
			return;
		}

		if (column.type == 0) {
			var instructionIndex = clickedLine + (column.offset > this.columns[5].offset ? this.linesNumber : 0)
			this.setHexValue(instructionIndex, column.hex, this.currentValue % 16);
			this.inst_emit.emit(this.edit.getConnectionsTable().getInstructionCode(instructionIndex));
			this.draw();
			return;
		}
	}

	selectValue(context: any, instructionIndex): void {
		this.currentValue = instructionIndex;
	}

	draw(): void {
		this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.drawBackground(this.context);
		this.drawSelectedValue(this.context);
		this.drawConnections(this.context);
	}

	drawSelectedValue(context: any): void {
		var column = this.columns[5];
		this.selectCircle(
			context,
			this.offsetX + column.offset + column.circleOffsetX1,
			15 + this.offsetY + (this.currentValue % 16) * this.rowHeight,
			"black"
		);
		this.selectCircle(
			context,
			this.offsetX + column.offset + column.circleOffsetX1,
			15 + this.offsetY + (this.currentValue % 16 + 16) * this.rowHeight,
			"black"
		);
		this.selectCircle(
			context,
			this.offsetX + column.offset + column.circleOffsetX2,
			15 + this.offsetY + (this.currentValue % 16) * this.rowHeight,
			"black"
		);
		this.selectCircle(
			context,
			this.offsetX + column.offset + column.circleOffsetX2,
			15 + this.offsetY + (this.currentValue % 16 + 16) * this.rowHeight,
			"black"
		);
	}

	drawConnections(context: any): void {
		this.drawCornerConnections(context, this.getConnectionsTopLeft(), 0);
		this.drawCornerConnections(context, this.getConnectionsBottomLeft(), 1);
		this.drawCornerConnections(context, this.getConnectionsTopRight(), 2);
		this.drawCornerConnections(context, this.getConnectionsBottomRight(), 3);
	}

	drawCornerConnections(context: any, corner: number[][], id: number): void {
		var distribColumn = this.columns[5];
		for (let hexValue = 1; hexValue < corner.length; hexValue++) {
			var centerX1 = this.offsetX + distribColumn.offset + (id < 2 ? distribColumn.circleOffsetX1 : distribColumn.circleOffsetX2);
			var centerY1 = 15 + this.offsetY + (hexValue + (id % 2) * 16) * this.rowHeight;
			var color = this.valuesColors[hexValue];

			for (let index = 0; index < corner[hexValue].length; index++) {
				var instIndex = corner[hexValue][index][0];
				var hexIndex = corner[hexValue][index][1];
				var reverse = {
					0: 4,
					1: 3,
					2: 2,
					3: 1,
					4: 9,
					5: 8,
					6: 7,
					7: 6
				};
				var columnIndex = reverse[hexIndex + 4 * Math.floor(instIndex / this.linesNumber)]
				var column = this.columns[columnIndex];
				var centerX2 = this.offsetX + column.offset + column.circleOffsetX1;
				var centerY2 = 15 + this.offsetY + (instIndex % this.linesNumber) * this.rowHeight;

				this.dessConex(context, centerX1, centerY1, centerX2, centerY2, color);
				this.fillCircle(context, centerX2, centerY2, color);

				centerX1 = this.offsetX + column.offset + column.circleOffsetX2;
				centerY1 = centerY2;
				this.fillCircle(context, centerX1, centerY1, color);
			}
		}
	}

	drawBackground(context: any): void {
		// dessin du panneau vide
		context.font = '16px sans-serif';
		context.strokeStyle = "black";

		for (let columnIndex = 0; columnIndex < 11; columnIndex++) {
			var column = this.columns[columnIndex];

			context.fillStyle = column.color;
			context.fillRect(
				this.offsetX + column.offset, this.offsetY,
				column.width, this.linesNumber * this.rowHeight
			);
			if (column.label == "Distrib") {
				for (let lineIndex = 0; lineIndex < this.linesNumber; lineIndex++) {
					context.fillStyle = "black" ;
					var lineY = 15 + this.offsetY + lineIndex * this.rowHeight;
					var textY = 6 + lineY;
					var lineHex = Number(lineIndex % 16).toString(16).toUpperCase();
					context.fillText(lineHex, this.offsetX + column.offset + 5, textY);
					context.fillText(lineHex, this.offsetX + column.offset + 61, textY);

					var color = this.valuesColors[lineIndex % 16];
					this.circle(context, this.offsetX + column.offset + column.circleOffsetX1, lineY);
					this.fillCircle(context, this.offsetX + column.offset + column.circleOffsetX1, lineY, color);
					this.circle(context, this.offsetX + column.offset + column.circleOffsetX2, lineY);
					this.fillCircle(context, this.offsetX + column.offset + column.circleOffsetX2, lineY, color);

					context.fillStyle = "black" ;
					context.lineWidth = "2";
					context.beginPath();
					context.moveTo(this.offsetX + column.offset + 2, this.offsetY - 20);
					context.lineTo(this.offsetX + column.offset + 2, this.offsetY + this.linesNumber * this.rowHeight);
					context.moveTo(this.offsetX + column.offset + 38, this.offsetY + 30);
					context.lineTo(this.offsetX + column.offset + 38, this.offsetY + this.linesNumber * this.rowHeight);
					context.moveTo(this.offsetX + column.offset + 74, this.offsetY - 20);
					context.lineTo(this.offsetX + column.offset + 74, this.offsetY + this.linesNumber * this.rowHeight);
					context.stroke();
				}
			} else if (column.label == "NL") {
				for (let lineIndex = 0; lineIndex < this.linesNumber; lineIndex++) {
					context.fillStyle = "black" ;
					var lineY = 15 + this.offsetY + lineIndex * this.rowHeight;
					var textY = 6 + lineY;
					var lineLabel = lineIndex + (columnIndex == 0 ? 0 : this.linesNumber)
					context.fillText(
						lineLabel,
						this.offsetX + column.offset + column.textOffset + (lineLabel < 10 ? 5 : 0), textY
					);
				}
			} else {
				for (let lineIndex = 0; lineIndex < this.linesNumber; lineIndex++) {
					color = "white" ;
					var lineY = 15 + this.offsetY + lineIndex * this.rowHeight;
					this.circle(context, this.offsetX + column.offset + column.circleOffsetX1, lineY);
					this.fillCircle(context, this.offsetX + column.offset + column.circleOffsetX1, lineY, color);
					this.circle(context, this.offsetX + column.offset + column.circleOffsetX2, lineY);
					this.fillCircle(context, this.offsetX + column.offset + column.circleOffsetX2, lineY, color);
					this.petitLien(context, this.offsetX + column.offset + 22, lineY);
				}
			}

			context.fillStyle = "black" ;
			context.fillText(column.label, this.offsetX + column.offset + column.textOffset, this.offsetY - 5);

		}

		context.fillStyle = "black";
		context.lineWidth = "2";
		context.beginPath();
		context.moveTo(this.offsetX, this.offsetY + 2 + (this.linesNumber / 2) * this.rowHeight);
		context.lineTo(this.offsetX + column.offset + this.columns[10].width, this.offsetY + 2 + (this.linesNumber / 2) * this.rowHeight);
		context.stroke();

	}

	circle(context: any, x: number, y: number): void {
		// dessine un cercle vide
	  context.beginPath();
	  context.lineWidth= 1;
	  context.arc(x, y, 8, 0, 2 * Math.PI);
	  context.stroke();
	}

	fillCircle(context: any, x: number, y: number, color: string) {
		// rempli l'interieur du cercle
		context.fillStyle = color;
	  context.beginPath();
	  context.arc(x, y, 6, 0, 2 * Math.PI);
	  context.fill();
	}

	petitLien(context: any, x: number, y: number): void {
		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(x+8, y);
		context.stroke();
	}

	selectCircle(context: any, x: number, y: number, color: string): void {
		context.strokeStyle = color;
	  context.beginPath();
	  context.lineWidth = 2;
	  context.arc(x, y, 10, 0, 2 * Math.PI);
	  context.stroke();
	}

	dessConex(context: any, x1: number, y1: number, x2: number, y2: number, color: string): void {
		// dessine une connexion
		context.beginPath();
		context.strokeStyle = color;
		context.lineWidth = 3;
		if (this.tensed) {   // connexion tendue = droite
			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
		} else {   // connexion distendue = arc de cercle
			var x3 = (x1 + x2)/2; // milieu geometrique
			var y3 = (y1 + y2)/2;
			y3 += 0.55 * Math.abs(x1-x3) ; // pragmatique, doit etre >0
			var a = x1 * (y2 - y3) - (x2 - x3) * y1 + x2 * y3 - x3 * y2;
			var b = (x1 * x1 + y1 * y1) * (y3 - y2) + (x2 * x2 + y2 * y2) * (y1 - y3) + (x3 * x3 + y3 * y3) * (y2 - y1);
			var c = (x1 * x1 + y1 * y1) * (x2 - x3) + (x2 * x2 + y2 * y2) * (x3 - x1) + (x3 * x3 + y3 * y3) * (x1 - x2);
			var x = -b / (2 * a);  // centre du cercle
			var y = -c / (2 * a);  // centre du cercle
			var r = Math.hypot(x - x1, y - y1); // rayon du cercle
			var angle1 = Math.atan2(y1-y, x1-x);
			var angle2 = Math.atan2(y2-y, x2-x);
			context.arc(x, y, r, Math.min(angle1,angle2), Math.max(angle1,angle2));
		}
		context.stroke();
	}

	toogleTensed(): void {
		this.tensed = !this.tensed;
		this.draw();
	}

}

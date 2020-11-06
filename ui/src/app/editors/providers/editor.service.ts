import { Injectable } from '@angular/core';

import { Editor, ConnectionsTable } from 'bullgammator'
import { BullgammatorService } from '../../providers/bullgammator.service'


@Injectable()
export class EditorService {

  editor: Editor;
  connectionsTable: ConnectionsTable;

  constructor(
    private bull: BullgammatorService
  ) {
    this.editor = new Editor(this.bull.bullgamma);
    this.connectionsTable = new ConnectionsTable(this.bull.bullgamma);
  }

  editConnexionArray(hexCode: string): void {
    this.editor.editConnexionArray(hexCode);
  }

  editDrum(hexCode: string): void {
    this.editor.editDrum(hexCode);
  }

  getConnectionsTable(): ConnectionsTable {
    return this.connectionsTable;
  }

}

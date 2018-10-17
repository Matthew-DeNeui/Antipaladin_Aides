import { Component, OnInit } from '@angular/core';
import { TableDef, TableEntry } from '../model';
import { LocalDataSource } from 'ng2-smart-table';
import { RandomTableService } from '../services/random-table.service';

@Component({
  selector: 'ngx-tables-list',
  templateUrl: './tables-list.component.html',
  styleUrls: ['./tables-list.component.scss']
})
export class TablesListComponent implements OnInit {
  limitValue = 140;
  hideDescription = true;
  limitDescription = true;
  editTableDefDescription = false;
  newTableDescription: string;
  edit = false;
  addNew = false;
  selectedTable: TableDef;
  tableEntryToEdit: TableEntry;
  rollValue: number;
  mouseoverRoll: boolean;
  mouseoverEntry: boolean;
  entryRange: boolean;
  foundEntries: TableEntry[];
  settings = {
    add: {
      addButtonContent: `<i class='nb-plus'></i>`,
      createButtonContent: `<i class='nb-checkmark'></i>`,
      cancelButtonContent: `<i class='nb-close'></i>`,
      confirmCreate: true
    },
    actions: {
      edit: false
    },
    delete: {
      deleteButtonContent: `<i class='nb-trash'></i>`,
      confirmDelete: true
    },
    columns: {
      tableName: {
        title: 'Name',
        type: 'string'
      }
    },
    mode: 'internal'
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(private dbService: RandomTableService) { }

  ngOnInit() {
    this.cancelTableDescriptionEdit();
    this.cancelEdit();
    this.refresh();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('THIS WILL BE IRREVERSIBLE!!!\nAre you sure you want to delete?')) {
      this.dbService.removeTable(event.data).then(numRemoved => {
        this.selectedTable = null;
        this.cancelEdit();
        this.refresh();
      });
    }
  }

  newTable(event: any) {
    console.log(event);
    const newTableDef = new TableDef(event.newData.tableName, 0, 0);
    if (newTableDef.tableName === '') {
      event.confirm.resolve();
    }
    this.dbService.insertTableDefinition(newTableDef).then(() => {
      this.refresh();
      event.confirm.resolve();
    });
  }

  addEntry() {
    if (!this.selectedTable) {
      return;
    }
    this.addNew = true;
    this.tableEntryToEdit = new TableEntry();
    this.tableEntryToEdit.table = this.selectedTable.tableName;
    this.edit = true;
  }

  editEntry(tableEntry: TableEntry) {
    if (!this.selectedTable) {
      return;
    }
    if (tableEntry.valRange.min !== tableEntry.valRange.max) {
      this.entryRange = true;
    }
    this.tableEntryToEdit = tableEntry;
    this.tableEntryToEdit.table = this.selectedTable.tableName;
    this.edit = true;
  }

  saveEntry() {
    if (!this.entryRange) {
      this.tableEntryToEdit.valRange.max = this.tableEntryToEdit.valRange.min;
    }
    console.log('New Entry: ', this.tableEntryToEdit);
    if (this.addNew) {
      console.log('adding');
      this.dbService.insertTableEntry(this.tableEntryToEdit).then(doc => {
        console.log('ADDED: ', doc.table);
        this.checkAndUpdateTableDef(this.selectedTable.tableName,
          this.tableEntryToEdit.valRange.min, this.tableEntryToEdit.valRange.max);
        this.cancelEdit();
        this.refresh();
      });
    } else {
      console.log('updating');
      this.dbService.updateTableEntry(this.tableEntryToEdit).then(numReplaced => {
        console.log('UPDATED: ', this.tableEntryToEdit.table);
        this.checkAndUpdateTableDef(this.selectedTable.tableName,
          this.tableEntryToEdit.valRange.min, this.tableEntryToEdit.valRange.max);
        this.cancelEdit();
        this.refresh();
      });
    }
  }

  deleteEntry(tableEntry: TableEntry) {
    if (window.confirm('THIS WILL BE IRREVERSIBLE!!!\nAre you sure you want to delete this entry?')) {
      this.dbService.removeTableEntry(tableEntry).then((numRemoved) => {
        this.findRollResult();
      });
    }
  }

  checkAndUpdateTableDef(table: string, min: number, max: number) {
    this.dbService.findTableDef(this.selectedTable.tableName).then((tableDef: TableDef) => {
      let update = false;
      if (min < tableDef.min) {
        tableDef.min = min;
        update = true;
      }
      if (max > tableDef.max) {
        tableDef.max = max;
        update = true;
      }
      console.log('DefToUpdate: ', tableDef);
      if (update) {
        this.dbService.updateTableDefinition(tableDef);
        this.selectedTable = tableDef;
      }
    });
  }

  rowSelected(event: any) {
    this.selectedTable = null;
    this.foundEntries = null;
    this.rollValue = undefined;
    this.cancelEdit();
    this.selectedTable = event.data;
    this.rollValue = event.data.min;
    if (this.selectedTable.description) {
      const length = this.selectedTable.description.length;
      if (length <= this.limitValue || length === 0) {
        this.hideDescription = false;
        this.limitDescription = false;
      } else {
        this.hideDescription = true;
        this.limitDescription = true;
      }
    } else {
      this.hideDescription = false;
      this.limitDescription = false;
    }
  }

  cancelEdit() {
    this.tableEntryToEdit = null;
    this.foundEntries = null;
    this.edit = false;
    this.addNew = false;
    this.entryRange = false;
  }

  refresh() {
    this.dbService.findAllTableNames().then(docs => {
      const data: TableDef[] = docs;
      console.log(data);
      this.source.load(data);
    });
  }

  findRollResult() {
    this.dbService.findDescriptionsAtValue(this.selectedTable.tableName, this.rollValue).then((docs) => {
      this.foundEntries = docs;
    });
  }

  toggleEntryRange() {
    console.log('I am called!!');
    this.entryRange = !this.entryRange;
  }

  clearAll() {
    if (window.confirm('THIS WILL NUKE EVERYTHING!!!\nAre you sure you want to delete EVERYTHING?')) {
      this.dbService.removeAllTableDefs().then(numRemoved => {
        this.dbService.removeAllTableEntries().then((numberRemoved) => {
          this.cancelEdit();
          this.refresh();
        });
      });
    }
  }

  editTableDescription() {
    this.editTableDefDescription = true;
    this.newTableDescription = this.selectedTable.description;
  }

  saveTableDescription() {
    this.editTableDefDescription = false;
    this.selectedTable.description = this.newTableDescription;
    this.dbService.updateTableDefinitionDescription(this.selectedTable).then(() => {
      this.refresh();
    });
  }

  cancelTableDescriptionEdit() {
    this.editTableDefDescription = false;
    this.newTableDescription = '';
  }
}

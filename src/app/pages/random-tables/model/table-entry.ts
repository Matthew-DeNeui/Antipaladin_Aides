import { ValRange } from './value-range';

export class TableEntry {
  table: string;
  valRange: ValRange;
  description: string;
  _id: any;

  constructor(table?: string, valRange?: ValRange, description?: string) {
    table ? this.table = table : this.table = '';
    valRange ? this.valRange = ValRange.copy(valRange) : this.valRange = new ValRange();
    description ? this.description = description : this.description = '';
  }

  static fromJSON(json?): TableEntry {
    const tableEntry = new TableEntry();

    if (json) {
      tableEntry.table = json.table;
      tableEntry.valRange = ValRange.fromJSON(json.valRange);
      tableEntry.description = json.description;
    }

    return tableEntry;
  }

  static copy(te: TableEntry): TableEntry {
    const newTableEntry = new TableEntry(te.table, te.valRange, te.description);
    if (te._id) {
      newTableEntry._id = te._id;
    }

    return newTableEntry;
  }
}

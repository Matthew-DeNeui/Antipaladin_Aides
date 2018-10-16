export class TableDef {
  tableName: string;
  min: number;
  max: number;
  _id: any;

  constructor(tableName?: string, min?: number, max?: number) {
    tableName ? this.tableName = tableName : this.tableName = '';
    min ? this.min = min : this.min = 1;
    max ? this.max = max : this.max = 1;
  }

  static fromJSON(json?): TableDef {
    const tableDef = new TableDef;
    if (json) {
      tableDef.tableName = json.tableName;
      tableDef.min = json.min;
      tableDef.max = json.max;
    }
    return tableDef;
  }

  static copy(td: TableDef): TableDef {
    const newTableDef = new TableDef(td.tableName, td.min, td.max);
    if (td._id) {
      newTableDef._id = td._id;
    }
    return newTableDef;
  }
}

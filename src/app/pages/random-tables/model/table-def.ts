export class TableDef {
  tableName: string;
  description: string;
  min: number;
  max: number;
  _id: any;

  constructor(tableName?: string, min?: number, max?: number, description?: string) {
    tableName ? this.tableName = tableName : this.tableName = '';
    description ? this.description = description : this.description = '';
    min ? this.min = min : this.min = 1;
    max ? this.max = max : this.max = 1;
  }

  static fromJSON(json?): TableDef {
    const tableDef = new TableDef;
    if (json) {
      tableDef.tableName = json.tableName;
      tableDef.description = json.description;
      tableDef.min = json.min;
      tableDef.max = json.max;
    }
    return tableDef;
  }

  static copy(td: TableDef): TableDef {
    const newTableDef = new TableDef(td.tableName, td.min, td.max, td.description);
    if (td._id) {
      newTableDef._id = td._id;
    }
    return newTableDef;
  }
}

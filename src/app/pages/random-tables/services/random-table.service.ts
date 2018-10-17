import { Injectable } from '@angular/core';
import { TableDef, TableEntry, ValRange } from './../model/index';
declare var require: any;
const Datastore = require('nedb');
const dataB = './data/randomtables.db';
const dataC = './data/tableentries.db';

@Injectable({
  providedIn: 'root'
})
export class RandomTableService {
  randomtablesDB: any;
  tableEntriesDB: any;
  constructor() {
    this.randomtablesDB = new Datastore({ filename: dataB, autoload: true });
    this.randomtablesDB.ensureIndex({ fieldName: 'tableName', unique: true });

    this.tableEntriesDB = new Datastore({ filename: dataC, autoload: true });
  }

  findAllTableNames(): Promise<TableDef[]> {
    return new Promise<TableDef[]>((resolve, reject) => {
      this.randomtablesDB.find({ tableName: { $exists: true } }, function(
        err,
        docs
      ) {
        if (err) {
          console.log(`ERROR FINDING TABLE NAMES: `, err);
          reject(`ERROR FINDING TABLE NAMES: ${err}`);
        } else {
          console.log(docs);
          resolve(docs);
        }
      });
    });
  }

  findAllTableNamesNOID(): Promise<TableDef[]> {
    return new Promise<TableDef[]>((resolve, reject) => {
      this.randomtablesDB.find({ tableName: { $exists: true } }, { _id: 0 }, function(
        err,
        docs
      ) {
        if (err) {
          console.log(`ERROR FINDING TABLE NAMES: `, err);
          reject(`ERROR FINDING TABLE NAMES: ${err}`);
        } else {
          console.log(docs);
          resolve(docs);
        }
      });
    });
  }

  findAllTableEntries(table: string): Promise<TableEntry[]> {
    return new Promise<TableEntry[]>((resolve, reject) => {
      this.tableEntriesDB.find({ table: table }, function(err, docs) {
        if (err) {
          console.log(`ERROR FINDING TABLE ENTRIES FROM ${table}: `, err);
          reject(`ERROR FINDING TABLE ENTRIES FROM ${table}: ${err}`);
        } else {
          resolve(docs);
        }
      });
    });
  }

  findAllTableEntriesNOID(table: string): Promise<TableEntry[]> {
    return new Promise<TableEntry[]>((resolve, reject) => {
      this.tableEntriesDB.find({ table: table }, { _id: 0 }, function(err, docs) {
        if (err) {
          console.log(`ERROR FINDING TABLE ENTRIES FROM ${table}: `, err);
          reject(`ERROR FINDING TABLE ENTRIES FROM ${table}: ${err}`);
        } else {
          resolve(docs);
        }
      });
    });
  }

  findAllEntriesFromAllTables(): Promise<TableEntry[]> {
    return new Promise<TableEntry[]>((resolve, reject) => {
      this.tableEntriesDB.find({}, (err, docs) => {
        if (err) {
          console.log(`ERROR FINDING TABLE ENTRIES: `, err);
          reject(`ERROR FINDING TABLE ENTRIES: ${err}`);
        } else {
          resolve(docs);
        }
      });
    });
  }

  findAllEntriesFromAllTablesNOID(): Promise<TableEntry[]> {
    return new Promise<TableEntry[]>((resolve, reject) => {
      this.tableEntriesDB.find({}, { _id: 0 }, (err, docs) => {
        if (err) {
          console.log(`ERROR FINDING TABLE ENTRIES: `, err);
          reject(`ERROR FINDING TABLE ENTRIES: ${err}`);
        } else {
          resolve(docs);
        }
      });
    });
  }

  findTableDef(tableName: string): Promise<TableDef> {
    return new Promise<TableDef>((resolve, reject) => {
      this.randomtablesDB.findOne({ tableName: tableName }, function(err, docs) {
        if (err) {
          console.log(`ERROR FINDING TABLE NAME: `, err);
          reject(`ERROR FINDING TABLE NAME: ${err}`);
        } else {
          resolve(docs);
        }
      });
    });
  }

  findTableDefNOID(tableName: string): Promise<TableDef[]> {
    return new Promise<TableDef[]>((resolve, reject) => {
      this.randomtablesDB.find({ tableName: tableName }, { _id: 0 }, function(err, docs) {
        if (err) {
          console.log(`ERROR FINDING TABLE NAME: `, err);
          reject(`ERROR FINDING TABLE NAME: ${err}`);
        } else {
          resolve(docs);
        }
      });
    });
  }

  findDescriptionsAtValue(table: string, value: number): Promise<TableEntry[]> {
    return new Promise<TableEntry[]>((resolve, reject) => {
      this.tableEntriesDB.find(
        {
          table: table,
          'valRange.min': { $lte: value },
          'valRange.max': { $gte: value }
        },
        (err, docs: TableEntry[]) => {
          if (err) {
            console.log(`ERROR FINDING DESCRIPTION BY VALUE: ${value}: `, err);
            reject(`ERROR FINDING DESCRIPTION BY VALUE: ${value}: ${err}`);
          } else {
            resolve(docs);
          }
        }
      );
    });
  }

  updateTableDefinition(tableDef: TableDef) {
    return new Promise<number>((resolve, reject) => {
      this.randomtablesDB.update(
        { _id: tableDef._id },
        { $set: {min: tableDef.min, max: tableDef.max} },
        function(err, numReplaced, upsert) {
          if (err) {
            console.log(
              `ERROR UPSERTING TABLE DEFINITION: ${tableDef.tableName}: `,
              err
            );
            reject(
              `ERROR UPSERTING TABLE DEFINITION: ${tableDef.tableName}: ${err}`
            );
          } else {
            console.log('UPDATED: ', upsert);
            resolve(numReplaced);
          }
        }
      );
    });
  }

  updateTableDefinitionDescription(tableDef: TableDef) {
    return new Promise<number>((resolve, reject) => {
      this.randomtablesDB.update(
        { _id: tableDef._id },
        { $set: { description: tableDef.description } },
        function(err, numReplaced, upsert) {
          if (err) {
            console.log(
              `ERROR UPSERTING TABLE DEFINITION: ${tableDef.tableName}: `,
              err
            );
            reject(
              `ERROR UPSERTING TABLE DEFINITION: ${tableDef.tableName}: ${err}`
            );
          } else {
            console.log('UPDATED: ', upsert);
            resolve(numReplaced);
          }
        }
      );
    });
  }

  insertTableDefinition(tableDef: TableDef) {
    return new Promise<TableDef>((resolve, reject) => {
      this.randomtablesDB.insert([tableDef], function(
        err,
        numReplaced,
        upsert
      ) {
        if (err) {
          console.log(
            `ERROR UPSERTING TABLE DEFINITION: ${tableDef.tableName}: `,
            err
          );
          reject(
            `ERROR UPSERTING TABLE DEFINITION: ${tableDef.tableName}: ${err}`
          );
        } else {
          console.log(upsert);
          resolve(numReplaced);
        }
      });
    });
  }

  insertAllTableDefinitions(tableDefs: TableDef[]) {
    return new Promise<TableDef>((resolve, reject) => {
      this.randomtablesDB.insert(tableDefs, function(
        err,
        numReplaced,
        upsert
      ) {
        if (err) {
          console.log(
            `ERROR UPSERTING TABLE DEFINITIONS: `,
            err
          );
          reject(
            `ERROR UPSERTING TABLE DEFINITIONS: ${err}`
          );
        } else {
          console.log(upsert);
          resolve(numReplaced);
        }
      });
    });
  }

  updateTableEntry(tableEntry: TableEntry) {
    return new Promise<number>((resolve, reject) => {
      this.tableEntriesDB.update(
        { _id: tableEntry._id },
        {
          $set: {
            valRange: tableEntry.valRange,
            description: tableEntry.description
          }
        },
        function(err, numReplaced) {
          if (err) {
            console.log('ERROR UPDATING TABLE ENTRY: ', err);
            reject('ERROR UPDATING TABLE ENTRY: ' + err);
          } else {
            console.log('Updated Table Entry: ', numReplaced);
            resolve(numReplaced);
          }
        }
      );
    });
  }

  insertTableEntry(tableEntry: TableEntry): Promise<TableEntry> {
    return new Promise<TableEntry>((resolve, reject) => {
      this.tableEntriesDB.insert([tableEntry], (err, newDoc: TableEntry) => {
        if (err) {
          console.log('ERROR INSERTING TABLE ENTRY: ', err);
          reject('ERROR INSERTING TABLE ENTRY: ' + err);
        } else {
          console.log('Added Table Entry: ', newDoc);
          resolve(newDoc);
        }
      });
    });
  }

  insertAllTableEntries(tableEntries: TableEntry[]): Promise<TableEntry> {
    return new Promise<TableEntry>((resolve, reject) => {
      this.tableEntriesDB.insert(tableEntries, (err, newDoc: TableEntry) => {
        if (err) {
          console.log('ERROR INSERTING TABLE ENTRIES: ', err);
          reject('ERROR INSERTING TABLE ENTRIES: ' + err);
        } else {
          console.log('Added Table Entries: ', newDoc);
          resolve(newDoc);
        }
      });
    });
  }

  removeTableEntry(tableEntry: TableEntry): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.tableEntriesDB.remove({ _id: tableEntry._id }, {}, (err, numRemoved) => {
        if (err) {
          console.log(`ERROR REMOVING ${tableEntry.table}: ${err}`);
          reject(`ERROR REMOVING ${tableEntry.table}: ${err}`);
        } else {
          console.log(`REMOVED ${tableEntry.table}`);
          resolve(numRemoved);
        }
      });
    });
  }

  removeTable(tableDef: TableDef): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.removeAllTableEntriesFromTable(tableDef).then((numRemoved) => {
        this.removeTableDef(tableDef).then((shouldBe1) => {
          resolve(numRemoved + shouldBe1);
        });
      });
    });
  }

  removeAllTableEntriesFromTable(tableDef: TableDef): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.tableEntriesDB.remove({ table: tableDef.tableName }, { multi: true }, (err, numRemoved) => {
        if (err) {
          console.log(`ERROR REMOVING ${tableDef.tableName}: ${err}`);
          reject(`ERROR REMOVING ${tableDef.tableName}: ${err}`);
        } else {
          console.log(`REMOVED ${tableDef.tableName}`);
          resolve(numRemoved);
        }
      });
    });
  }

  removeTableDef(tableDef: TableDef): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.randomtablesDB.remove(
        { _id: tableDef._id },
        {},
        (err, numRemoved) => {
          if (err) {
            console.log(`ERROR REMOVING ${tableDef.tableName}: ${err}`);
            reject(`ERROR REMOVING ${tableDef.tableName}: ${err}`);
          } else {
            console.log(`REMOVED ${tableDef.tableName}`);
            resolve(numRemoved);
          }
        }
      );
    });
  }

  removeAllTableDefs(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.randomtablesDB.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
          console.log(`ERROR REMOVING ALL: ${err}`);
          reject(`ERROR REMOVING ALL: ${err}`);
        } else {
          console.log(`REMOVED ALL`);
          resolve(numRemoved);
        }
      });
    });
  }

  removeAllTableEntries(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.tableEntriesDB.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
          console.log(`ERROR REMOVING ALL: ${err}`);
          reject(`ERROR REMOVING ALL: ${err}`);
        } else {
          console.log(`REMOVED ALL`);
          resolve(numRemoved);
        }
      });
    });
  }

  checkAndUpdateTableDef(table: string, min: number, max: number) {
    this.findTableDef(table).then((tableDef: TableDef) => {
      let update = false;
      console.log('Inputs: ', min, ' : ', max);
      console.log('DEF FOUND: ', tableDef);
      console.log(`min(${min}) < tableDef.min(${tableDef.min}): `, min < tableDef.min);
      console.log(`type of min(${typeof min}), typeof tableDef.min(${typeof tableDef.min}): `);
      console.log(`max(${max}) > tableDef.max(${tableDef.max}): `, max > tableDef.max);
      if (min < tableDef.min) {
        tableDef.min = min;
        update = true;
      }
      if (max > tableDef.max) {
        tableDef.max = max;
        console.log('We Here? ', tableDef.max, ' : ', max);
        update = true;
      }
      console.log('DefToUpdate: ', tableDef);
      if (update) {
        this.updateTableDefinition(tableDef);
      }
    });
  }
}

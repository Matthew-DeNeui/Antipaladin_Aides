import { Component, OnInit } from '@angular/core';
import { RandomTableService } from '../services/random-table.service';
import { TableEntry, TableDef } from '../model';

@Component({
  selector: 'ngx-export-import',
  templateUrl: './export-import.component.html',
  styleUrls: ['./export-import.component.scss']
})
export class ExportImportComponent implements OnInit {
  fs: any;
  remote: any;
  mouseoverExport: boolean;
  tableName: string;
  constructor(private dbService: RandomTableService) {
    this.fs = (window as any).fs;
    this.remote = (window as any).remote;
  }

  ngOnInit() {}

  exportTables() {
    this.dbService.findAllTableNamesNOID().then((tableDefs: TableDef[]) => {
      this.dbService.findAllEntriesFromAllTablesNOID().then((entries: TableEntry[]) => {
          let anyArray: any[] = [];
          anyArray = (tableDefs as any[]).concat(entries);
          const content = JSON.stringify(anyArray);

          this.remote.dialog.showSaveDialog(
            {
              title: 'Save Tables',
              defaultPath: 'Tables.json',
              properties: ['openFile', 'openDirectory']
            },
            fileName => {
              if (fileName === undefined) {
                console.log('You didn\'t save the file');
                return;
              }

              // fileName is a string that contains the path and filename created in the save file dialog.
              this.fs.writeFile(fileName, content, err => {
                if (err) {
                  alert('An error ocurred creating the file ' + err.message);
                }

                alert('The file has been succesfully saved');
              });
            }
          );
        });
    });
  }

  importTables() {
    this.remote.dialog.showOpenDialog(fileNames => {
      // fileNames is an array that contains all the selected
      if (fileNames === undefined) {
        console.log('No file selected');
        return;
      }

      console.log(fileNames);

      this.fs.readFile(fileNames[0], 'utf-8', (err, data) => {
        if (err) {
          alert('An error ocurred reading the file :' + err.message);
          return;
        }
        const parsedData = JSON.parse(data);
        const tableEntries: TableEntry[] = [];
        const tableDefs: TableDef[] = [];
        parsedData.forEach(element => {
          if (element.hasOwnProperty('tableName')) {
            tableDefs.push(element);
          } else {
            tableEntries.push(element);
          }
        });
        // Change how to handle the file content
        console.log('tabledefs: ', tableDefs);
        console.log('tableEntries ', tableEntries);

        this.dbService.insertAllTableDefinitions(tableDefs);
        this.dbService.insertAllTableEntries(tableEntries);

        alert('Saving Table(s)');

      });
    });
  }

  exportTable() {
    this.dbService.findTableDefNOID(this.tableName).then((tableDef: TableDef[]) => {
      this.dbService.findAllTableEntriesNOID(this.tableName).then((entries: TableEntry[]) => {
        let anyArray: any[] = tableDef as any[];
        anyArray = anyArray.concat(entries);
        const content = JSON.stringify(anyArray);

        this.remote.dialog.showSaveDialog(
        {
           title: 'Save Table',
          defaultPath: `${this.tableName}.json`,
          properties: ['openFile', 'openDirectory']
        },
        fileName => {
          if (fileName === undefined) {
            console.log('You didn\'t save the file');
            return;
          }

          // fileName is a string that contains the path and filename created in the save file dialog.
          this.fs.writeFile(fileName, content, err => {
             if (err) {
               alert('An error ocurred creating the file ' + err.message);
             }

            alert('The file has been succesfully saved');
           });
          }
        );
      });
    });
  }
}

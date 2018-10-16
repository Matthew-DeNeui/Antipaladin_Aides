import { Component, OnInit } from '@angular/core';
import { DiseaseDBService } from '../services/disease-db.service';
import { Disease } from '../model/disease';

@Component({
  selector: 'ngx-export-import',
  templateUrl: './export-import.component.html',
  styleUrls: ['./export-import.component.scss']
})
export class ExportImportComponent implements OnInit {
  fs: any;
  remote: any;
  diseaseName: string;
  mouseoverExport: boolean;
  constructor(private dbService: DiseaseDBService) {
    this.fs = (window as any).fs;
    this.remote = (window as any).remote;
  }

  ngOnInit() {}

  exportDiseases() {
    this.dbService.findAllNOID().then((docs: Disease[]) => {
      const content = JSON.stringify(docs);

      this.remote.dialog.showSaveDialog(
        {
          title: 'Save Diseases',
          defaultPath: 'diseases.json',
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
  }

  exportDisease() {
    this.dbService.findDiseaseByNameNOID(this.diseaseName).then((docs: Disease[]) => {
      const content = JSON.stringify(docs);

      this.remote.dialog.showSaveDialog(
        {
          title: 'Save Diseases',
          defaultPath: 'diseases.json',
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
  }

  importDiseases() {
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

        const diseases: Disease[] = JSON.parse(data);
        // Change how to handle the file content
        console.log('The file content is : ' + diseases);

        this.dbService.insertAll(diseases);

        alert('Saving Disease(s)');
      });
    });
  }
}

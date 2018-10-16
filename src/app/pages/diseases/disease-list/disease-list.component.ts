import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DiseaseDBService } from '../services/disease-db.service';
import { Disease } from '../model/disease';

@Component({
  selector: 'ngx-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.scss']
})
export class DiseaseListComponent implements OnInit {
  selectedDisease: Disease;
  hideDescription = true;
  edit = false;
  addNew = false;
  diseaseToEdit: Disease;
  settings = {
    add: {
      addButtonContent: `<i class='nb-plus'></i>`
    },
    actions: {
      edit: false
    },
    delete: {
      deleteButtonContent: `<i class='nb-trash'></i>`,
      confirmDelete: true
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string'
      },
      level: {
        title: 'Level',
        type: 'number'
      },
      save: {
        title: 'Save',
        type: 'string'
      },
      onset: {
        title: 'Onset',
        type: 'string'
      },
      frequency: {
        title: 'Frequency',
        type: 'string'
      }
    },
    mode: 'external'
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private dbService: DiseaseDBService) {}

  ngOnInit() {
    this.hideDescription = true;
    this.cancelEdit();
    this.refresh();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.dbService.remove(event.data).then(numRemoved => {
        this.selectedDisease = null;
        this.cancelEdit();
        this.refresh();
      });
    }
  }

  rowSelected(event: any) {
    this.cancelEdit();
    this.dbService.findDiseaseByName(event.data.name).then(doc => {
      this.selectedDisease = doc[0];
      this.hideDescription = true;
    });
  }

  newDisease() {
    this.diseaseToEdit = new Disease();
    this.addNew = true;
    this.edit = true;
  }

  editDisease() {
    this.diseaseToEdit = Disease.copy(this.selectedDisease);
    this.edit = true;
  }

  cancelEdit() {
    this.diseaseToEdit = null;
    this.edit = false;
    this.addNew = false;
  }

  saveDisease() {
    if (this.addNew) {
      this.dbService.insert(this.diseaseToEdit).then(doc => {
        console.log('ADDED: ', doc.name);
        this.selectedDisease = doc;
        this.cancelEdit();
        this.refresh();
      });
    } else {
      this.dbService.update(this.diseaseToEdit).then(numReplaced => {
        console.log('UPDATED: ', this.diseaseToEdit.name);
        this.selectedDisease = this.diseaseToEdit;
        this.cancelEdit();
        this.refresh();
      });
    }
  }

  refresh() {
    this.dbService.findAllNoDescriptions().then(docs => {
      const data: Disease[] = docs;
      this.source.load(data);
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Disease } from './../model/disease';

@Component({
  selector: 'ngx-disease-entry',
  templateUrl: './disease-entry.component.html',
  styleUrls: ['./disease-entry.component.scss']
})
export class DiseaseEntryComponent implements OnInit {
  @Input() disease: Disease;
  hideDescription = true;
  limitDescription: boolean;
  limitValue = 140;

  constructor() { }

  ngOnInit() {
    if (this.disease.description.length < this.limitValue) {
      this.hideDescription = false;
      this.limitDescription = false;
    } else {
      this.hideDescription = true;
      this.limitDescription = true;
    }
  }

}

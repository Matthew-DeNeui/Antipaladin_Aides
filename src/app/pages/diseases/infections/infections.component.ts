import { Component, OnInit } from '@angular/core';
import { Disease } from '../model/disease';
import { SelectDiseasesService } from './select-diseases.service';

@Component({
  selector: 'ngx-infections',
  templateUrl: './infections.component.html',
  styleUrls: ['./infections.component.scss']
})
export class InfectionsComponent implements OnInit {
  antPalLevel: string;
  diseaseNum: string;
  selectedDiseases: Disease[];
  mouseoverInfection: boolean;

  constructor(private selector: SelectDiseasesService) {}

  ngOnInit() {
    this.antPalLevel = '1';
    this.diseaseNum = '1';
  }

  infectAntipaladin(formValues) {
      this.selector
        .selectDiseases(this.antPalLevel, this.diseaseNum)
        .then(docs => {
          this.selectedDiseases = docs;
          console.log(docs);
        });
      /* .then(selectedDiseases => {
        console.log(
          'Returned:::::::::::::::::::::::::::::::::::::::::::\n',
          selectedDiseases.length
        );
        selectedDiseases.forEach(disease => {
          console.log(`Found at level ${disease.level}: `, disease.name);
        });
      }); */
  }
}

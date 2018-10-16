import { Injectable } from '@angular/core';
import { DiseaseDBService } from '../services/disease-db.service';
import { Disease } from '../model/disease';

@Injectable({
  providedIn: 'root'
})
export class SelectDiseasesService {
  constructor(private diseaseDB: DiseaseDBService) {}

  compareDiseaseNames(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  compareDiseaseLevels(a, b) {
    if (a.level < b.level) {
      return 1;
    }
    if (a.level > b.level) {
      return -1;
    }
    return this.compareDiseaseNames(a, b);
  }

  selectDiseases(maxLevel: string, diseaseNum: string): Promise<Disease[]> {
    const level = parseInt(maxLevel, 10);
    let number = parseInt(diseaseNum, 10);

    return new Promise<Disease[]>(resolve => {
      this.diseaseDB.findDiseaseNamesByLevel(level).then((names: string[]) => {
        const selectedDiseaseNames = [];
        let namesLength = names.length;
        if (number > namesLength) {
          number = namesLength;
        }

        let diseaseIndex;
        for (let di = number; di > 0; di--) {
          diseaseIndex = Math.floor(Math.random() * namesLength);
          selectedDiseaseNames.push(names[diseaseIndex]);
          names.splice(diseaseIndex, 1);
          namesLength--;
        }

        console.log(selectedDiseaseNames);

        this.diseaseDB.findDiseasesByNames(selectedDiseaseNames).then((docs: Disease[]) => {
          console.log('DOCS FOUND:::::::::::::::::::::::::::::::::\n', docs);
          resolve(docs);
        });
      });
    });
  }
}

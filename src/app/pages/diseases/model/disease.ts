
export class Disease {
  name: string;
  level: number;
  onset: string;
  frequency: string;
  save: string;
  description: string;
  _id: any;

  constructor(name?: string, level?: number, onset?: string, frequency?: string, save?: string, description?: string) {
    name ? this.name = name : this.name = '';
    level ? this.level = level : this.level = 1;
    onset ? this.onset = onset : this.onset = '';
    frequency ? this.frequency = frequency : this.frequency = '';
    save ? this.save = save : this.save = '';
    description ? this.description = description : this.description = '';
  }

  static fromJson(json?): Disease {
    // tslint:disable-next-line:prefer-const
    let disease = new Disease();
    if (json) {
      disease.name = json.name;
      disease.level = json.level;
      disease.onset = json.onset;
      disease.frequency = json.frequency;
      disease.save = json.save;
      disease.description = json.description;
    } else {
      disease.name = '';
      disease.level = 1;
      disease.onset = '';
      disease.frequency = '';
      disease.save = '';
      disease.description = '';
    }
    return disease;
  }

  static copy(disease: Disease): Disease {
    const newDisease = new Disease(disease.name, disease.level, disease.frequency, disease.onset, disease.save, disease.description);
    if (disease._id) {
      newDisease._id = disease._id;
    }
    return newDisease;
  }
}

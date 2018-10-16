export class ValRange {
  min: number;
  max: number;

  constructor(min?: number, max?: number) {
    min ? this.min = min : this.min = 1;
    max ? this.max = max : this.max = 1;
  }

  static fromJSON(json?): ValRange {
    if (json) {
      return new ValRange(json.min, json.max);
    }
    return new ValRange();
  }

  static copy(valRange: ValRange): ValRange {
    return new ValRange(valRange.min, valRange.max);
  }
}

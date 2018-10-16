import { Component, OnInit, Input } from '@angular/core';
import { TableEntry } from '../model';

@Component({
  selector: 'ngx-table-result',
  templateUrl: './table-result.component.html',
  styleUrls: ['./table-result.component.scss']
})
export class TableResultComponent implements OnInit {
  @Input() entry: TableEntry;
  hideDescription: boolean;
  limitDescription: boolean;
  limitValue = 140;

  constructor() { }

  ngOnInit() {
    if (this.entry.description.length < this.limitValue) {
      this.hideDescription = false;
      this.limitDescription = false;
    } else {
      this.hideDescription = true;
      this.limitDescription = true;
    }
  }

}

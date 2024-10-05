import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { Field } from '../model/Field';
import { RendererUtPipe } from '../renderer-ut.pipe';

@Component({
  selector: 'lib-table',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, RendererUtPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  @Input() gtColumnList: Field[] = [];
  @Input() rowData: any[] = [];
  @Input() itemPerPage: number = 10;
  @Input() tableHeight: number = 150;
  @Input() showCheckBox: boolean = false;
  @Input() headerColor = "#fff";
  @Input() headerBg = "#0092F7";

  @Output() onChecked = new EventEmitter<any>();
  page: number = 1;

  selectAll: boolean = false;

  constructor() { }
  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.convertDot2Values();
  }
  convertDot2Values() {
    for (let col of this.gtColumnList) {
      col.size = col.checked == false ? 0 : col.size;
      if (col.field.includes('.')) {
        col.field.split('.').forEach((key: any, index: number) => {
          col['field' + index] = key;
        })
      }
    }
  }
  checkAll() {
    for (let row of this.rowData) {
      row.checked = this.selectAll;
    }
    this.onCheckRow();
  }
  onCheckRow() {
    this.onChecked.emit(this.rowData.filter(x => x.checked));
  }

}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { Field } from '../model/Field';
import { RendererUtPipe } from '../renderer-ut.pipe';
import { UniversalPipe } from '../universal.pipe';

@Component({
  selector: 'lib-table',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, RendererUtPipe, UniversalPipe],
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
  @Input() scrollable = true;
  @Input() dataRenderingLocal: boolean = true; // New input for controlling sorting

  @Output() onSortChanged = new EventEmitter<{ field: string, direction: boolean }>();
  @Output() onChecked = new EventEmitter<any>();
  page: number = 1;
  sortField: string = '';
  sortDirection: boolean = false;
  selectAll: boolean = false;

  constructor() { }
  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.convertDot2Values();
  }
  convertDot2Values() {
    for (let col of this.gtColumnList) {
      col.size = col.showColumn == false ? 0 : col.size;
      col.sizeP = col.showColumn == false ? 0 : col.sizeP;
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

  onSort(field: string) {
    this.page = 1;
    if (this.sortField === field) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortField = field;
      this.sortDirection = true;
    }
    
    this.onSortChanged.emit({ field: this.sortField, direction: this.sortDirection });
  }


 
  

}

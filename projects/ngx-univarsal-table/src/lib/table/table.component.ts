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
  @Input() selfApplied: boolean = true; // New input for controlling sorting

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
    
    if (this.selfApplied) {
      this.sorting(this.rowData, this.sortField, this.sortDirection);
    } else {
      this.onSortChanged.emit({ field: this.sortField, direction: this.sortDirection });
    }
  }


  sorting(arr: any[], value: string, reverse?: boolean) {
    if (arr == null) {
      arr = [];
    }
  
    const getValue = (obj: any, path: string) => {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };
  
    try {
      arr.sort((a, b) => {
        let valueA = getValue(a, value);
        let valueB = getValue(b, value);
  
        // Handle date comparison (if it's a timestamp in seconds)
        if (valueA && valueA.seconds) {
          valueA = new Date(valueA.seconds * 1000).getTime();
        }
        if (valueB && valueB.seconds) {
          valueB = new Date(valueB.seconds * 1000).getTime();
        }
  
        // Handle null or undefined values
        if (valueA == null) valueA = '';
        if (valueB == null) valueB = '';
  
        // If both are numbers, sort numerically
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return reverse ? valueB - valueA : valueA - valueB;
        }
  
        // If both are strings, sort alphabetically
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return reverse ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
        }
  
        // If types are mixed, convert both to strings and compare
        return reverse ? valueB.toString().localeCompare(valueA.toString()) : valueA.toString().localeCompare(valueB.toString());
      });
    } catch (error) {
      console.log("Error in sorting: " + error);
    }
  }
  

}

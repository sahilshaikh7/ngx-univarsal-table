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

  resizingColumnIndex: number | null = null;
  initialX: number = 0;
  initialWidth: number = 0;
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

  startResizeColumn(event: MouseEvent, columnIndex: number): void {
    this.resizingColumnIndex = columnIndex;
    this.initialX = event.pageX;
    this.initialWidth = this.gtColumnList[columnIndex].size;

    // Add listeners for mouse move and mouse up for resizing
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (moveEvent: MouseEvent): void => {
    if (this.resizingColumnIndex !== null) {
      const deltaX = moveEvent.pageX - this.initialX;
      const newWidth = this.initialWidth + deltaX;

      // Ensure a minimum width to prevent columns from shrinking too much
      if (newWidth > 50) {
        this.gtColumnList[this.resizingColumnIndex].size = newWidth;
      }

      // Prevent text selection during resize
      moveEvent.preventDefault();
    }
  };

  onMouseUp = (): void => {
    // Remove event listeners once resizing is done
    this.resizingColumnIndex = null;
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  };
 
  

}

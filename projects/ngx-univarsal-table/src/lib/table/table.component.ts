import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
  @ViewChild('mainTable', { static: false }) mainTable!: ElementRef;
  @ViewChild('popover', { static: false }) popover!: ElementRef;
  @Input() gtColumnList: Field[] = [];
  @Input() rowData: any[] = [];
  @Input() itemPerPage: number = 10;
  @Input() tableHeight: number = 150;
  @Input() showCheckBox: boolean = false;
  @Input() showFiledBox: boolean = false;
  @Input() headerColor = "#fff";
  @Input() headerBg = "#0092F7";
  @Input() scrollable = true;
  @Input() dataRenderingLocal: boolean = true;
  @Input() onFieldCheckboxChange  :any;
  @Output() onSortChanged = new EventEmitter<{ field: string, direction: boolean }>();
  @Output() onChecked = new EventEmitter<any>();
  page: number = 1;
  sortField: string = '';
  sortDirection: boolean = false;
  selectAll: boolean = false;
  removedColumns: Field[] = [];
  initialWidth: number = 0;
  isResizing = false;
  currentColumnIndex: number | null = null;
  draggedColumnIndex: number | null = null;
  startX = 0;
  activePopover: Field | null = null;
  pinnedColumns: Field[] = [];
  isPopoverLeftAligned: boolean = false;
  isDesktopView: boolean = true;
  constructor() { }
  ngOnInit() {
    this.checkView();
    this.gtColumnList = this.gtColumnList.map(field => ({
      ...field,
      size: field.size || 50
    }));
    this.setBackgroundColor(this.headerBg, this.headerColor);
   
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkView();
  }
  checkView() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.isDesktopView = width > height; 
  }
  setBackgroundColor(color1: string, color2: string) {
    document.documentElement.style.setProperty('--bg-color', color1);
    document.documentElement.style.setProperty('--color', color2);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['onFieldCheckboxChange'] && this.onFieldCheckboxChange) {
      this.gtColumnList.forEach(col => {
        if (col.field === this.onFieldCheckboxChange.field) {
          col.showColumn = this.onFieldCheckboxChange.showColumn;
        }
      });
    }
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
    event.preventDefault();
    this.isResizing = true;
    this.currentColumnIndex = columnIndex;
    this.startX = event.clientX;
    this.initialWidth = this.gtColumnList[columnIndex].size;

    document.addEventListener('mousemove', this.resizeColumn);
    document.addEventListener('mouseup', this.stopResizeColumn);
  }

  resizeColumn = (event: MouseEvent): void => {
    if (this.isResizing && this.currentColumnIndex !== null) {
      const dx = event.clientX - this.startX;
      const newWidth = this.initialWidth + dx;

      if (newWidth > 50) {
        this.gtColumnList[this.currentColumnIndex].size = newWidth;

        if (this.currentColumnIndex === this.gtColumnList.length - 1) {
          this.mainTable.nativeElement.style.width = this.calculateTableWidth() + 'px';
        }
      }
    }
  };

  stopResizeColumn = (): void => {
    this.isResizing = false;
    this.currentColumnIndex = null;
    document.removeEventListener('mousemove', this.resizeColumn);
    document.removeEventListener('mouseup', this.stopResizeColumn);
  };

  calculateTableWidth(): number {
    return this.gtColumnList.reduce((totalWidth, column) => totalWidth + column.size, 0);
  }

  onDragStart(event: DragEvent, columnIndex: number): void {
    this.draggedColumnIndex = columnIndex;
    event.dataTransfer?.setData('text', columnIndex.toString());
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent, targetIndex: number): void {
    event.preventDefault();
    const sourceIndex = this.draggedColumnIndex;
    this.draggedColumnIndex = null;

    if (sourceIndex !== null && sourceIndex !== targetIndex) {
      const movedColumn = this.gtColumnList[sourceIndex];
      this.gtColumnList.splice(sourceIndex, 1);
      this.gtColumnList.splice(targetIndex, 0, movedColumn);
    }
  }

  removeColumn(column: Field): void {
    this.activePopover = null
    this.gtColumnList.filter(col => {
      if (col.field == column.field) {
        col.showColumn = column.showColumn;
      }
    })
    column.showColumn = false;
    this.removedColumns.push(column);
  }

  restoreColumn(column: Field): void {
    column.showColumn = true;
    const index = this.removedColumns.indexOf(column);
    if (index > -1) {
      this.removedColumns.splice(index, 1);
    }
  }
  togglePopover(header: Field): void {
    this.activePopover = this.activePopover === header ? null : header;
    const index = this.gtColumnList.findIndex(col => col === header);
    this.isPopoverLeftAligned = index >= this.gtColumnList.length - 2;
  }


}

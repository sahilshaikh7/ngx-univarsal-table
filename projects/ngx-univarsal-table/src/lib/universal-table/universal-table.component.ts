import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { TableComponent } from '../table/table.component';
import { FormsModule } from '@angular/forms';
import { LocalFilterService } from './local-filter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-universal-table',
  standalone: true,
  imports: [TableComponent, FilterComponent, FormsModule, CommonModule],
  templateUrl: './universal-table.component.html',
  styleUrl: './universal-table.component.css'
})
export class UniversalTableComponent {
  @Input() mobileView: boolean = false;
  @Input() leftPosition: string = '0px';
  @Input() rowData: any[] = [];
  @Input() headerBg: string = '#826149';
  @Input() headerColor: string = '#fff';
  @Input() showCheckBox: boolean = false;
  @Input() itemPerPage: number = 15;
  @Input() tableHeight: number;
  @Input() scrollable: boolean = false;
  @Input() gtColumnList: any[] = [];
  @Input() dataRenderingLocal: boolean = false;
  @Output() filterApplied = new EventEmitter<any>();
  @Output() onSortChanged = new EventEmitter<{ field: string, direction: boolean }>();
  @Output() onChecked = new EventEmitter<any>();
  @Output() onSearched = new EventEmitter<any>();
  filteredRowData: any[] = [];
  search: string = '';
  selectedField: {};
  sortingObject: {};
  selectedFieldHeader: string = '';
  searchableColumns: any[] = [];
  dropdownOpen: boolean = false;
  constructor(private filterService: LocalFilterService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchableColumns = this.gtColumnList.filter(column => column.searchable);
    if (this.searchableColumns.length > 0) {
      this.selectedFieldHeader = this.searchableColumns[0].header;
      this.selectedField = this.searchableColumns[0].field;
    }
    this.filteredRowData = [...this.rowData];

  }
 async applyFilter(event: any) {
    console.log('Filter applied', event);
    console.log('gtColumn', this.gtColumnList);
    if (this.dataRenderingLocal) {
      this.filteredRowData = await this.filterService.rendering( this.search, this.selectedField, this.sortingObject ,this.gtColumnList, this.rowData);
    } else {
      this.filterApplied.emit(this.gtColumnList);
    }

  }

async  sortChanged(event: any) {
    console.log('Sort changed', event);
    this.sortingObject = event;
    if (this.dataRenderingLocal) {
      this.filteredRowData = await this.filterService.rendering(this.search, this.selectedField, this.sortingObject ,this.gtColumnList, this.rowData);
    } else {
      this.onSortChanged.emit(event);
    }
  }
async  applySearch(): Promise<void> {
    if (this.dataRenderingLocal) {
      this.filteredRowData = await this.filterService.rendering(this.search, this.selectedField, this.sortingObject ,this.gtColumnList, this.rowData);
    } else {
      this.onSearched.emit({ field: this.selectedFieldHeader, search: this.search });
    }
  }
  selectField(col: any) {
    this.dropdownOpen = false;
    this.selectedFieldHeader = col.header;
    this.selectedField = col.field;
    console.log(this.dropdownOpen)
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'lib-universal-table',
  standalone: true,
  imports: [TableComponent,FilterComponent],
  templateUrl: './universal-table.component.html',
  styleUrl: './universal-table.component.css'
})
export class UniversalTableComponent {
  @Input() mobileView: boolean = false;
  @Input() filterData: any[] = [];
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


  // Example methods to handle outputs
  applyFilter(event: any) {
    console.log('Filter applied', event);
    this.filterApplied.emit(event);

  }

  sortChanged(event: any) {
    console.log('Sort changed', event);
    this.onSortChanged.emit(event);

  }
}

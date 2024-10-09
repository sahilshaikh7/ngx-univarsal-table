import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { TableComponent } from '../table/table.component';
import { FormsModule } from '@angular/forms';
import { LocalFilterService } from './local-filter.service';

@Component({
  selector: 'lib-universal-table',
  standalone: true,
  imports: [TableComponent, FilterComponent, FormsModule],
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
  filteredRowData: any[] = [];

  constructor(private filterService: LocalFilterService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredRowData = [...this.rowData];
  }
  applyFilter(event: any) {
    console.log('Filter applied', event);
    console.log('gtColumn' , this.gtColumnList);
    if (this.dataRenderingLocal) {
      this.filteredRowData = this.filterService.rendering(this.gtColumnList, this.rowData);
    } else {
      this.filterApplied.emit(event);
    }

  }

  sortChanged(event: any) {
    console.log('Sort changed', event);
    console.log('gtColumn' , this.gtColumnList);
    if (this.dataRenderingLocal) {
      this.filteredRowData = this.filterService.rendering(this.gtColumnList, this.rowData);
    } else {
      this.onSortChanged.emit(event);
    }
  }
}

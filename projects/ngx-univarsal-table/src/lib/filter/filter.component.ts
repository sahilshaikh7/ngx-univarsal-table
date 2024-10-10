import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Input() mobileView: boolean = false;
  @Input() columnList: any[] = [];
  @Input() leftPosition: string = '0px';
  @Output() filterApplied = new EventEmitter<any>();

  filterPopup: boolean = false;
  selectedFields: any = {};
  search: string = '';
  activeNavButton: string = '';
  filterOneTime: boolean = true;
  // Modified to track date ranges per field
  dateRange: { [key: string]: { start: string; end: string } } = {};
  activeDateField: string = '';
  startDateFocused: boolean = false;
  endDateFocused: boolean = false;
  startDateType: string = 'text';
  endDateType: string = 'text';
  constructor() { }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {


  }
  openFilter() {
    if (this.filterOneTime) {
      this.filterOneTime = false;
      let selectFirstOne = false;
      console.log(this.columnList)
      this.columnList.forEach(col => {
        if (col.filterList && col.filterList.length > 0) {
          col.selectedFilterList = [];
          if (!selectFirstOne) {
            this.activeNavButton = col.header;
            selectFirstOne = true;
            col.selectedFilter = true;
          } else {
            col.selectedFilter = false;
          }
          col.filterList.forEach(item => {
            col.selectedFilterList.push({ item: item, checked: false })

          });
        }
        if (col.fieldType == 'date') {
          col.selectedFilter = false;
        }
      });
    }
    this.filterPopup = !this.filterPopup
  }


  clearAllFilter() {
    this.selectedFields = {};
    if (this.activeDateField && this.dateRange[this.activeDateField]) {
      this.startDateType = 'text';
      this.endDateType = 'text';
      this.dateRange[this.activeDateField].start = '';
      this.dateRange[this.activeDateField].end = '';
    }
    this.columnList.forEach(col => {
      col.filteredValue = [];
      col.selectedFilterList?.forEach((item: any) => {
        item.checked = false;
      });
    });
    this.search = '';
  }

  addFiltered(selectedColumn: any) {
    this.columnList.forEach(col => {
      col.selectedFilter = false;
    });
    this.activeNavButton = selectedColumn.header;
    selectedColumn.selectedFilter = true;
    console.log(this.activeNavButton)
  }
  setActiveDateField(field: string) {
    console.log(field)
    this.activeDateField = field;
    if (!this.dateRange[field]) {
      this.dateRange[field] = { start: '', end: '' };
    }
  }

  filterCount() {
    let count = 0;
    this.columnList.forEach(item => {
      if (item.fieldType === 'date') {
        if (this.dateRange[item.field]?.start && this.dateRange[item.field]?.end) {
          count += 1; // Count if the date range is set
        }
      } else {
        item.selectedFilterList?.forEach((type: any) => {
          count += type.checked ? 1 : 0;
        });
      }
    });
    return count;
  }

  selectAllClicked(col, event: any) {
    col.selectedFilterList.forEach(element => {
      element.checked = event.target.checked;
    });
  }

  applyFilter() {
    this.columnList.forEach(item => {
      item.filteredValue = item.filteredValue ?? [];
      if (item.fieldType === 'date' && this.dateRange[item.field]?.start && this.dateRange[item.field]?.end) {
        item.filteredValue.push([
          new Date(this.dateRange[item.field].start),
          new Date(this.dateRange[item.field].end),
        ]);
      } else if (item.selectedFilterList && item.selectedFilterList.length > 0) {
        if (this.selectedFields[item.header]?.length == 0) {
          this.selectedFields[item.header] = [];
        }
        this.selectedFields[item.header] = [];
        for (let value of item.selectedFilterList) {
          if (value.checked) {
            item.filteredValue.push(value.item);
            this.selectedFields[item.header].push(value.item);
          }
        }
      }
    });
    this.filterApplied.emit(this.columnList);
    this.filterPopup = false;
  }
  onStartDateFocus() {
    this.startDateType = 'date';
    this.startDateFocused = true;
  }

  onStartDateBlur() {
    this.startDateFocused = false;
    if (!this.dateRange[this.activeDateField]?.start) {
      this.startDateType = 'text';
    }
  }

  onEndDateFocus() {
    this.endDateType = 'date';
    this.endDateFocused = true;
  }

  onEndDateBlur() {
    this.endDateFocused = false;
    if (!this.dateRange[this.activeDateField]?.end) {
      this.endDateType = 'text';
    }
  }
  openDatePicker(inputId: string) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  }
}

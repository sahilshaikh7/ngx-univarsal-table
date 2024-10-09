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
  @Output() filterApplied = new EventEmitter<any>(); // Emit the filter data to parent

  filterPopup: boolean = false;
  selectedFields: any = {};
  filteredValue: any = {};
  activeFilter: any;
  activeNavButton: string = '';
  filterBy: string = '';
  filteredList: any[] = [];
  search: string = '';
  filterOneTime: boolean = true;
  searchedBy = '';
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
    let selectFirstOne = false;
    console.log(this.columnList)
    this.columnList.forEach(col => {
      if (col.filterList && col.filterList.length > 0) {
        col.selectedFilterList = [];
        if (!selectFirstOne) {
          selectFirstOne = true;
          col.selectedFilter = true;
        }else{
          col.selectedFilter = false;
        }
        col.filterList.forEach(item => {
          col.selectedFilterList.push({ item: item, checked: false })

        });
      }
    });
    console.log(this.columnList)
    
  }



  clearAllFilter() {
    this.selectedFields = {};
    if (this.activeDateField && this.dateRange[this.activeDateField]) {
      this.startDateType = 'text';
      this.endDateType = 'text';
      this.dateRange[this.activeDateField].start = '';
      this.dateRange[this.activeDateField].end = '';
    }
    Object.keys(this.filteredValue).forEach(key => {
      if (Array.isArray(this.filteredValue[key])) {
        this.filteredValue[key].forEach(item => {
          item.checked = false;
        });
      } else if (typeof this.filteredValue[key] === 'boolean') {
        this.filteredValue[key] = false;
      }
    });

    this.filteredValue[`${this.filterBy}_select_all`] = false;

    this.search = '';
  }

  addFiltered(selectedColumn: any) {
    this.columnList.forEach(col => {
      col.selectedFilter = false;
    });
    selectedColumn.selectedFilter = true;
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
        this.filteredValue[item.header]?.forEach((type: any) => {
          count += type.checked ? 1 : 0;
        });
      }
    });
    return count;
  }



  // Select all items
  selectAllClicked(col, event: any) {
    console.log(event)
    col.selectedFilterList.forEach(element => {
      element.checked = event.target.checked;
    });
  }

  // Check if all items are selected
  checkSelectAll(clicked_index: number) {
    let temp = 0;
    const clickedItem = this.filteredValue[this.filterBy]?.[clicked_index];
    if (clickedItem) {
      const clicked_value = !clickedItem.checked;

      this.filteredValue[this.filterBy].forEach((item: { checked: any; }, index: number) => {
        if (index !== clicked_index) {
          temp += item.checked ? 1 : 0;
        } else {
          temp += clicked_value ? 1 : 0;
        }
      });

      this.filteredValue[`${this.filterBy}_select_all`] = temp === this.filteredValue[this.filterBy].length;
    }
  }

  applyFilter() {

    this.columnList.forEach(item => {
      item.filteredValue = item.filteredValue ?? [];
      if (item.fieldType === 'date' && this.dateRange[item.field]?.start && this.dateRange[item.field]?.end) {
        item.filteredValue.push([
          new Date(this.dateRange[item.field].start),
          new Date(this.dateRange[item.field].end),
        ]);
      } else {
        for (let i = 0; i < item.filterList.length; i++) {
          if (this.filteredValue[item.header][i].checked) {
            item.filteredValue.push(item.filterList[i]);
          }
        }
      }
    });

    this.selectedFields = this.columnList;
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

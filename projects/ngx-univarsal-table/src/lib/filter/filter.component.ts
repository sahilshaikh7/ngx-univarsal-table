import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() filterData: any[] = [];
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


  openFilterPopup() {
    if (this.filterOneTime) {
      this.openFilterOneTime();
      this.filteredValue = {};

      this.filterData = this.filterData.filter(filter => filter.filterList);

      this.filterData.forEach(filter => {
        if (filter.filterList?.length > 0) {
          this.filteredValue[filter.header] = (filter.filterList || []).map((item: any) => ({
            ...item,
            checked: false
          }));
        }
        this.filteredValue[`${filter.header}_select_all`] = false;
      });
    }

    if (this.filterData.length > 0) {
      this.filteredList = this.filterData[0].filterList;
      this.filterBy = this.activeNavButton = this.filterData[0].header;
    }

    this.filterPopup = !this.filterPopup;
    this.searchedBy = `Search by ${this.filterData[0]?.header || 'default'}`;
  }
  openFilterOneTime() {
    if (this.filterOneTime) {
      this.filterOneTime = false;
      this.clearAllFilter();
    }
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

  addFiltered(item: any) {
    if (item.filterList) {
      this.activeFilter = item;
      this.filteredList = item.filterList;  
      this.activeNavButton = item.header;
      this.filterBy = item.header;
      this.searchedBy = `Search by ${this.filterBy}`;
      
      if (item.fieldType === 'date') {
        this.setActiveDateField(item.field); 
      }
    }
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
    this.filterData.forEach(item => {
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

  // New method for searching within the filtered list
  get filteredAndSearchedList() {
    if (!this.search) {
      return this.filteredList;
    }
    return this.filteredList.filter(item => item.toLowerCase().includes(this.search.toLowerCase()));
  }

  // Select all items
  selectAllClicked() {
    const selectAll = this.filteredValue[this.filterBy + '_select_all'];
    this.filteredValue[this.filterBy].forEach((item: { checked: any; }) => item.checked = selectAll);
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
    const params: any = {};

    this.filterData.forEach(item => {
      if (!(item.header in params)) {
        params[item.header] = [];
      }

      if (item.fieldType === 'date' && this.dateRange[item.field]?.start && this.dateRange[item.field]?.end) {
        params[item.header] = [
          new Date(this.dateRange[item.field].start),
          new Date(this.dateRange[item.field].end),
        ];
      } else {
        for (let i = 0; i < item.filterList.length; i++) {
          if (this.filteredValue[item.header][i].checked) {
            params[item.header].push(item.filterList[i]);
          }
        }
      }
    });

    this.selectedFields = params;
    this.filterApplied.emit(params);
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

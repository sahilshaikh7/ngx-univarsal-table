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
      this.filterData.filter(x=> x.filterList);
      this.filterData.forEach(filter => {
        if(filter.filterList?.length > 0){   
          this.filteredValue[filter.header] = (filter.filterList || []).map((item: any) => ({
            ...item,
            checked: false 
          }));
        }
        this.filteredValue[`${filter.header}_select_all`] = false; // Initialize select all checkbox
      });
    }
    this.filterPopup = !this.filterPopup;
    if (this.filterData.length > 0) {
      this.filteredList = this.filterData[0].filterList;  // Initialize filteredList with the first filter's list
      this.filterBy = this.activeNavButton = this.filterData[0].header;
    }
    this.searchedBy = `Search by ${this.filterData[0]?.header || 'default'}`;
    console.log(this.filteredValue)
    console.log(this.filteredList)
    console.log(this.filterData)
  }
  openFilterOneTime() {
    if (this.filterOneTime) {
      this.filterOneTime = false;
      this.clearAllFilter();
    }
  }
  clearAllFilter() {
    this.selectedFields = {};
    this.dateRange = {};
    Object.keys(this.filteredValue).forEach(key => {
      if (Array.isArray(this.filteredValue[key])) {
        this.filteredValue[key].forEach(item => {
          item.checked = false;
        });
      } else if (typeof this.filteredValue[key] === 'boolean') {
        this.filteredValue[key] = false; // Reset the 'select all' checkbox
      }
    });

    this.filteredValue[`${this.filterBy}_select_all`] = false;

    this.search = '';
  }

  addFiltered(item: any) {
    this.activeFilter = item;
    this.filteredList = item.filterList;  // Set filteredList based on selected filter
    this.activeNavButton = item.header;
    this.filterBy = item.header;
    this.searchedBy = `Search by ${this.filterBy}`;
    if (item.type == 'date') {
      this.setActiveDateField(item.header); // Set the active date field when adding a date filter
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
      if (item.type === 'date') {
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

      // Handling the date filter for each field independently
      if (item.type === 'date' && this.dateRange[item.field]?.start && this.dateRange[item.field]?.end) {
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
  onStartDateBlur() {
    this.startDateFocused = !this.dateRange[this.activeDateField]?.start;
    if (!this.dateRange[this.activeDateField]?.start) {
      this.startDateType = 'text';
    }
  }

  onEndDateBlur() {
    this.endDateFocused = !this.dateRange[this.activeDateField]?.end;
    if (!this.dateRange[this.activeDateField]?.end) {
      this.endDateType = 'text';
    }
  }
  onStartDateFocus() {
    this.startDateType = 'date'; // Change input type to 'date' for correct input
  }

  // Handle focus on end date input for the active date field
  onEndDateFocus() {
    this.endDateType = 'date'; // Change input type to 'date' for correct input
  }
  openDatePicker(inputId: string) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  }
}

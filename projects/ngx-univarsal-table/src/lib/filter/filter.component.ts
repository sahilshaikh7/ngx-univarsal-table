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
  search: string = '';  // Search input value
  dateRangeStartBid: Date | null = null;
  dateRangeEndBid: Date | null = null;
  dateRangeStartModified: Date | null = null;
  dateRangeEndModified: Date | null = null;
  filterOneTime: boolean = true;
  searchedBy = '';

  constructor() { }

  ngOnInit() {
  }
  openFilterPopup() {
    if (this.filterOneTime) {
      this.openFilterOneTime();
      this.filteredValue = {};
      this.filterData.forEach(filter => {
        this.filteredValue[filter.text] = (filter.list || []).map((item: any) => ({
          ...item,
          checked: false // Default value for checked
        }));
        this.filteredValue[`${filter.text}_select_all`] = false; // Initialize select all checkbox
      });
    }
    this.filterPopup = !this.filterPopup;
    if (this.filterData.length > 0) {
      this.filteredList = this.filterData[0].list;  // Initialize filteredList with the first filter's list
      this.filterBy = this.activeNavButton = this.filterData[0].text;
    }
    this.searchedBy = `Search by ${this.filterData[0]?.text || 'default'}`;

  }
  openFilterOneTime() {
    if (this.filterOneTime) {
      this.filterOneTime = false;
      this.clearAllFilter();
    }
  }
  clearAllFilter() {
    // Clear selected dates if any
    this.selectedFields = {};
    this.dateRangeStartBid = null;
    this.dateRangeEndBid = null;
    this.dateRangeStartModified = null;
    this.dateRangeEndModified = null;

    // Reset filteredValue for the active filter
    Object.keys(this.filteredValue).forEach(key => {
      if (Array.isArray(this.filteredValue[key])) {
        this.filteredValue[key].forEach(item => {
          item.checked = false; // Reset all checkboxes in the current filter list
        });
      } else if (typeof this.filteredValue[key] === 'boolean') {
        this.filteredValue[key] = false; // Reset the 'select all' checkbox
      }
    });

    // Reset select all checkbox
    this.filteredValue[`${this.filterBy}_select_all`] = false;

    // Reset search field
    this.search = '';
  }

  addFiltered(item: any) {
    this.activeFilter = item;
    this.filteredList = item.list;  // Set filteredList based on selected filter
    this.activeNavButton = item.text;
    this.filterBy = item.text;
    this.searchedBy = `Search by ${this.filterBy}`;
  }




  filterCount() {
    let count = 0;
    this.filterData.forEach(item => {
      this.filteredValue[item.text]?.forEach((type: any) => {
        count += type.checked ? 1 : 0;
      });
    });
    // Check if date ranges are set and increase the count
    if (this.dateRangeStartBid || this.dateRangeEndBid || this.dateRangeStartModified || this.dateRangeEndModified) {
      count++;
    }
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

    if (this.dateRangeStartBid) {
      params['startBidDate'] = this.dateRangeStartBid;
    }
    if (this.dateRangeEndBid) {
      params['endBidDate'] = this.dateRangeEndBid;
    }
    if (this.dateRangeStartModified) {
      params['startModifiedDate'] = this.dateRangeStartModified;
    }
    if (this.dateRangeEndModified) {
      params['endModifiedDate'] = this.dateRangeEndModified;
    }

    this.filterData.forEach(item => {
      if (!(item.text in params)) {
        params[item.text] = [];
      }
      for (let i = 0; i < item.list.length; i++) {
        if (this.filteredValue[item.text][i].checked) {
          params[item.text].push(item.list[i]);
        }
      }
    });
    this.selectedFields = params;
    this.filterApplied.emit(params);
    this.filterPopup = false;
  }
}

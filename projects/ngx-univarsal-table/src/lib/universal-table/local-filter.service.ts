import { Injectable } from '@angular/core';
import { from } from 'rxjs/internal/observable/from';

@Injectable({
  providedIn: 'root'
})
export class LocalFilterService {
  filterData: any[];
  constructor() { }
  async rendering(searchText, searchField, sorting, gtColumn, localData,) {
    this.filterData = await this.getAppliedFilter(gtColumn, localData);
    this.filterData = await this.searchApplied(searchText, searchField, this.filterData);
    if (sorting) {
      this.sorting(this.filterData, sorting.field, sorting.direction);
    }
    return this.filterData
  }

  getAppliedFilter(gtColumn: any[], localData: any[]): any[] {
    let match = true;
    const filterMap = gtColumn.reduce((acc, column) => {
      if (column.selectedFilterList && column.selectedFilterList.length > 0) {
        const selectedItems = column.selectedFilterList
          .filter((filterItem: any) => filterItem.checked)
          .map((filterItem: any) => filterItem.item);
  
        const dateFilter = column.selectedFilterList.find((filterItem: any) => filterItem.fromDate && filterItem.toDate);
        if (dateFilter) {
          acc[column.field] = {
            fromDate: new Date(dateFilter.fromDate),
            toDate: new Date(dateFilter.toDate),
          };
        } else if (selectedItems.length > 0) {
          acc[column.field] = selectedItems;
        }
      }
      return acc;
    }, {});
  
    if (Object.keys(filterMap).length === 0) {
      return localData;
    }
    return localData.filter((item) => {
      return Object.keys(filterMap).every((field) => {
        const fieldValue = this.getNestedFieldValue(item, field);
        
        const filterValue = filterMap[field];
        if (filterValue.fromDate && filterValue.toDate) {
          const itemDate = new Date((fieldValue._seconds) * 1000);     
            match = itemDate >= filterValue.fromDate && itemDate <= filterValue.toDate;
        }else{
          match = filterMap[field].includes(fieldValue);
        }
        return match;
      });
    });
  }
  
  
  


  searchApplied(searchText: string, searchField: string, filterData: any[]): any[] {
    const upperCaseSearchText = searchText.toUpperCase();
    if (!searchText.trim()) {
      return filterData;
    }
    return filterData.filter(item => {

      const fieldValue = this.getNestedFieldValue(item, searchField);
      if (fieldValue && fieldValue.toString().toUpperCase().includes(upperCaseSearchText)) {
        return true;
      }

      return false;
    });
  }

  getNestedFieldValue(item: any, fieldPath: string): any {
    return fieldPath.split('.').reduce((obj, key) => (obj && obj[key] !== undefined) ? obj[key] : null, item);
  }


  sorting(arr: any[], value: string, reverse?: boolean) {
    if (arr == null) {
      arr = [];
    }

    const getValue = (obj: any, path: string) => {
      return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    try {
      arr.sort((a, b) => {
        let valueA = getValue(a, value);
        let valueB = getValue(b, value);

        // Handle date comparison (if it's a timestamp in seconds)
        if (valueA && valueA.seconds) {
          valueA = new Date(valueA.seconds * 1000).getTime();
        }
        if (valueB && valueB.seconds) {
          valueB = new Date(valueB.seconds * 1000).getTime();
        }

        // Handle null or undefined values
        if (valueA == null) valueA = '';
        if (valueB == null) valueB = '';

        // If both are numbers, sort numerically
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return reverse ? valueB - valueA : valueA - valueB;
        }

        // If both are strings, sort alphabetically
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return reverse ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
        }

        // If types are mixed, convert both to strings and compare
        return reverse ? valueB.toString().localeCompare(valueA.toString()) : valueA.toString().localeCompare(valueB.toString());
      });
    } catch (error) {
      console.log("Error in sorting: " + error);
    }
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalFilterService {
  filterData :any[];
  constructor() { }
  rendering(searchText ,searchField, sorting, gtColumn ,localData,){
    this.filterData =  this.getAppliedFilter(gtColumn, localData);
    this.filterData =  this.searchApplied(searchText, searchField, this.filterData );
     this.sorting(this.filterData , sorting.field , sorting.direction);
    console.log(searchText ,searchField, sorting, gtColumn );
    return this.filterData
  }

  getAppliedFilter(gtColumn , localData){
    return localData
  }
  searchApplied(searchText, searchField, filterData){
    return filterData
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

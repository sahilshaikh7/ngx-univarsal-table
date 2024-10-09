import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FilterComponent } from '../../projects/ngx-univarsal-table/src/lib/filter/filter.component';
import { TableComponent } from '../../projects/ngx-univarsal-table/src/lib/table/table.component';
import { BuyerService } from './services/buyer.service';
import { EmpService } from './services/emp.service';
import { UniversalTableComponent } from 'projects/ngx-univarsal-table/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent, FilterComponent,UniversalTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'table-library';

  height = 500;
  filterData: any[];
  constructor(public buyerService: BuyerService, public empService: EmpService) {

    this.height = window.innerHeight - 140;
  }
  applyFilter(params: any) {
    console.log(params)
  }
  onSortChanged(sortData) {
    console.log("Sort data:", sortData);
  }
 
}

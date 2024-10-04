import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from "../../projects/ngx-univarsal-table/src/lib/table/table.component";
import { BuyerService } from './services/buyer.service';
import { FilterComponent } from '../../projects/ngx-univarsal-table/src/lib/filter/filter.component';
interface Field {
  field: string;
  header: string;
  checked?: boolean;
  size: number;
  date?: boolean | null;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent,FilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'table-library';

  buyerTableFields: Field[] = [
    { field: 'id', header: 'Buyer ID', size: 1.1 },
    { field: 'user.name', header: 'Buyer Name', size: 1.3 },
    { field: 'business.name', header: 'Organization Name', size: 1.2 },
    { field: 'category_list', header: 'Array of Preferred Category Nodes', size: 2 },
    { field: 'stage', header: 'Stage', size: 1 },
    { field: 'dispositionStatus', header: 'Latest Disposition', size: 1.2 },
    { field: 'participation_status', header: 'Buyer Status', size: 1.2 },
    { field: 'remarks', header: 'Remark', size: 0.7 },
  ];
  filterData: any[];
  constructor(public buyerService: BuyerService) {
    this.buyerService.getLocalBuyerList();
    this.filterData = this.buyerService.filterManageData;

    console.log(this.buyerTableFields);
  }
  applyFilter(params: any){
      console.log(params)
  }
}

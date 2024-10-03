import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from "../../projects/ngx-univarsal-table/src/lib/table/table.component";
import { BuyerService } from './services/buyer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'table-library';
  buyerTableFields = [
    { field: 'id', header: 'Buyer ID', size: 1.1 },
    { field: 'user.name', header: 'Buyer Name', size: 1.3 },
    { field: 'business.name', header: 'Organization Name', size: 1.2 },
    { field: 'category_list', header: 'Array of Preferred Category Nodes', size: 2 },
    { field: 'stage', header: 'Stage', size: 1 },
    { field: 'dispositionStatus', header: 'Latest Disposition', size: 1.2 },
    { field: 'participation_status', header: 'Buyer Status', size: 1.2 },
    { field: 'remarks', header: 'Remark', size: 0.7 },
  ];
  constructor(public buyerService: BuyerService) {
    this.buyerService.getLocalBuyerList();
    console.log(this.buyerTableFields);
  }
}

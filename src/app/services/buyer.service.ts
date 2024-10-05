import { Injectable } from '@angular/core';

import buyerList from '../json-dump/buyer-dummy.json';
import { Field } from './Field';
import { FilterData } from './FilterData';


@Injectable({
  providedIn: 'root',
})
export class BuyerService {

  buyerTableFields: Field[] = [
    { field: 'id', header: 'Buyer ID', size: 1.1, checked: false },
    { field: 'user.name', header: 'Buyer Name', size: 1.3, checked: true },
    { field: 'business.name', header: 'Organization Name', size: 1.2, checked: true },
    { field: 'category_list', header: 'Array of Preferred Category Nodes', size: 2, checked: true },
    { field: 'stage', header: 'Stage', size: 1, checked: true },
    { field: 'dispositionStatus', header: 'Latest Disposition', size: 1.2, checked: true },
    { field: 'participation_status', header: 'Buyer Status', size: 1.2, checked: true },
    { field: 'remarks', header: 'Remark', size: 0.7, checked: true },
  ];


  buyersList: any[] = [];
  filterManageData: FilterData[] = [
    { text: 'Participation Status', list: [] },
    { text: 'Stage', list: [] },
    { text: 'Disposition', list: [] },
  ];
  constructor() {
    this.getLocalBuyerList().then(() => {
      this.getFilterData();
    });
  }
  getLocalBuyerList() {
    return new Promise(resolve => {
      this.buyersList = buyerList;
      resolve(this.buyersList);
    })
  }

  getFilterData() {
    this.filterManageData.forEach(filter => filter.list = []);

    for (let buyer of this.buyersList) {
      buyer.checked = false;

      if (buyer.participation_status && !this.filterManageData[0].list.includes(buyer.participation_status)) {
        this.filterManageData[0].list.push(buyer.participation_status);
      }

      if (buyer.stage && !this.filterManageData[1].list.includes(buyer.stage)) {
        this.filterManageData[1].list.push(buyer.stage);
      }

      if (buyer.dispositionStatus && !this.filterManageData[2].list.includes(buyer.dispositionStatus)) {
        this.filterManageData[2].list.push(buyer.dispositionStatus);
      }
    }
  }


}
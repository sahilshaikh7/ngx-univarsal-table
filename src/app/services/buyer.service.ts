import { Injectable } from '@angular/core';

import buyerList from '../json-dump/buyer-dummy.json';
import { Field } from './Field';


@Injectable({
  providedIn: 'root',
})
export class BuyerService {
  masterParticipationList = ['In Active', 'Active', 'New', 'Completed','In Completed'];
  masterStageList = ['Open', 'junk',];
  buyerTableFields: Field[] = [
    { field: 'id', header: 'Buyer ID', size:1, sizeP:1,sorting:true},
    { field: 'user.name', header: 'Buyer Name', size:1, sizeP:1 ,searchable:true,sorting:true},
    { field: 'business.name', header: 'Organization Name', size:1, sizeP:1 },
    { field: 'category_list', header: 'Array of Preferred Category Nodes', size:1, sizeP:1 },
    { field: 'stage', header: 'Stage', size:1, sizeP:1 ,filterList:this.masterStageList,sorting:true,searchable:true},
    { field: 'dispositionStatus', header: 'Latest Disposition', size:1, sizeP:1,filterList:[] },
    { field: 'participation_status', header: 'Buyer Status', size:1, sizeP:1 ,filterList:this.masterParticipationList},
    { field: 'remarks', header: 'Remark', size:1, sizeP:1 },
    { field: 'created_at', header: 'Created At', size:1, sizeP:1, fieldType:'date' ,filterList:[], sorting:true},
    { field: 'updated_at', header: 'Updated At', size:1, sizeP:1, fieldType:'date' ,filterList:[], sorting:true},
  ];


  buyersList: any[] = [];
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

    for (let buyer of this.buyersList) {
      // if (buyer.participation_status && !this.buyerTableFields[6].filterList.includes(buyer.participation_status)) {
      //   this.buyerTableFields[6].filterList.push(buyer.participation_status);
      // }

      // if (buyer.stage && !this.buyerTableFields[4].filterList.includes(buyer.stage)) {
      //   this.buyerTableFields[4].filterList.push(buyer.stage);
      // }

      if (buyer.dispositionStatus && !this.buyerTableFields[5].filterList.includes(buyer.dispositionStatus)) {
        this.buyerTableFields[5].filterList.push(buyer.dispositionStatus);
      }
    }
  }


}
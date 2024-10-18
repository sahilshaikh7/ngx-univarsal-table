import { Injectable } from '@angular/core';

import buyerList from '../json-dump/buyer-dummy.json';
import { Field } from './Field';


@Injectable({
  providedIn: 'root',
})
export class BuyerService {
  masterParticipationList = ['Inactive', 'Active', 'New', 'Completed','In Completed'];
  masterStageList = ['Open', 'junk','Closed','Proposal'];
  buyerTableFields: Field[] = [
    { field: 'username', header: 'Buyer ID', size:50, sizeP:1,sorting:true ,showColumn:true},
    { field: 'user.name', header: 'Buyer Name', size:50, sizeP:1 ,searchable:true,sorting:true,showColumn:true},
    { field: 'business.name', header: 'Organization Name', size:50, sizeP:1 ,showColumn:true},
    { field: 'category_list', header: 'Array of Preferred Category Nodes', size:100, sizeP:1,showColumn:true },
    { field: 'stage', header: 'Stage', size:50, sizeP:0.5 ,filterList:this.masterStageList,sorting:true,searchable:true,showColumn:true},
    { field: 'dispositionStatus', header: 'Latest Disposition', size:50, sizeP:1,filterList:[] ,showColumn:true},
    { field: 'participation_status', header: 'Buyer Status', size:50, sizeP:1 ,filterList:this.masterParticipationList,showColumn:true },
    { field: 'created_at', header: 'Created At', size:50, sizeP:1, fieldType:'date' ,filterList:[], sorting:true,showColumn:true},
    { field: 'updated_at', header: 'Updated At', size:50, sizeP:1, fieldType:'date' ,filterList:[], sorting:true,showColumn:true},
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
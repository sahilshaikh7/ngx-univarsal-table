import { Injectable } from '@angular/core';

import buyerList from '../json-dump/buyer-dummy.json';
import { Field } from './Field';
import { BuyerRenderer } from './BuyerRenderer';


@Injectable({
  providedIn: 'root',
})
export class BuyerService {
  masterParticipationList = ['In Active', 'Active', 'New', 'Completed','In Complete'];
  masterStageList = ['Open', 'junk','Closed','Proposal'];
  buyerTableFields: Field[] = [
    { field: 'username', header: 'Buyer ID', size:50, sizeP:100,sorting:true ,showColumn:true, cellRenderer: BuyerRenderer},
    { field: 'user.name', header: 'Buyer Name', size:50, sizeP:50 ,searchable:true,sorting:true,showColumn:true},
    { field: 'business.name', header: 'Organization Name', size:50, sizeP:50 ,showColumn:true},
    { field: 'category_list', header: 'Preferred Category', size:100, sizeP:50,showColumn:true },
    { field: 'stage', header: 'Stage', size:50, sizeP:40 ,filterList:this.masterStageList,sorting:true,searchable:true,showColumn:true},
    { field: 'dispositionStatus', header: 'Latest Disposition', size:50, sizeP:60,filterList:[] ,showColumn:true},
    { field: 'participation_status', header: 'Buyer Status', size:50, sizeP:100 ,filterList:this.masterParticipationList,showColumn:true,cellRenderer: BuyerRenderer},
    { field: 'created_at', header: 'Created At', size:50, sizeP:50, fieldType:'date' ,filterList:[], sorting:true,showColumn:true},
    { field: 'updated_at', header: 'Updated At', size:50, sizeP:50, fieldType:'date' ,filterList:[], sorting:true,showColumn:true},
    { field: 'phone-icon', header: '', size:50, sizeP:40,cellRenderer: BuyerRenderer, showColumn:true},
    { field: 'three-dot-icon', header: '', size:50, sizeP:40,cellRenderer: BuyerRenderer, showColumn:true},
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
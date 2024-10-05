import { Injectable } from '@angular/core';
interface FilterData {
  text: string;
  list: string[]; 
}
@Injectable({
  providedIn: 'root',
})
export class BuyerService {
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
      this.buyersList = [
        {
          id: 'ranju_nuox',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        },
        {
          id: 'ranju_nuox',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        },
        {
          id: 'ranju_nuox',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        },
        {
          id: 'ranju_nuox',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        },

        {
          id: 'ranju_nuox',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        },
        {
          id: 'ranju_nuox',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        },
        {
          id: 'ranju_nuox',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        },
        {
          id: 'ranju_nuox',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        },
        {
          id: 'ranju_nuox',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        },

        {
          id: 'ranju_nuox',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        },
        {
          id: 'ranju_nuox',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        },

        {
          id: 'ranju_nuox',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        },
        {
          id: 'abhishekvishwakarma09',
          user: { name: 'Abhishek Vishwa' },
          business: { name: 'Vishwa Enterprises' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Hot',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Another remark here',
        },
        {
          id: 'abhishekvishwakarma09',
          user: { name: 'Abhishek Vishwa' },
          business: { name: 'Vishwa Enterprises' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Hot',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Yet another remark',
        },
        {
          id: 'ranju_nuox',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others','Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        },
        {
          id: 'ranju_nuox',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        },
        {
          id: 'sahil',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        },
        {
          id: 'sandeep',
          user: { name: 'Ranju' },
          business: { name: 'Nuox Electronics' },
          category_list: ['Electronics and Appliances', 'Fashion and Style', 'IT', 'Others'],
          stage: 'Open',
          dispositionStatus: 'Won',
          participation_status: 'Active',
          remarks: 'Some remark here',
        }
      ];

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
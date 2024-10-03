import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BuyerService {
    buyersList  : any;

    constructor() {
        this.getLocalBuyerList();
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
}
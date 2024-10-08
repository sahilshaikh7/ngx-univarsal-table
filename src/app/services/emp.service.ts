import { Injectable } from '@angular/core';

import userJsonDump from '../json-dump/emp-dummy.json';
import { Field } from './Field';
import { FilterData } from './FilterData';
import { GenderRenderer } from './GenderRenderer';


@Injectable({
  providedIn: 'root',
})
export class EmpService {
  editable = true;
  userTableFields: Field[] = [{ field: "user.url", header: "Profile", cellRenderer: GenderRenderer, size: .5, sizeP: 2, utClass: 'bgPink' },
  { field: "user.name", header: "Name", size: 2.3, sizeP: 9, editable: this.editable, cellRenderer: GenderRenderer },
  { field: "", header: '', size: .2, sizeP: 1, cellRenderer: GenderRenderer },
  { field: "user.user_pd.current_address2", header: 'Address', size: 2, sizeP: 12, editable: this.editable },
  { field: "user.user_pd.sub_community", header: 'Community', size: 1, sizeP: 6, editable: this.editable },
  { field: "user.user_pd.origin_city", header: 'Origin', size: 1, sizeP: 6, editable: this.editable },
  { field: "user.user_pd.education", header: 'Education', size: 1, sizeP: 4, editable: this.editable },
  { field: "user.user_pd.occupation", header: 'Occ.', size: 1, sizeP: 4, editable: this.editable },
  { field: "user.user_pd.profession", header: 'Prof.', size: 1, sizeP: 4, editable: this.editable },
  { field: "user.dob", header: "A", cellRenderer: GenderRenderer, size: .5, sizeP: 3, editable: this.editable },
  { field: "user.user_pd.blood", header: 'Blood', size: .5, sizeP: 3, editable: this.editable },
  { field: "user.user_pd.marital", header: "M", cellRenderer: GenderRenderer, size: .5, sizeP: 3, editable: this.editable },
  { field: "user.gender", header: 'G', size: .5, sizeP: 3, cellRenderer: GenderRenderer, editable: this.editable },
  ]


  userList: any[] = userJsonDump;
  filterData: FilterData[] = [
    { text: 'Address', list: [], field:'user.user_pd.current_address2'},
    { text: 'Community', list: [],field:'user.user_pd.sub_community' },
    { text: 'Education', list: [],field:'user.user_pd.education' },
    { text: 'Last Modified?', list: [] , type:'date',field:'created_at'},
    { text: 'Created At?', list: [] , type:'date',field:'created_at'},
  ];
  constructor() {
    this.getLocalUserList().then(() => {
      this.getFilterData();
    });
  }
  getLocalUserList() {
    return new Promise(resolve => {
      this.userList = userJsonDump;
      resolve(this.userList);
    })
  }

  getFilterData() {
    this.filterData.forEach(filter => filter.list = []);

    for (let user of this.userList) {
      user.checked = false;

      if (user.user.user_pd.current_address2 && !this.filterData[0].list.includes(user.user.user_pd.current_address2)) {
        this.filterData[0].list.push(user.user.user_pd.current_address2);
      }

      if (user.user.user_pd.sub_community && !this.filterData[1].list.includes(user.user.user_pd.sub_community)) {
        this.filterData[1].list.push(user.user.user_pd.sub_community);
      }

      if (user.user.user_pd.education && !this.filterData[2].list.includes(user.user.user_pd.education)) {
        this.filterData[2].list.push(user.user.user_pd.education);
      }
    }
  }


}
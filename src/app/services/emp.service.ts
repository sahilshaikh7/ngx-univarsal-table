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
  userTableFields: Field[] = [{ field: "user.url", header: "Profile", cellRenderer: GenderRenderer, size: 1, utClass:'bgPink' },
  { field: "user.name", header: "Name", size: 2, editable: this.editable, cellRenderer: GenderRenderer },
  { field: "user.gender", header: 'G', size: 3.5, cellRenderer: GenderRenderer, editable: this.editable },
  { field: "user.dob", header: "A", cellRenderer: GenderRenderer, size: .5, editable: this.editable },
  { field: "user.user_pd.marital", header: "M", cellRenderer: GenderRenderer, size: .5, editable: this.editable },
  { field: "user.user_pd.blood", header: 'Blood', size: .5, editable: this.editable },
  { field: "user.user_pd.gotra", header: 'Gotra', size: 1, editable: this.editable },
  { field: "user.user_pd.education", header: 'Education', size: 1, editable: this.editable },
  { field: "user.user_pd.occupation", header: 'Occ.', size: 1, editable: this.editable },
  { field: "user.user_pd.profession", header: 'Prof.', size: 1, editable: this.editable },
  { field: "user.user_pd.current_address2", header: 'Address', size: 1, editable: this.editable },
  { field: "user.user_pd.origin_city", header: 'Origin', size: 1, editable: this.editable }
  ]


  userList: any[] = userJsonDump;
  filterManageData: FilterData[] = [
    { text: 'Participation Status', list: [] },
    { text: 'Stage', list: [] },
    { text: 'Disposition', list: [] },
  ];
  constructor() {

  }
  getLocaluserList() {
    return new Promise(resolve => {
      this.userList = userJsonDump;
      resolve(this.userList);
    })
  }

  getFilterData() {
    this.filterManageData.forEach(filter => filter.list = []);

    for (let user of this.userList) {
      user.checked = false;

      if (user.participation_status && !this.filterManageData[0].list.includes(user.participation_status)) {
        this.filterManageData[0].list.push(user.participation_status);
      }

      if (user.stage && !this.filterManageData[1].list.includes(user.stage)) {
        this.filterManageData[1].list.push(user.stage);
      }

      if (user.dispositionStatus && !this.filterManageData[2].list.includes(user.dispositionStatus)) {
        this.filterManageData[2].list.push(user.dispositionStatus);
      }
    }
  }


}
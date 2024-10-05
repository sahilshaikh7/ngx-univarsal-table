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
  userTableFields: Field[] = [{ field: "user.url", header: "Profile", cellRenderer: GenderRenderer, sizeL: .5, sizeP: 2, utClass: 'bgPink' },
  { field: "user.name", header: "Name", sizeL: 2.3, sizeP: 9, editable: this.editable, cellRenderer: GenderRenderer },
  { field: "", header: '', sizeL: .2, sizeP: 1, cellRenderer: GenderRenderer },
  { field: "user.user_pd.current_address2", header: 'Address', sizeL: 2, sizeP: 12, editable: this.editable },
  { field: "user.user_pd.sub_community", header: 'Community', sizeL: 1, sizeP: 6, editable: this.editable },
  { field: "user.user_pd.origin_city", header: 'Origin', sizeL: 1, sizeP: 6, editable: this.editable },
  { field: "user.user_pd.education", header: 'Education', sizeL: 1, sizeP: 4, editable: this.editable },
  { field: "user.user_pd.occupation", header: 'Occ.', sizeL: 1, sizeP: 4, editable: this.editable },
  { field: "user.user_pd.profession", header: 'Prof.', sizeL: 1, sizeP: 4, editable: this.editable },
  { field: "user.dob", header: "A", cellRenderer: GenderRenderer, sizeL: .5, sizeP: 3, editable: this.editable },
  { field: "user.user_pd.blood", header: 'Blood', sizeL: .5, sizeP: 3, editable: this.editable },
  { field: "user.user_pd.marital", header: "M", cellRenderer: GenderRenderer, sizeL: .5, sizeP: 3, editable: this.editable },
  { field: "user.gender", header: 'G', sizeL: .5, sizeP: 3, cellRenderer: GenderRenderer, editable: this.editable },
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
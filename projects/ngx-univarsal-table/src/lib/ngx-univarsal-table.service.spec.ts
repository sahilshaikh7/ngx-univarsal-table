import { TestBed } from '@angular/core/testing';

import { NgxUnivarsalTableService } from './ngx-univarsal-table.service';

describe('NgxUnivarsalTableService', () => {
  let service: NgxUnivarsalTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxUnivarsalTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUnivarsalTableComponent } from './ngx-univarsal-table.component';

describe('NgxUnivarsalTableComponent', () => {
  let component: NgxUnivarsalTableComponent;
  let fixture: ComponentFixture<NgxUnivarsalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxUnivarsalTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxUnivarsalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

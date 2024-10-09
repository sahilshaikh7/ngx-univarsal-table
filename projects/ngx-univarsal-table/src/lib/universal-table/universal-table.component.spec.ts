import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalTableComponent } from './universal-table.component';

describe('UniversalTableComponent', () => {
  let component: UniversalTableComponent;
  let fixture: ComponentFixture<UniversalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversalTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

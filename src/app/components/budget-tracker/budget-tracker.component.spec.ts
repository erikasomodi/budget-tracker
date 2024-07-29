import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetTrackerComponent } from './budget-tracker.component';

describe('BudgetTrackerComponent', () => {
  let component: BudgetTrackerComponent;
  let fixture: ComponentFixture<BudgetTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

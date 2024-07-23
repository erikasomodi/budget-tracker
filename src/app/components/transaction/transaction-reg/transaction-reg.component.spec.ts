import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRegComponent } from './transaction-reg.component';

describe('TransactionRegComponent', () => {
  let component: TransactionRegComponent;
  let fixture: ComponentFixture<TransactionRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionRegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

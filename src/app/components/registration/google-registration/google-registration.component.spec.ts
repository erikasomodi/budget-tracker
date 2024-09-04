import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleRegistrationComponent } from './google-registration.component';

describe('GoogleRegistrationComponent', () => {
  let component: GoogleRegistrationComponent;
  let fixture: ComponentFixture<GoogleRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

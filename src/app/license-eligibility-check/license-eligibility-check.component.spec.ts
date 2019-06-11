import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseEligibilityCheckComponent } from './license-eligibility-check.component';

describe('LicenseEligibilityCheckComponent', () => {
  let component: LicenseEligibilityCheckComponent;
  let fixture: ComponentFixture<LicenseEligibilityCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseEligibilityCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseEligibilityCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

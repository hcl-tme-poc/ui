import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotImplimentedComponent } from './not-implimented.component';

describe('NotImplimentedComponent', () => {
  let component: NotImplimentedComponent;
  let fixture: ComponentFixture<NotImplimentedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotImplimentedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotImplimentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

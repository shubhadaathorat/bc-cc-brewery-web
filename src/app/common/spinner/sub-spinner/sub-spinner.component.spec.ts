import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubSpinnerComponent } from './sub-spinner.component';

describe('SubSpinnerComponent', () => {
  let component: SubSpinnerComponent;
  let fixture: ComponentFixture<SubSpinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

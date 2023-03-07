import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MismatchComponent } from './mismatch.component';

describe('MismatchComponent', () => {
  let component: MismatchComponent;
  let fixture: ComponentFixture<MismatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MismatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MismatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

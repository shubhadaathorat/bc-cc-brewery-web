import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBreweryComponent } from './upload-brewery.component';

describe('UploadBreweryComponent', () => {
  let component: UploadBreweryComponent;
  let fixture: ComponentFixture<UploadBreweryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadBreweryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBreweryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

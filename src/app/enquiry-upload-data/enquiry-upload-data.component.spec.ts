import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryUploadDataComponent } from './enquiry-upload-data.component';

describe('EnquiryUploadDataComponent', () => {
  let component: EnquiryUploadDataComponent;
  let fixture: ComponentFixture<EnquiryUploadDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryUploadDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryUploadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

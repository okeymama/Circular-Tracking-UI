import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoUploadDataComponent } from './po-upload-data.component';

describe('PoUploadDataComponent', () => {
  let component: PoUploadDataComponent;
  let fixture: ComponentFixture<PoUploadDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoUploadDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoUploadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

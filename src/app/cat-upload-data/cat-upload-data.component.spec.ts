import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatUploadDataComponent } from './cat-upload-data.component';

describe('CatUploadDataComponent', () => {
  let component: CatUploadDataComponent;
  let fixture: ComponentFixture<CatUploadDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatUploadDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatUploadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

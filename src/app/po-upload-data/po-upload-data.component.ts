import { Component, OnInit } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PODetail,FileUpload } from '../model';
import { CircularServiceService } from '../circular-service.service';

@Component({
  selector: 'app-po-upload-data',
  templateUrl: './po-upload-data.component.html',
  styleUrls: ['./po-upload-data.component.css']
})
export class PoUploadDataComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private circularService: CircularServiceService,
    private route: ActivatedRoute) { }

  poUploadFormGroup: FormGroup;
  submitted = false;
  public currentFileUpload: File;
  public selectedFiles: FileList;
  poDetail : PODetail;
  fileId;
  uploadFileObj: FileUpload;
  duplicateCheck = false;
  progress = false;
  fileCheck = false;
  dateCheck = false;

  ngOnInit() {
  
    this.poUploadFormGroup = this.formBuilder.group({
    orderNumber: ['', Validators.required],
    item: ['', Validators.required],
    make: ['', Validators.required],
    modelNumber: ['', [Validators.required ]],
    quantity : ['', [Validators.required]],
    rate : ['', [Validators.required]],
    remark : ['', [Validators.required]],
    date : ['', [Validators.required]],
    itemCode : ['', [Validators.required]],
    customer : ['', [Validators.required]],
    file : ['', [Validators.required]],
  });
  }

  get f() { return this.poUploadFormGroup.controls; }

  onSubmit() {
    console.log('in Submit');
    this.submitted = true;
    // stop here if form is invalid
    if (this.poUploadFormGroup.invalid) {
      const d = this.poUploadFormGroup.value.date;
      console.log(this.fileId);
      this.fileCheck = this.fileId === undefined ? true : false;
      this.dateCheck = (d === undefined || d === '' || d === null) ? true : false;
        return;
    }

    console.log('success');
    console.log(this.poUploadFormGroup.value);
    console.log(this.poUploadFormGroup.value.item);

    this.poDetail = new PODetail();
    this.poDetail.orderNo = this.poUploadFormGroup.value.orderNumber;
    this.poDetail.item = this.poUploadFormGroup.value.item;
    this.poDetail.make = this.poUploadFormGroup.value.make;
    this.poDetail.modelNo = this.poUploadFormGroup.value.modelNumber;
    this.poDetail.quantity = this.poUploadFormGroup.value.quantity;
    this.poDetail.rate = this.poUploadFormGroup.value.rate;
    this.poDetail.remark = this.poUploadFormGroup.value.remark;
    this.poDetail.date = this.poUploadFormGroup.value.date;
    this.poDetail.itemCode = this.poUploadFormGroup.value.itemCode;
    this.poDetail.customer = this.poUploadFormGroup.value.customer;
    this.poDetail.fileName = this.fileId;

    console.log(this.poDetail);
    console.log(this.poDetail.item + ' ' + this.poDetail.itemCode);
        this.circularService.checkDuplicatePOIteamCode( this.poDetail.itemCode).subscribe((result1) => {
          console.log(result1);
          if (this.poDetail.fileName === undefined || this.poDetail.fileName === '') {
            console.log('check file upload')
          }
          if (!result1) {
              this.duplicateCheck = false;
              this.circularService.savePODetail(this.poDetail).subscribe((result) => {
                console.log(result);
                this.submitted = false;
              this.reset();
            });
          } else {
            console.log('in duplicate true');
            this.duplicateCheck = true;
          }
      });
  }

  checkDate() {
    console.log('check date chnage ' + this.poUploadFormGroup.value.date);
    if (this.poUploadFormGroup.value.date === undefined || this.poUploadFormGroup.value.date === '' ) {
      this.dateCheck = true;
    } else {
       this.dateCheck = false;
    }
  }

  reset(){
    this.fileId = undefined;
    this.submitted = false;
    this.fileCheck = false;
    this.dateCheck = false;
    this.progress = false;
    this.duplicateCheck = false;
    this.poUploadFormGroup.reset();
  }

  fileUpload(event) {
    this.progress = false;
    this.fileCheck = false;
    console.log('In file upload');
    console.log(event);
    console.log(event.target.files);
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadFileObj = new FileUpload();
    this.uploadFileObj.clientName = this.circularService.clientName;
    this.uploadFileObj.file = this.currentFileUpload;
    console.log(this.uploadFileObj.clientName);
    console.log(this.uploadFileObj.file);
    this.circularService.fileUpload(this.uploadFileObj).subscribe((result) => {
      this.progress = true;
      console.log(result);
      this.fileId  = result;
     });
    }


}



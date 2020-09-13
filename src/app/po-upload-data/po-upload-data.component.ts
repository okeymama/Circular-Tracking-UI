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
  editFileCheck = false;
  edit = false;
  editRowVal: PODetail;

  ngOnInit() {
  
    this.poUploadFormGroup = this.formBuilder.group({
    orderNo: ['', Validators.required],
    item: ['', Validators.required],
    make: ['', Validators.required],
    modelNo: ['', [Validators.required ]],
    quantity : ['', [Validators.required]],
    rate : ['', [Validators.required]],
    remark : ['', [Validators.required]],
    date : ['', [Validators.required]],
    itemCode : ['', [Validators.required]],
    customer : ['', [Validators.required]],
    file : ['', [Validators.required]],
  });

  this.route.params.subscribe(params => {
    console.log(params);
    if (params['editPo']) {
      this.editFileCheck = true;
      this.edit = true;
      this.editRowVal = this.circularService.editPoRow;
      console.log(this.editRowVal);
      const d = this.editRowVal.date;
      console.log(d.substring(0, d.length - 1));
      console.log(d);
      const dateFormat = new Date(d.substring(0, d.length - 1));
      console.log(dateFormat);
      this.poUploadFormGroup.setValue({orderNo: this.editRowVal.orderNo,item : this.editRowVal.item,make : this.editRowVal.make,
        date:dateFormat,modelNo:this.editRowVal.modelNo,quantity:this.editRowVal.quantity,rate:this.editRowVal.rate,
        remark:this.editRowVal.remark,itemCode:this.editRowVal.itemCode,customer:this.editRowVal.customer,file:this.editRowVal.fileName });
      console.log(this.poUploadFormGroup.value);
      this.fileId = this.editRowVal.fileName;
      this.poUploadFormGroup.get('orderNo').disable();
    }
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
    if (!this.edit) {
      this.poDetail.orderNo = this.poUploadFormGroup.value.orderNo;
    } else {
      this.poDetail.orderNo = this.editRowVal.orderNo;
    }
    this.poDetail.item = this.poUploadFormGroup.value.item;
    this.poDetail.make = this.poUploadFormGroup.value.make;
    this.poDetail.modelNo = this.poUploadFormGroup.value.modelNo;
    this.poDetail.quantity = this.poUploadFormGroup.value.quantity;
    this.poDetail.rate = this.poUploadFormGroup.value.rate;
    this.poDetail.remark = this.poUploadFormGroup.value.remark;
    this.poDetail.date = this.poUploadFormGroup.value.date;
    this.poDetail.itemCode = this.poUploadFormGroup.value.itemCode;
    this.poDetail.customer = this.poUploadFormGroup.value.customer;
    this.poDetail.fileName = this.fileId;

    console.log(this.poDetail);
    console.log(this.poDetail.item + ' ' + this.poDetail.itemCode);
    if (!this.edit) {
      this.checkAndSaveData();
    } else {
      this.savePoData();
    }
  }

  checkAndSaveData() {
    this.circularService.checkDuplicatePoOrderNo( this.poDetail.orderNo).subscribe((result1) => {
      console.log(result1);
      if (this.poDetail.fileName === undefined || this.poDetail.fileName === '') {
        console.log('check file upload');
      }
      if (!result1) {
        this.savePoData();
      } else {
        console.log('in duplicate true');
        this.duplicateCheck = true;
      }
  });
  }

  savePoData() {
    this.duplicateCheck = false;
          this.circularService.savePODetail(this.poDetail).subscribe((result) => {
            console.log(result);
            this.submitted = false;
          this.reset();
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
    this.editFileCheck = false;
    this.edit = false;
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

  changeFile() {
      this.editFileCheck = false;
      this.poUploadFormGroup.controls['file'].setValue('');
  }
}



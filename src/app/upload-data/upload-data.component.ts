import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CircularDetails, FileUpload } from '../model';
import { CircularServiceService } from '../circular-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit {

  fileUploadFormGroup: FormGroup;
  submitted = false;
  public currentFileUpload: File;
  public selectedFiles: FileList;
  circular: CircularDetails;
  fileId;
  uploadFileObj: FileUpload;
  duplicateCheck = false;
  progress = false;
  fileCheck = false;
  dateCheck = false;
  editFileCheck = false;
  edit = false;
  editRowVal: CircularDetails;

  constructor(private router: Router, private formBuilder: FormBuilder, private circularService: CircularServiceService,
    private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log('ngonit');
   
    this.fileUploadFormGroup = this.formBuilder.group({
      circularDetail: ['', Validators.required],
      circularNumber: ['', Validators.required],
      date: ['', Validators.required],
      department: ['', [Validators.required ]],
      file : ['', [Validators.required]],
    });
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['editCircular']) {
        this.editFileCheck = true;
        this.edit = true;
        this.editRowVal = this.circularService.editRow;
        console.log(this.editRowVal);
        const d = this.editRowVal.date;
        console.log(d.substring(0, d.length - 1));
        console.log(d);
        const dateFormat = new Date(d.substring(0, d.length - 1));
        console.log(dateFormat);
        this.fileUploadFormGroup.setValue({circularDetail: this.editRowVal.circularDetail,circularNumber : this.editRowVal.circularNumber,
          date:dateFormat,department:this.editRowVal.departmant,file:this.editRowVal.fileName });
        console.log(this.fileUploadFormGroup.value);
        this.fileId = this.editRowVal.fileName;
        this.fileUploadFormGroup.get('circularNumber').disable();
      }
    });
  }

  get f() { return this.fileUploadFormGroup.controls; }

  onSubmit() {
    console.log('in Submit');
    this.submitted = true;
    // stop here if form is invalid
    if (this.fileUploadFormGroup.invalid) {
      const d = this.fileUploadFormGroup.value.date;
      console.log(this.fileId);
      this.fileCheck = this.fileId === undefined ? true : false;
      this.dateCheck = (d === undefined || d === '' || d === null) ? true : false;
        return;
    }
    console.log('success');
    console.log(this.fileUploadFormGroup.value);
    console.log(this.fileUploadFormGroup.value.circularDetail);
    this.circular = new CircularDetails();
    this.circular.circularDetail = this.fileUploadFormGroup.value.circularDetail;
    if (!this.edit) {
      this.circular.circularNumber = this.fileUploadFormGroup.value.circularNumber;
    } else {
      this.circular.circularNumber = this.editRowVal.circularNumber;
      this.circular.id = this.editRowVal.id;
    }
    this.circular.date = this.fileUploadFormGroup.value.date;
    this.circular.departmant = this.fileUploadFormGroup.value.department;
    this.circular.clientNumber = this.circularService.clientName;
    this.circular.fileName = this.fileId;
    this.circular.createdBy = this.circularService.currentUser.userName;

    console.log(this.circular);
    console.log('check circular number');
    console.log(this.circular.clientNumber + ' ' + this.circular.circularNumber);
    if (!this.duplicateCheck) {
      this.saveCircular();
    }

}

checkDuplicate(e) {
  console.log('in check duplicate');
  const clientNumber = this.circularService.clientName;
  const circularNumber = e.target.value;
  if (circularNumber != null && circularNumber !== '') {
  this.circularService.checkDuplicate(clientNumber, circularNumber).subscribe((result1) => {
    console.log(result1);
    if (!result1) {
       console.log('in duplicate false');
       this.duplicateCheck = false;
     } else {
       console.log('in duplicate true');
       this.duplicateCheck = true;
     }
  });
  } else {
    this.duplicateCheck = false;
  }
}

saveCircular() {
      this.duplicateCheck = false;
      console.log(this.circular.id);
      this.circularService.saveCircular(this.circular).subscribe((result) => {
        console.log(result);
        this.submitted = false;
        this.openSnackBar('Saved Successfully !', '');
        this.reset();
      });
}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
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

  checkDate() {
    console.log('check date chnage ' + this.fileUploadFormGroup.value.date);
    if (this.fileUploadFormGroup.value.date === undefined || this.fileUploadFormGroup.value.date === '' ) {
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
    this.fileUploadFormGroup.get('circularNumber').enable();
    this.fileUploadFormGroup.reset();
  }

  changeFile() {
    this.editFileCheck = false;
    this.fileUploadFormGroup.controls['file'].setValue('');
  }

}

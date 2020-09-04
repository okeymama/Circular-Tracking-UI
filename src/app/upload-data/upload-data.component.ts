import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CircularDetails, FileUpload } from '../model';
import { CircularServiceService } from '../circular-service.service';


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

  constructor(private router: Router, private formBuilder: FormBuilder, private circularService: CircularServiceService) { }

  ngOnInit() {
    this.fileUploadFormGroup = this.formBuilder.group({
      circularDetail: ['', Validators.required],
      circularNumber: ['', Validators.required],
      date: ['', Validators.required],
      department: ['', [Validators.required ]],
      file : ['', [Validators.required]],
    });
  }

  get f() { return this.fileUploadFormGroup.controls; }

  onSubmit() {
    console.log('in Submit');
    this.submitted = true;

    // stop here if form is invalid
    if (this.fileUploadFormGroup.invalid) {
        return;
    }
    console.log('success');
    console.log(this.fileUploadFormGroup.value);
    console.log(this.fileUploadFormGroup.value.circularDetail);
    this.circular = new CircularDetails();
    this.circular.circularDetail = this.fileUploadFormGroup.value.circularDetail;
    this.circular.circularNumber = this.fileUploadFormGroup.value.circularNumber;
    this.circular.date = this.fileUploadFormGroup.value.date;
    this.circular.departmant = this.fileUploadFormGroup.value.department;
    this.circular.clientNumber = this.circularService.clientName;
    this.circular.fileName = this.fileId;
    console.log(this.circular);
    this.circularService.saveCircular(this.circular).subscribe((result) => {
      console.log(result);
      this.submitted = false;
    this.fileUploadFormGroup.reset();
   });
}

fileUpload(event) {
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
     console.log(result);
     this.fileId  = result;
  });
  }

}

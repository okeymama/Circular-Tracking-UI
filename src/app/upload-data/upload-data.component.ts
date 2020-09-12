import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  duplicateCheck = false;
  progress = false;
  fileCheck = false;
  dateCheck = false;
  editFileCheck = false;
  edit = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private circularService: CircularServiceService,
    private route: ActivatedRoute) { }

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
      if (params['edit']) {
        this.editFileCheck = true;
        this.edit = true;
        const editRowVal = this.circularService.editRow;
        console.log(editRowVal);
        const d = editRowVal.date;
        console.log(d.substring(0, d.length - 1));
        console.log(d);
        const dateFormat = new Date(d.substring(0, d.length - 1));
        console.log(dateFormat);
        this.fileUploadFormGroup.setValue({circularDetail: editRowVal.circularDetail,
          circularNumber : editRowVal.circularNumber,date:dateFormat,department:editRowVal.departmant,file:editRowVal.fileName });
        console.log(this.fileUploadFormGroup.value);
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
      this.circular.circularNumber = this.circularService.editRow.circularNumber;
    }
    this.circular.date = this.fileUploadFormGroup.value.date;
    this.circular.departmant = this.fileUploadFormGroup.value.department;
    this.circular.clientNumber = this.circularService.clientName;
    this.circular.fileName = this.fileId;
    console.log(this.circular);
    console.log('check circular number');
    console.log(this.circular.clientNumber + ' ' + this.circular.circularNumber);
    if (!this.edit) {
      this.checkAndSaveData();
    } else {
      this.saveCircular();
    }

}

checkAndSaveData() {
  this.circularService.checkDuplicate(this.circular.clientNumber, this.circular.circularNumber).subscribe((result1) => {
    console.log(result1);
    if (this.circular.fileName === undefined || this.circular.fileName === '') {
      console.log('check file upload')
    }
    if (!result1) {
        this.saveCircular();
     } else {
       console.log('in duplicate true');
       this.duplicateCheck = true;
     }
});
}

saveCircular() {
      this.duplicateCheck = false;
      this.circularService.saveCircular(this.circular).subscribe((result) => {
        console.log(result);
        this.submitted = false;
        this.reset();
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
    this.fileUploadFormGroup.reset();
  }

  changeFile() {
    this.editFileCheck = false;
    this.fileUploadFormGroup.controls['file'].setValue('');
    // this.fileUploadFormGroup.reset({
    //   file : ['', [Validators.required]]
    // });
  }

}

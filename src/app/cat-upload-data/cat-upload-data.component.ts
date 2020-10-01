import { Component, OnInit } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUpload, CatalogDetail } from '../model';
import { CircularServiceService } from '../circular-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cat-upload-data',
  templateUrl: './cat-upload-data.component.html',
  styleUrls: ['./cat-upload-data.component.css']
})
export class CatUploadDataComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private circularService: CircularServiceService,
    private route: ActivatedRoute, private snackBar: MatSnackBar) { }

    catalogFormGroup: FormGroup;
    submitted = false;
    public currentFileUpload: File;
    public selectedFiles: FileList;
    catalogDetail: CatalogDetail;
    fileId;
    uploadFileObj: FileUpload;
    duplicateCheck = false;
    progress = false;
    fileCheck = false;
    dateCheck = false;
    editFileCheck = false;
    edit = false;
    editRowVal: CatalogDetail;

    ngOnInit() {
      this.catalogFormGroup = this.formBuilder.group({
        productName: ['', Validators.required],
        modelNo: ['', Validators.required],
        oldModelNo: ['', Validators.required],
        voltage: ['', [Validators.required ]],
        range : ['', [Validators.required]],
        colour  : ['', [Validators.required]],
        file : ['', [Validators.required]],
      });
      this.route.params.subscribe(params => {
        console.log(params);
        if (params['editCatalog']) {
          this.editFileCheck = true;
          this.edit = true;
          this.editRowVal = this.circularService.editCatalogRow;
          console.log(this.editRowVal);
          this.catalogFormGroup.setValue({productName: this.editRowVal.productName,modelNo : this.editRowVal.modelNo,
            oldModelNo: this.editRowVal.oldModelNo, voltage:this.editRowVal.voltage,range:this.editRowVal.range,
            colour:this.editRowVal.colour, file:this.editRowVal.fileName });
          this.fileId = this.editRowVal.fileName;
          console.log(this.catalogFormGroup.value);
          this.catalogFormGroup.get('modelNo').disable();
        }
      });
    }

    get f() { return this.catalogFormGroup.controls; }


    onSubmit() {
      console.log('in Submit');
      this.submitted = true;
      // stop here if form is invalid
      if (this.catalogFormGroup.invalid) {
        console.log(this.fileId);
        this.fileCheck = this.fileId === undefined ? true : false;
          return;
      }
      console.log('success');
      console.log(this.catalogFormGroup.value);
      console.log(this.catalogFormGroup.value.item);
  
      this.catalogDetail = new CatalogDetail();
      this.catalogDetail.productName = this.catalogFormGroup.value.productName;
      if (!this.edit) {
        this.catalogDetail.modelNo = this.catalogFormGroup.value.modelNo;
      } else {
        this.catalogDetail.modelNo = this.editRowVal.modelNo;
        // this.catalogDetail.id = this.editRowVal.id;
      }

      this.catalogDetail.oldModelNo = this.catalogFormGroup.value.oldModelNo;
      this.catalogDetail.voltage = this.catalogFormGroup.value.voltage;
      this.catalogDetail.range = this.catalogFormGroup.value.range;
      this.catalogDetail.colour = this.catalogFormGroup.value.colour;
      this.catalogDetail.fileName = this.fileId;
      this.catalogDetail.createdBy = this.circularService.currentUser.userName;

      console.log(this.catalogDetail);
      console.log(this.catalogDetail.productName + ' ' + this.catalogDetail.modelNo);
      if (!this.duplicateCheck) {
        this.saveCatalog();
      }

    }


    checkDuplicate(e) {
      console.log('in check duplicate');
      const modelNo = e.target.value;
      if (modelNo != null && modelNo !== '') {
      this.circularService.checkDuplicateCatalog(modelNo).subscribe((result1) => {
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

    saveCatalog() {
      this.duplicateCheck = false;
      this.circularService.saveCatalogDetail(this.catalogDetail).subscribe((result) => {
        console.log(result);
        this.openSnackBar('Saved Successfully !', '');
        this.submitted = false;
      this.reset();
    });
    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
        verticalPosition: 'top'
      });
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
      this.catalogFormGroup.get('modelNo').enable();
      this.catalogFormGroup.reset();
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
      this.catalogFormGroup.controls['file'].setValue('');
  }
}

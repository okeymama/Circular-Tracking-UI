import { Component, OnInit } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUpload,CatalogDetail } from '../model';
import { CircularServiceService } from '../circular-service.service';

@Component({
  selector: 'app-cat-upload-data',
  templateUrl: './cat-upload-data.component.html',
  styleUrls: ['./cat-upload-data.component.css']
})
export class CatUploadDataComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private circularService: CircularServiceService,
    private route: ActivatedRoute) { }

    catalogFormGroup: FormGroup;
    submitted = false;
    public currentFileUpload: File;
    public selectedFiles: FileList;
    catalogDetail : CatalogDetail;
    fileId;
    uploadFileObj: FileUpload;
    duplicateCheck = false;
    progress = false;
    fileCheck = false;
    dateCheck = false;

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
    }

    get f() { return this.catalogFormGroup.controls; }


    onSubmit() {
      console.log('in Submit');
      this.submitted = true;
      // stop here if form is invalid
      if (this.catalogFormGroup.invalid) {
        const d = this.catalogFormGroup.value.date;
        console.log(this.fileId);
        this.fileCheck = this.fileId === undefined ? true : false;
        this.dateCheck = (d === undefined || d === '' || d === null) ? true : false;
          return;
      }
  
      console.log('success');
      console.log(this.catalogFormGroup.value);
      console.log(this.catalogFormGroup.value.item);
  
      this.catalogDetail = new CatalogDetail();
      this.catalogDetail.productName = this.catalogFormGroup.value.productName;
      this.catalogDetail.modelNo = this.catalogFormGroup.value.modelNo;
      this.catalogDetail.oldModelNo = this.catalogFormGroup.value.oldModelNo;
      this.catalogDetail.voltage = this.catalogFormGroup.value.voltage;
      this.catalogDetail.range = this.catalogFormGroup.value.range;
      this.catalogDetail.colour = this.catalogFormGroup.value.colour;
      this.catalogDetail.fileName = this.fileId;
      
      console.log(this.catalogDetail);
      console.log(this.catalogDetail.productName + ' ' + this.catalogDetail.modelNo);
          this.circularService.checkDuplicateCatalog(this.catalogDetail.modelNo).subscribe((result1) => {
            console.log(result1);
            if (this.catalogDetail.fileName === undefined || this.catalogDetail.fileName === '') {
              console.log('check file upload')
            }
            if (!result1) {
                this.duplicateCheck = false;
                this.circularService.saveCatalogDetail(this.catalogDetail).subscribe((result) => {
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


    reset(){
      this.fileId = undefined;
      this.submitted = false;
      this.fileCheck = false;
      this.dateCheck = false;
      this.progress = false;
      this.duplicateCheck = false;
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


}

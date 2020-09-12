import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { CircularDetails } from '../model';
import { CircularServiceService } from '../circular-service.service';
import * as fileSaver from 'file-saver';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

let circularData: CircularDetails[] ;

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.component.html',
  styleUrls: ['./search-data.component.css']
})

export class SearchDataComponent implements OnInit {
  dataSource;
  displayedColumns: string[] = [ 'id', 'circularDetail', 'circularNumber', 'date', 'departmant', 'fileName' , 'download', 'edit'];
  //dataSource = new MatTableDataSource<CircularDetails>();
  selection = new SelectionModel<CircularDetails>(true, []);
  searchValue;
  showTable = false;
  showHeader = false;
  showSearch = false;
  type;


  constructor(private router: Router, private circularService: CircularServiceService) { }

  ngOnInit() {
    console.log('in search component');
    console.log(this.router.url);
    if (this.router.url === '/search') {
       this.showHeader = true;
    } else {
      this.showHeader = false;
    }
  }

  search() {
    console.log('In search method');
    console.log(this.searchValue);
    const clientName = this.circularService.clientName;
    if (this.searchValue !== '' && this.searchValue !== undefined ) {
    this.circularService.searchByKey(clientName, this.searchValue).subscribe((result) => {
      console.log(result);
      circularData = result;
      this.dataSource = result;
      if (circularData.length !== 0 ) {
          this.showTable = true;
      }
   });
  } else {
     this.showTable = false;
  }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CircularDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  download(row) {
     console.log('in download function');
     console.log(row);
     this.circularService.fileDownload(row.clientNumber, row.fileName).subscribe(response => {
     const blob: any = new Blob([response], { type: 'text/json; charset=utf-8' });
     const url = window.URL.createObjectURL(blob);
     // window.open(url);
    // window.location.href = response.url;
     fileSaver.saveAs(blob, row.fileName);
    }), error => console.log('Error downloading the file' + error),
                 () => console.info('File downloaded successfully');
  }

  edit(row) {
    console.log(row);
    this.circularService.editRow  = row;
    this.router.navigate(['admin/upload', 'edit']);
  }

  typeSelected(e) {
    console.log(e.target.value);
    this.searchValue = '';
    if(this.type === null || this.type === undefined || this.type === '') {
      this.showSearch = false;
      this.showTable = false;
    } else {
      this.showSearch = true;
      this.showTable = false;
    }
  }

}

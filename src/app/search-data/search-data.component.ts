import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { CircularDetails } from '../model';
import { CircularServiceService } from '../circular-service.service';
import * as fileSaver from 'file-saver';
import { HttpResponse } from '@angular/common/http';

let circularData: CircularDetails[] ;
//   {
//     id : 1,
//     circularDetail : 'detail1',
//     clientNumber : 'A1',
//     circularNumber : '1',
//     date : '29/01/2020',
//     departmant : 'ABC',
//     fileName : 'file_1',
//   },
//   {
//     id : 2,
//     circularDetail : 'detail2',
//     clientNumber : 'A2',
//     circularNumber : '2',
//     date : '20/03/2020',
//     departmant : 'DEF',
//     fileName : 'file_2',
//   },
//   {
//     id : 3,
//     circularDetail : 'detail3',
//     clientNumber : 'A3',
//     circularNumber : '3',
//     date : '04/04/2020',
//     departmant : 'GHI',
//     fileName : 'file_3',
//   },
//   {
//     id : 4,
//     circularDetail : 'detail4',
//     clientNumber : 'A4',
//     circularNumber : '4',
//     date : '29/01/2020',
//     departmant : 'IJK',
//     fileName : 'file_4',
//   }
// ];

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.component.html',
  styleUrls: ['./search-data.component.css']
})

export class SearchDataComponent implements OnInit {
  dataSource;
  displayedColumns: string[] = [ 'id', 'circularDetail', 'circularNumber', 'date', 'departmant', 'fileName' , 'download'];
  //dataSource = new MatTableDataSource<CircularDetails>();
  selection = new SelectionModel<CircularDetails>(true, []);
  searchValue;
  showTable = false;
  constructor(private circularService: CircularServiceService) { }

  ngOnInit() {
    
  }

  search() {
    console.log('In search method');
    console.log(this.searchValue);
    const clientName = this.circularService.clientName;
    this.circularService.searchByKey(clientName, this.searchValue).subscribe((result) => {
      console.log(result);
      circularData = result;
      this.dataSource = result;
      if (circularData.length !== 0 ) {
          this.showTable = true;
      }
   });
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

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { UserDetails, FileUpload, CircularDetails, EnquiryDetail, CatalogDetail, PODetail } from './model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CircularServiceService {

  private _isAdmin;
  private _clientName;
  private baseURL = 'http://localhost:8080/';
  private _editRow: CircularDetails;
  private _editCatalogRow: CatalogDetail;
  private _editEnquiryRow: EnquiryDetail;
  private _editPoRow: PODetail;
  private _currentUser: UserDetails;
  constructor(private http: HttpClient) { }

  get clientName(): string {
    return this._clientName;
   }

  set clientName(newName: string) {
    this._clientName = newName;
  }

  get currentUser(): UserDetails {
    return this._currentUser;
   }

  set currentUser(newName: UserDetails) {
    this._currentUser = newName;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
   }

  set isAdmin(isAdmin: boolean) {
    this._isAdmin = isAdmin;
  }

  get editRow(): CircularDetails {
    return this._editRow;
   }

  set editRow(row: CircularDetails) {
    this._editRow = row;
  }

  get editCatalogRow(): CatalogDetail {
    return this._editCatalogRow;
   }

  set editCatalogRow(row: CatalogDetail) {
    this._editCatalogRow = row;
  }

  get editEnquiryRow(): EnquiryDetail {
    return this._editEnquiryRow;
   }

  set editEnquiryRow(row: EnquiryDetail) {
    this._editEnquiryRow = row;
  }

  get editPoRow(): PODetail {
    return this._editPoRow;
   }

  set editPoRow(row: PODetail) {
    this._editPoRow = row;
  }

  login(user) {
    console.log('in user service funtion');
    console.log(user);
    const params = new HttpParams()
    .set('login.username', user.username)
    .set('login.password', user.password);
    return this.http.get<UserDetails>(this.baseURL + 'User-Login', {params} );
  }

  fileUpload(fileObj: FileUpload): Observable<any> {
    console.log('in service for upload');
    const headers = new HttpHeaders().set('clientName', fileObj.clientName).set('Authorization', 'Basic ' + btoa(this.currentUser.tokenUser+':'+ this.currentUser.token));
    // const HttpUploadOptions = {
    //   headers: new HttpHeaders({ 'clientName': '001', ResponseType: 'text'}, )
    // }
        const formdata: FormData = new FormData();
        formdata.append('file', fileObj.file);
        console.log(formdata);
        return this.http.post(this.baseURL + 'File/Upload', formdata,  { headers, responseType : 'text'});

  }

  checkDuplicate(clientName, circularNumber) {
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(this.currentUser.tokenUser + ':' +  this.currentUser.token));
    console.log('check duplicate service');
    console.log(clientName + ' ' + circularNumber);
    return this.http.get(this.baseURL + 'App/Duplicate-Circular/' + clientName + '/' + circularNumber, {headers});
  }

  saveCircular(circularDetails) {
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(this.currentUser.tokenUser + ':' +  this.currentUser.token));
    console.log('in service for save circular');
    console.log(circularDetails);
    return this.http.post(this.baseURL + 'App/Circular', circularDetails ,  { headers, responseType : 'text'});
  }


  searchByKey(clientName, key, searchCriteria, circularSearchByFilter: CircularDetails) {
    console.log('in service for search by key');
    console.log(clientName + ' ' + key);
    console.log(circularSearchByFilter);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(this.currentUser.tokenUser + ':' +  this.currentUser.token));
    if (searchCriteria === 'Generic') {
      return this.http.get<CircularDetails[]>(this.baseURL + 'App/Circular/' + clientName + '/' + key, {headers});
    } else {
      circularSearchByFilter.clientNumber = clientName;
      return this.http.post<CircularDetails[]>(this.baseURL + 'App/Circulars-Match', circularSearchByFilter, {headers});
    }
  }


  fileDownload(clientName, fileName): any {
    console.log('in file download service funtion');
    console.log(clientName + ' ' + fileName);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(this.currentUser.tokenUser + ':' +  this.currentUser.token));
      return this.http.get(this.baseURL + 'File/' + clientName + '/' + fileName, { headers, responseType: 'blob' });
  }

  checkDuplicatePoOrderNo(orderNo) {
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(this.currentUser.tokenUser + ':' +  this.currentUser.token));
    return this.http.get(this.baseURL + 'App/Duplicate-PurchaseOrder/' + orderNo, {headers});
  }

  savePODetail(poDetail){
    console.log('Save PO service');
    console.log(poDetail);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(this.currentUser.tokenUser + ':' +  this.currentUser.token));
    return this.http.post(this.baseURL + 'App/PurchaseOrders', poDetail ,  { headers, responseType : 'text'});
  }

  searchByKeyForPo(key, searchCriteria, poSearchByFilter: PODetail) {
    console.log('in service for search by key');
    console.log(key);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(this.currentUser.tokenUser + ':' +  this.currentUser.token));
    if (searchCriteria === 'Generic') {
     return this.http.get<PODetail[]>(this.baseURL + 'App/PurchaseOrders/' + key, {headers});
    } else {
     return this.http.post<PODetail[]>(this.baseURL + 'App/PurchaseOrders-Match' , poSearchByFilter, {headers});
    }
  }

  checkDuplicateEnquiry(enquiryNumber){
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(this.currentUser.tokenUser + ':' +  this.currentUser.token));
    return this.http.post(this.baseURL + 'App/Duplicate-Enquiry', enquiryNumber, {headers} );
  }


  saveEnquiryDetail(enquiryDetail){
    console.log('Save EnquiryDetail service');
    console.log(enquiryDetail);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(this.currentUser.tokenUser + ':' +  this.currentUser.token));
    return this.http.post(this.baseURL + 'App/Enquiry', enquiryDetail ,  { headers, responseType : 'text'});
  }

  searchByKeyForEnquiry(key, searchCriteria, enquirySearchByFilter: EnquiryDetail) {
    console.log('in service for search by key');
    console.log(key);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(this.currentUser.tokenUser + ':' +  this.currentUser.token));
    if (searchCriteria === 'Generic') {
     return this.http.get<EnquiryDetail[]>(this.baseURL + 'App/Enquiry/' + key, {headers});
    } else {
     return this.http.post<EnquiryDetail[]>(this.baseURL + 'App/Enquiry-Match' , enquirySearchByFilter, {headers});
    }
  }

  checkDuplicateCatalog(modelNo) {
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(this.currentUser.tokenUser + ':' +  this.currentUser.token));
    return this.http.get(this.baseURL + 'App/Duplicate-Catalog/' + modelNo, {headers});
  }


  saveCatalogDetail(catalogDetail){
    console.log('Save CatalogDetail service');
    console.log(catalogDetail);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(this.currentUser.tokenUser + ':' +  this.currentUser.token));
    return this.http.post(this.baseURL + 'App/Catalog', catalogDetail ,  { headers, responseType : 'text'});
  }

  searchByKeyForCatalog( key, searchCriteria, catalogSearchByFilter: CatalogDetail) {
    console.log('in service for search by key');
    console.log(key);
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(this.currentUser.tokenUser + ':' +  this.currentUser.token));
    if (searchCriteria === 'Generic') {
     return this.http.get<CatalogDetail[]>(this.baseURL + 'App/Catalog/' + key, {headers});
    } else {
      console.log('in Advanced search '+ catalogSearchByFilter);
     return this.http.post<CatalogDetail[]>(this.baseURL + 'App/Catalog-Match', catalogSearchByFilter, {headers});
    }
  }

}

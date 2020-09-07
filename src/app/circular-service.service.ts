import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import {Http, ResponseContentType, ResponseType} from '@angular/http';
import { UserDetails, FileUpload, CircularDetails } from './model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CircularServiceService {

  private _clientName;
  private baseURL = 'http://localhost:8080/';
  constructor(private http: HttpClient) { }

  get clientName(): string {
    return this._clientName;
   }

  set clientName(newName: string) {
    this._clientName = newName;
  }

  fileUpload(fileObj: FileUpload): Observable<any> {
    console.log('in service for upload');
    const headers = new HttpHeaders().set('clientName', fileObj.clientName);
    // const HttpUploadOptions = {
    //   headers: new HttpHeaders({ 'clientName': '001', ResponseType: 'text'}, )
    // }
        const formdata: FormData = new FormData();
        formdata.append('file', fileObj.file);
        console.log(formdata);
        return this.http.post(this.baseURL + 'File/Upload', formdata,  { headers, responseType : 'text'});

  }

  saveCircular(circularDetails) {
    console.log('in service for save circular');
    console.log(circularDetails);
    return this.http.post(this.baseURL + 'App/Circular', circularDetails ,  { responseType : 'text'});
  }

  checkDuplicate(clientName, circularNumber) {
    console.log('check duplicate service');
    console.log(clientName + ' ' + circularNumber);
    return this.http.get(this.baseURL + 'App/Duplicate-Circular/' + clientName + '/' + circularNumber);
  }

  searchByKey(clientName, key) {
    console.log('in service for search by key');
    console.log(clientName + ' ' + key);
    return this.http.get<CircularDetails[]>(this.baseURL + 'App/Circular/' + clientName + '/' + key);
  }

  login(user) {
    console.log('in user service funtion');
    console.log(user);
    const params = new HttpParams()
    .set('login.username', user.username)
    .set('login.password', user.password);
    return this.http.get<UserDetails>(this.baseURL + 'User-Login', {params} );
  }

  fileDownload(clientName, fileName): any {
    console.log('in file download service funtion');
    console.log(clientName + ' ' + fileName);
      return this.http.get(this.baseURL + 'File/' + clientName + '/' + fileName, { responseType: 'blob' });
  }
}

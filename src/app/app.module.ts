import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatDatepickerModule,
  MatNativeDateModule, MatAutocompleteModule, MatCheckboxModule, MatIconModule,  MatTableModule, 
  MatPaginatorModule, MatSnackBarModule, MatRadioModule, MAT_DATE_LOCALE } from '@angular/material';
import { NativeDateAdapter, DateAdapter,MAT_DATE_FORMATS } from '@angular/material';
import { formatDate } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { HeaderComponent } from './header/header.component';
import { UploadDataComponent } from './upload-data/upload-data.component';
import { SearchDataComponent } from './search-data/search-data.component';
import { CircularServiceService } from './circular-service.service';
import { AuthGuard } from './auth.guard';
import { CatUploadDataComponent } from './cat-upload-data/cat-upload-data.component';
import { EnquiryUploadDataComponent } from './enquiry-upload-data/enquiry-upload-data.component';
import { PoUploadDataComponent } from './po-upload-data/po-upload-data.component';
import { RegistrationComponent } from './registration/registration.component';
import { PICK_FORMATS, PickDateAdapter } from './date-format';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
    children: [

      {
        path: 'upload',
        component: UploadDataComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'upload/:editCircular',
        component: UploadDataComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'search',
        component: SearchDataComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'poUpload',
        component: PoUploadDataComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'poUpload/:editPo',
        component: PoUploadDataComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'enquiry',
        component: EnquiryUploadDataComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'enquiry/:editEnquiry',
        component: EnquiryUploadDataComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'catalog',
        component: CatUploadDataComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'catalog/:editCatalog',
        component: CatUploadDataComponent,
        canActivate: [AuthGuard],
      },
    ]

  },
  {
    path: 'search',
    component: SearchDataComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'poUploadData',
  //   component: PoUploadDataComponent
  // }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminPageComponent,
    HeaderComponent,
    UploadDataComponent,
    SearchDataComponent,
    CatUploadDataComponent,
    EnquiryUploadDataComponent,
    PoUploadDataComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatRadioModule,
    RouterModule.forRoot(routes),
  ],
  providers: [CircularServiceService, AuthGuard,
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}],
  bootstrap: [AppComponent]
})
export class AppModule { }

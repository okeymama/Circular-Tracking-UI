import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatDatepickerModule,
  MatNativeDateModule, MatAutocompleteModule, MatCheckboxModule, MatIconModule,  MatTableModule } from '@angular/material';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { HeaderComponent } from './header/header.component';
import { UploadDataComponent } from './upload-data/upload-data.component';
import { SearchDataComponent } from './search-data/search-data.component';
import { CircularServiceService } from './circular-service.service';
import { AuthGuard } from './auth.guard';


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
        path: 'upload/:edit',
        component: UploadDataComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'search',
        component: SearchDataComponent,
        canActivate: [AuthGuard],
      },
    ]

  },
  {
    path: 'search',
    component: SearchDataComponent
  },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminPageComponent,
    HeaderComponent,
    UploadDataComponent,
    SearchDataComponent
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
    RouterModule.forRoot(routes),
  ],
  providers: [CircularServiceService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

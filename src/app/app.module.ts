import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
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


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [

      {
        path: 'upload',
        component: UploadDataComponent
      },
      {
        path: 'search',
        component: SearchDataComponent
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
  providers: [CircularServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SpreadsheetModule} from '@syncfusion/ej2-angular-spreadsheet';
import {NavbarComponent} from './navbar/navbar.component';
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FilesModalComponent} from './files-modal/files-modal.component';
import { MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilesModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpreadsheetModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

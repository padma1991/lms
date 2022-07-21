import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { UsrtransComponent } from './admin/usrtrans/usrtrans.component';
import { BooksComponent } from './admin/books/books.component';
import { TransactionComponent } from './user/transaction/transaction.component';
import { CheckinComponent } from './user/checkin/checkin.component';
import { BorrowSearchPipe } from './pipes/borrow-search.pipe';
import { PenaltyComponent } from './admin/penalty/penalty.component';
import { DatePipe } from '@angular/common';
import { SharedService } from './services/shared.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    UsrtransComponent,
    BooksComponent,
    TransactionComponent,
    CheckinComponent,
    BorrowSearchPipe,
    PenaltyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,  
  ],
  providers: [DatePipe, SharedService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }

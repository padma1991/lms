import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BooksComponent } from './admin/books/books.component';
import { PenaltyComponent } from './admin/penalty/penalty.component';
import { UsrtransComponent } from './admin/usrtrans/usrtrans.component';
import { LoginComponent } from './login/login.component';
import { CheckinComponent } from './user/checkin/checkin.component';
import { TransactionComponent } from './user/transaction/transaction.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {
    path:'user', component: UserComponent, children:[
      {path: '', component: TransactionComponent},
      {path: 'dashboard', component: TransactionComponent},
      {path: 'checkin', component: CheckinComponent}
    ]
  },
  {
    path:'admin', component: AdminComponent, children:[
      {path: '', component: BooksComponent},
      {path: 'dashboard', component: BooksComponent},
      {path: 'transaction', component: UsrtransComponent},
      {path: 'penalty', component: PenaltyComponent},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

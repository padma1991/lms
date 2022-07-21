import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { TransService } from 'src/app/services/trans.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  constructor(private route:Router, private transService:TransService, private bookService: BookService) { }
  public trans = [];

  ngOnInit() 
  {
    var userid :number = +localStorage.getItem("UserId");
    var today = new Date().setHours(23, 59, 59, 999);
    this.transService.getTransbyUserID(userid).subscribe(data => {
      
     this.trans = data;

      this.trans.forEach(element => {
        let checkout_date = new Date(element.checkoutdate).setHours(23, 59, 59, 999);
        if(checkout_date < today)
        {
          let days = this.getDayDiff(checkout_date, today);
          var fine = element.penaltyfee * days;
          element['fine'] = fine;
        }
        else
        {
          element['fine'] = 0;
        }
  
      });
  
    });
  }
  
  getDayDiff(startDate: Number, endDate: Number): number {
  const msInDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
  }

  checkout(trans)
  {
    let cnf = confirm("Press Ok to checkout the book");
    if (cnf == true) {
      /*post method calling*/
      trans['status'] = 0;
      this.transService.updateTrans(trans).subscribe(
        data => console.log('Success!', data),
        error => console.error('Error!', error)
      );
      this.bookService.getBook(trans.bookid).subscribe(data =>{
          data.avlCopies += 1;
          this.bookService.updateBook(data).subscribe(data => console.log('book copies updated'), 
          error => console.log(error));
      });
    }
  }

  paypenalty(trans)
  {
    let cnf = confirm("Press Ok to request admin for penalty");
    if (cnf == true) {
      /*post method calling*/
      trans['penalty'] = true;
      this.transService.updateTrans(trans).subscribe(
        data => console.log('Success!', data),
        error => console.error('Error!', error)
      );
    }
  }
}

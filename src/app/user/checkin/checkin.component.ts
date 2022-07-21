import {formatDate} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITrans } from 'src/app/models/ITrans';
import { BookService } from 'src/app/services/book.service';
import { TransService } from 'src/app/services/trans.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  trans: ITrans[];
  cartLength = 0;
  constructor(private bookService:BookService, private transService:TransService, private router:Router) { }
  public books = [];
  bookSearch = '';
  currentDate;
  ngOnInit() 
  { 
    this.currentDate = new Date();
    this.bookService.getBooksByStatus().subscribe(data => this.books = data);
    this.transService.getTransbyUserID(+localStorage.getItem("UserId")).subscribe(data => { 
        
      this.trans = data;
      data.forEach(element => {
        console.log(element);
        if(element.status == 1)
          this.cartLength++;
      });
      console.log(this.cartLength);   
    
  });
}

validateBook(book)
{
    let data = this.trans.find(obj => obj.bookid == book.id);
    if(data == null)
    return true;
    else if(data.status == 0)
    {
      console.log('book satus = '+data.status);
         return true;
    }
    return false;

}

  addtoCart(book)
  {
    if(this.cartLength < 3)
    {
      if(this.validateBook(book))
      {

        var numberOfDaysToAdd = book.days;
        console.log("numberOfDaysToAdd = "+numberOfDaysToAdd);
        console.log(this.currentDate.getDate());
        console.log(this.currentDate.getDate() + Number(numberOfDaysToAdd));
        var result = this.currentDate.setDate(this.currentDate.getDate() + Number(numberOfDaysToAdd));
        var checkoutdate = formatDate(new Date(result), 'yyyy-MM-dd', 'en-IN');
        //var checkoutdate = this.datePipe.transform(new Date(result), 'yyyy-mm-dd');
        console.log(new Date(result).toLocaleDateString());
        var trans = {
          userid: localStorage.getItem("UserId"),
          username: localStorage.getItem("UserName"),
          bookid: book.id,
          bookname: book.title,
          checkindate: formatDate(new Date(), 'yyyy-MM-dd', 'en-IN'),
          checkoutdate: checkoutdate,
          penalty: false,
          status: 1,
          penaltyfee: book.penaltyfee,
          days: book.days
        };
        this.transService.putTrans(trans).subscribe(
          data =>{
            console.log(data);
            alert('Success! Book added to cart successfully');
            this.router.navigateByUrl('user/dashboard');
          },
          error => console.error('Error!', error)
        );
        book['avlCopies'] = book.copies - 1;
        this.bookService.updateBook(book).subscribe(data => console.log(data), error=> console.log(error));
      }
      else
      {
        alert("Book already present in cart");
      }
      
    }
    else
      alert("You cannot add more than 3 books in to the cart");

    
  }

}

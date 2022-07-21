import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBooks } from 'src/app/models/IBooks';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['../admin.component.css']
})
export class BooksComponent implements OnInit {
  title;author;copies;days;penalty;
  constructor(private route:Router, public bookservice:BookService) { }

  public books = [];
  bookform;
  public images = ['../../assets/images/book.jpg','../../assets/images/yoab-anderson-IHC5LPAoGrs-unsplash.jpg', '../../assets/images/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg'];

  ngOnInit() {
    this.bookservice.getBooks().subscribe(data => this.books = data);

    
  }

  validate()
  {
    let error_message = '';
    if(!this.title)
      error_message = 'Plese enter the title';
    else if(!this.author)
      error_message = 'Plese enter the author name';
    else if(!this.copies)
      error_message = 'Plese enter the copies';
    else if(!this.days)
      error_message = 'Plese enter the days';
    else if(!this.penalty)
      error_message = 'Plese enter the penalty';
    
    if(error_message)
    {
      alert(error_message);
      return false;
    }
    return true;
  }

  onSubmit(data) {
    if(this.validate())
    {
      console.log(data);
      let cnf = confirm("Press Ok to add book");
      if (cnf == true) {
        /*post method calling*/
  
        this.bookservice.putBook(data).subscribe(
          data => 
          {
            alert("Books inserted successfully");
            this.resetData();
          },
          error => console.error('Error!', error)
        );
  
        this.bookform.reset();
      }
    }
    
  }

  resetData()
  {
    this.author='';
    this.title='';
    this.days='';
    this.penalty='';
    this.copies='';
  }

  OnUpdate(currentBook) {
    console.log(currentBook.id);
    if (currentBook.id != null) {
      console.log("Update!!");
      if(this.validate())
      {
        let cnf = confirm("Press Ok to update the book");
        if (cnf == true) {
          this.update(currentBook);

        }
      }

    }
  }

  update(book: IBooks) {
    this.bookservice.updateBook(book).subscribe(data => 
      {
        alert("Book updated successfully");
        this.resetData();
      },
      error => console.error('Error!', error));
  }

  delete(currentBook) {
    let cnf = confirm("Press Ok to delete the book..");
    if (cnf == true) {
      currentBook['status'] = 0;
      this.update(currentBook);
    }
  }

  edit(book: IBooks) {
    console.log('edit book = '+book.id);
    this.bookservice.currentBook = Object.assign({}, book)
  }

}


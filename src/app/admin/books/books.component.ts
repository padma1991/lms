import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBooks } from 'src/app/models/IBooks';
import { BookService } from 'src/app/services/book.service';
import {ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['../admin.component.css']
})
export class BooksComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtnEdit') closeBtnEdit: ElementRef;
  title;author;copies;days;penalty;
  constructor(private route:Router, public bookservice:BookService, private fb: FormBuilder) { }

  public books = [];
  bookform;
  public images = ['../../assets/images/book.jpg','../../assets/images/yoab-anderson-IHC5LPAoGrs-unsplash.jpg', '../../assets/images/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg'];

  ngOnInit() {
    this.bookservice.getBooks().subscribe(data => this.books = data);
    this.bookform = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      status: ['', [Validators.required,]],
      copies: ['', [Validators.required, Validators.min(1)]],
      author: [''],
      penalty: [''],
      days: ['']
    })
    
  }

  validate()
  {
    let error_message = '';
    if(!this.title)
      error_message = 'Please enter the title';
    else if(!this.author)
      error_message = 'Please enter the author name';
    else if(!this.copies)
      error_message = 'Please enter the copies';
    else if(this.copies <= 1)
      error_message = 'Please enter copies more than 1';
    else if(!this.days)
      error_message = 'Please enter the days';
    else if(this.days <= 1)
      error_message = 'Please enter days more than 1';
    else if(!this.penalty)
      error_message = 'Please enter the penalty';
    else if(this.penalty <= 1)
      error_message = 'Please enter penalty more than 1';
    
    if(error_message)
    {
      alert(error_message);
      return false;
    }
    return true;
  }

  onSubmit(data) {
    console.log(data);
    data['avlCopies'] = data.copies;
    if(this.validate())
    {
      let cnf = confirm("Press Ok to add book");
      if (cnf == true) {
        /*post method calling*/
  
        this.bookservice.putBook(data).subscribe(
          data => 
          {
            alert("Books inserted successfully");
            this.resetData();
            this.closeBtn.nativeElement.click();
            this.bookform.reset();
            this.ngOnInit();
          },
          error => console.error('Error!', error)
        );
       
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
      console.log("Update!!"+currentBook.copies);
      currentBook['avlCopies'] = currentBook.copies;
      let cnf = confirm("Press Ok to update the book");
        if (cnf == true) {
          this.update(currentBook);
      }

    }
  }

  update(book: IBooks) {
    this.bookservice.updateBook(book).subscribe(data => 
      {
        alert("Book updated successfully");
        this.resetData();
        this.closeBtnEdit.nativeElement.click();
        this.bookform.reset();
        this.ngOnInit();
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


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBooks } from '../models/IBooks';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private urlBooks: string = "";

  constructor(private http: HttpClient, private sharedService: SharedService) 
  {
    this.urlBooks = sharedService.globalUrl + '/books';
  }
  getBooks(): Observable<IBooks[]> {
    return this.http.get<IBooks[]>(this.urlBooks);
  }

  getBooksByStatus(): Observable<IBooks[]> {
    return this.http.get<IBooks[]>(this.urlBooks+'?status=1');
  }

  getBook(id: number): Observable<IBooks> {
    return this.http.get<IBooks>(this.urlBooks + '/' + id);
  }

  putBook(book: IBooks) {
    return this.http.post<IBooks>(this.urlBooks, book)
  }
  deleteBook(id: number): Observable<IBooks> {
    return this.http.delete<IBooks>(this.urlBooks + '/' + id);
  }
  updateBook(book: IBooks): Observable<IBooks> {
    console.log(book.avlCopies);
    return this.http.put<IBooks>(this.urlBooks + '/' + book.id, book);
  }

  currentBook: IBooks = {

    id: null,
    title: '',
    author: '',
    copies: null,
    days: null,
    status: '',
    penalty: null,
    imagePath: null,
    avlCopies: null
  }


}

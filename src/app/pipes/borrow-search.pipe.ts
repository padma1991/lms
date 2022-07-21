import { Pipe, PipeTransform } from '@angular/core';
import { IBooks } from '../models/IBooks';

@Pipe({
  name: 'borrowSearch'
})
export class BorrowSearchPipe implements PipeTransform {

  transform(books: IBooks[], borrowSearch: string): IBooks[] {
    if (borrowSearch) {
      return books.filter(IBook => {
        return IBook.title.toLowerCase().includes(borrowSearch.toLowerCase())
      });
    }
    else {
      return books;
    }
  }
}

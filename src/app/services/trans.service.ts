import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITrans } from '../models/ITrans';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class TransService {

  private urlTrans: string = "";

  constructor(private http: HttpClient, private sharedService: SharedService) 
  {
    this.urlTrans = sharedService.globalUrl + '/transactions';
  }
  getTransactions(): Observable<ITrans[]> {
    return this.http.get<ITrans[]>(this.urlTrans);
  }

  getTransaction(id: number): Observable<ITrans> {
    return this.http.get<ITrans>(this.urlTrans + '/' + id);
  }

  getTransbyUserID(id: number): Observable<ITrans[]> {
    return this.http.get<ITrans[]>(this.urlTrans + '?userid='+id);
  }

  getTransbyPenalty(): Observable<ITrans[]> {
    return this.http.get<ITrans[]>(this.urlTrans + '?penalty=true');
  }

  putTrans(trans) {
    return this.http.post<ITrans>(this.urlTrans, trans)
  }
  deleteTrans(id: number): Observable<ITrans> {
    return this.http.delete<ITrans>(this.urlTrans + '/' + id);
  }
  updateTrans(trans: ITrans): Observable<ITrans> {
    return this.http.put<ITrans>(this.urlTrans + '/' + trans.id, trans);
  }

}

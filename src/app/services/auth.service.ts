import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/Iuser';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlAdmin: string = "";

  constructor(private http: HttpClient, private sharedService: SharedService) 
  {
    console.log(sharedService.globalUrl);
    this.urlAdmin = sharedService.globalUrl + '/users';
  }
  getAdmins(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.urlAdmin);
  }

  getAdmin(id: number): Observable<IUser> {
    return this.http.get<IUser>(this.urlAdmin + '/' + id);
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logincomponent',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authSer: AuthService) { }

  public users = [];
  validate;

  ngOnInit() {
    localStorage.clear();
    this.authSer.getAdmins().subscribe(data => this.users = data);
  }

  onClickSubmit(data) {
    
    this.validate = false;
    this.users.forEach(user => {

      if(user.email == data.uid && user.password == data.pwd)
      {
        this.validate = true;
        if(user.role == 0)
        {
          localStorage.setItem('isAdmin', 'true');
          localStorage.setItem('AdminName', user.name);
          localStorage.setItem('AdminId', user.id);
          this.router.navigateByUrl('admin');

        }
        else
        {
          localStorage.setItem('isUser', 'true');
          localStorage.setItem('UserName', user.name);
          localStorage.setItem('UserId', user.id);
          this.router.navigateByUrl('user');

        }
      }
    });
    if (this.validate == false) {
      alert("Invalid email id or password...");

    }
 }

}

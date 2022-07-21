import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }
  UserName;
  IsUser = false;
  ngOnInit() 
  {
    this.UserName = localStorage.getItem("UserName");
    this.IsUser = localStorage.getItem("isUser") == "true"?true:false;
  }

  ToggleNavBar () 
  {
    let element: HTMLElement = document.getElementsByClassName( 'navbar-toggler' )[ 0 ] as HTMLElement;
    if ( element.getAttribute( 'aria-expanded' ) == 'true' ) 
    {
      element.click();
    }
  }

}

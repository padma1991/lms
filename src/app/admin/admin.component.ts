import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }
  AdminName;
  IsAdmin = false;
  ngOnInit() 
  {
    this.AdminName = localStorage.getItem("AdminName");
    this.IsAdmin = localStorage.getItem("isAdmin") == "true"?true:false;
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

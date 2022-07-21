import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './services/shared.service';
import { Utility } from './utility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LMS';
  constructor(public router: Router, private http: HttpClient, private sharedService: SharedService,) {
    this.http.get('assets/url.json').subscribe(res => {
      this.sharedService.sendMessage(res["url"]);
      Utility.isUrl.next(true);
      this.router.initialNavigation();
    });
  }
}

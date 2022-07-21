import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransService } from 'src/app/services/trans.service';

@Component({
  selector: 'app-usrtrans',
  templateUrl: './usrtrans.component.html',
  styleUrls: ['./usrtrans.component.scss']
})
export class UsrtransComponent implements OnInit {

  constructor(private route:Router, private transService:TransService) { }
  public trans = [];
  
  ngOnInit() 
  {
    var today = new Date().setHours(23, 59, 59, 999);
    this.transService.getTransactions().subscribe(data => {
      this.trans = data;

      this.trans.forEach(element => {
        let checkout_date = new Date(element.checkoutdate).setHours(23, 59, 59, 999);
        if(checkout_date < today)
        {
          let days = this.getDayDiff(checkout_date, today);
          var fine = element.penaltyfee * days;
          element['fine'] = fine;
        }
        else
        {
          element['fine'] = 0;
        }
  
      });
  
    });
    
  }

 getDayDiff(startDate: Number, endDate: Number): number {
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
  }

}

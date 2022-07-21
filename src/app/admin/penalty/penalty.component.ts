import { Component, OnInit } from '@angular/core';
import { TransService } from 'src/app/services/trans.service';

@Component({
  selector: 'app-penalty',
  templateUrl: './penalty.component.html',
  styleUrls: ['./penalty.component.scss']
})
export class PenaltyComponent implements OnInit {

  constructor(private transService: TransService) { }
  public trans = [];
  ngOnInit() 
  {
    this.transService.getTransbyPenalty().subscribe(data => {
      this.trans = data;
    });
  }

  onComplete(trans)
  {
    trans['status'] = 0;
    this.transService.updateTrans(trans).subscribe(
      data => alert('Penalty updated successfully'),
      error => console.log("Penalty error = "+error));
  }

}

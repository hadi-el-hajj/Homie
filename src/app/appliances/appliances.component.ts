import { Component, OnInit } from '@angular/core';
import { AppliancesService } from '../appliances.service'

@Component({
  selector: 'app-appliances',
  templateUrl: './appliances.component.html',
  styleUrls: ['./appliances.component.css']
})
export class AppliancesComponent implements OnInit {
  public timeNeeded : number = 10000;
  public washingMachineTimeLeft : number = this.timeNeeded/1000  ;
  public done : boolean = this._appliancesService.getStatus();

  constructor(
    private _appliancesService: AppliancesService
  ) {}


  ngOnInit(): void {
  }

  public launchTimer(){
    this.done = true;
    this._appliancesService.launchTimer(this.timeNeeded);
    this._appliancesService.emitStatus.subscribe( status => {
      this.done = status;
      console.log('Clean the filter now !!!!!!');
    });
  }

  // public washingMachineCountdown(){
  //     var timer = setInterval(() => {
  //       --this.washingMachineTimeLeft;
  //       if(this.washingMachineTimeLeft===0){
  //         this.washingMachineTimeLeft=this.washingMachineTimer/1000;
  //         clearInterval(timer);
  //       }
  //      } ,1000);
  // }


}

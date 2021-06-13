import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppliancesService } from '../appliances.service'

@Component({
  selector: 'app-appliances',
  templateUrl: './appliances.component.html',
  styleUrls: ['./appliances.component.css']
})
export class AppliancesComponent implements OnInit, OnDestroy {
  //Subscriptions
  public wmSubscription : Subscription;
  public dwmSubscription : Subscription;
  public fSubscription : Subscription;

  //Get machines status
  public wmDone : boolean = this._appliancesService.getStatus("wm");
  public dwmDone : boolean = this._appliancesService.getStatus("dwm");
  public fDone : boolean = this._appliancesService.getStatus("f");

  constructor(
    private _appliancesService: AppliancesService
  ) {
    this.wmSubscription = this._appliancesService.emit_wm_Status.subscribe( status => {
      this.wmDone = status;
    });
    this.dwmSubscription = this._appliancesService.emit_dwm_Status.subscribe( status => {
      this.dwmDone = status;
    });
    this.fSubscription = this._appliancesService.emit_f_Status.subscribe( status => {
      this.fDone = status;
    });
  }


  ngOnInit(): void {

  }

  public wmLaunchTimer(){
    this.wmDone = true;
    this._appliancesService.wmTimer();
  }

  public dwmLaunchTimer(){
    this.dwmDone = true;
    this._appliancesService.dwmTimer();
  }

  public fLaunchTimer(){
    this.fDone = true;
    this._appliancesService.fTimer();
  }

  public ngOnDestroy(){
    this.wmSubscription.unsubscribe();
    this.dwmSubscription.unsubscribe();
    this.fSubscription.unsubscribe();
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

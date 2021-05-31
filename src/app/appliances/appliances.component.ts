import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appliances',
  templateUrl: './appliances.component.html',
  styleUrls: ['./appliances.component.css']
})
export class AppliancesComponent implements OnInit {
  public washingMachineDone : boolean = false;
  public washingMachineTimer : number = 10000;
  public washingMachineTimeLeft : number = this.washingMachineTimer/1000  ;

  constructor() { }

  ngOnInit(): void {
  }

  public washingMachine(){
    this.washingMachineDone = true;
    setTimeout(() => this.washingMachineDone = false,this.washingMachineTimer);
    this.washingMachineCountdown();
  }

  public washingMachineCountdown(){
      var timer = setInterval(() => {
        --this.washingMachineTimeLeft;
        if(this.washingMachineTimeLeft===0){
          this.washingMachineTimeLeft=this.washingMachineTimer/1000;
          clearInterval(timer);
        }
       } ,1000);
  }
}

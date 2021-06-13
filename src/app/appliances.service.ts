import { getLocaleTimeFormat } from '@angular/common';
import { NullTemplateVisitor } from '@angular/compiler';
import { BuiltinFunctionCall } from '@angular/compiler/src/compiler_util/expression_converter';
import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppliancesService{
  public notifications : string[] = [];
  public notificationsTiming: string[] = [];

  //Washing Machine Parameters
  public wmTimeNeeded : number = 12000;
  public wmStatus : string | null = "false";
  public wmTimerStartedOn : number | null = null;

  //Dish Washing Machine Parameters
  public dwmTimeNeeded : number = 12000;
  public dwmStatus : string | null = "false";
  public dwmTimerStartedOn : number | null = null;

  //Fridge Parameters
  public fTimeNeeded : number = 12000;
  public fStatus : string | null = "false";
  public fTimerStartedOn : number | null = null;

  public emit_wm_Status: EventEmitter<boolean> = new EventEmitter<boolean>();
  public emit_dwm_Status: EventEmitter<boolean> = new EventEmitter<boolean>();
  public emit_f_Status: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    //get status variables from local storage
    this.wmStatus = localStorage.getItem("wmStatus");
    console.log(this.wmStatus);
    this.dwmStatus = localStorage.getItem("dwmStatus");
    console.log(this.dwmStatus);
    this.fStatus = localStorage.getItem("fStatus");
    console.log(this.fStatus);
    if(this.wmStatus === null){
      localStorage.setItem("wmStatus","false");
    }
    if(this.dwmStatus === null){
      localStorage.setItem("dwmStatus","false");
    }
    if(this.fStatus === null){
      localStorage.setItem("fStatus","false");
    }

    //get time variables from local storage
    if(localStorage.getItem("wmTimerStartedOn") !== null){
      this.wmTimerStartedOn=parseFloat(localStorage.getItem("wmTimerStartedOn"));
    }
    if(localStorage.getItem("dwmTimerStartedOn") !== null){
      this.dwmTimerStartedOn=parseFloat(localStorage.getItem("dwmTimerStartedOn"));
    }
    if(localStorage.getItem("fTimerStartedOn") !== null){
      this.fTimerStartedOn=parseFloat(localStorage.getItem("fTimerStartedOn"));
    }
    console.log(this.wmTimerStartedOn);
    console.log(this.dwmTimerStartedOn);
    console.log(this.fTimerStartedOn);

    //resume timers if task time has not passed yet
    this.wmResumeTimer();
    this.dwmResumeTimer();
    this.fResumeTimer();

    //get notifications and notifications timing from local storage
    if(localStorage.getItem("Notifications") !== null){
      this.notifications=JSON.parse(localStorage.getItem("Notifications"));
    }
    console.log(localStorage.getItem("Notifications"));
    if(localStorage.getItem("NotificationsTiming") !== null){
      this.notificationsTiming=JSON.parse(localStorage.getItem("NotificationsTiming"));
    }
    console.log(localStorage.getItem("NotificationsTiming"));

  }

  public wmResumeTimer(){
    let timeElapsed = new Date().getTime() - this.wmTimerStartedOn;
    if (timeElapsed > this.wmTimeNeeded) {
        this.wmStatus = "false";
        localStorage.setItem("wmStatus","false");
        this.emit_wm_Status.emit(this.wmStatus==="true");
        //SHOULD ADD NOTIFICATION + TIMING TO THE ARRAY HERE, AND ALSO MOVE LINES 71 -> 78 IN ONE
        //OF THESE FUNCTIONS SO WE GET THE LATEST VERSION OF NOTIFICATIONS ON STARTUP (SHOULD BE
        //IN THE LAST CALLED FUNCTION UPON THESE 3 RESUMETIMER FUNCTIONS)
        //remark: notifications are going to need sorting afterwards !!!
      } else {
      setTimeout(() => {
        this.wmStatus = "false";
        localStorage.setItem("wmStatus","false");
        this.emit_wm_Status.emit(this.wmStatus==="true");
        this.adddNotification("Clean the filter !!!");
      }, this.wmTimeNeeded - timeElapsed);
    }
  }

  public dwmResumeTimer(){
    let timeElapsed = new Date().getTime() - this.dwmTimerStartedOn;
    if (timeElapsed > this.dwmTimeNeeded) {
      this.dwmStatus = "false";
      localStorage.setItem("dwmStatus","false");
      this.emit_dwm_Status.emit(this.dwmStatus==="true");
    } else {
      setTimeout(() => {
        this.dwmStatus = "false";
        localStorage.setItem("dwmStatus","false");
        this.emit_dwm_Status.emit(this.dwmStatus==="true");
        this.adddNotification("Remove the dishes !!!");
      }, this.dwmTimeNeeded - timeElapsed);
    }
  }

  public fResumeTimer(){
    let timeElapsed = new Date().getTime() - this.fTimerStartedOn;
    if (timeElapsed > this.fTimeNeeded) {
      this.fStatus = "false";
      localStorage.setItem("fStatus","false");
      this.emit_f_Status.emit(this.fStatus==="true");
    } else {
      setTimeout(() => {
        this.fStatus = "false";
        localStorage.setItem("fStatus","false");
        this.emit_f_Status.emit(this.fStatus==="true");
        this.adddNotification("Clean the fridge !!!");
      }, this.fTimeNeeded - timeElapsed);
    }
  }

  //returns the status of a machine
  public getStatus(machine : string) : boolean {
    let status : string | null = "false";
    switch(machine) {
      case "wm":
        status = this.wmStatus;
        break;
      case "dwm":
        status = this.dwmStatus;
        break;
      case "f":
        status = this.fStatus;
        break;
    }
    return status === "true";
  }

  public getNotifications() : string[] {
    return this.notifications;
  }

  public getNotificationsTimings() : string[] {
    return this.notificationsTiming;
  }

  public adddNotification( message : string ) : void {
    //SHOULD ADD A FATE ARGUMENT SO A NOTIFICATION CAN BE TIMESTAMPED WITH THE RIGHT DATE
    //IF TASK WAS COMPLETED BUT USER WAS NOT CONNECTED DURING TIME OF COMPLETION (NOTIFICATIONS ARE
    //ADDED TO LOCAL STORAGE AFTER THE USER RECONNECTS, I.E. IF WE TIMESTAMP THE NOTIFICATIONS
    //WITH CURRENT DATE IT IS ERRONEOUS)
    this.notifications.unshift(message);
    this.notificationsTiming.unshift(`${new Date().toUTCString()}`);
    //change the variable set for the notifications array in localStorage each time a notification is pushed
    //same for notifications timestamps
    //this is not optimal behavior => an update will come soon as I start optimizing the code (same for
    //everything I might have left unchecked until now, like code repetition for example)
    localStorage.setItem("Notifications",JSON.stringify(this.notifications));
    localStorage.setItem("NotificationsTiming",JSON.stringify(this.notificationsTiming));
  }

  public wmTimer() : void {
    this.wmStatus = "true";
    localStorage.setItem("wmStatus","true");
    localStorage.setItem("wmTimerStartedOn",new Date().getTime().toString());
    setTimeout(() => {
      this.wmStatus = "false";
      localStorage.setItem("wmStatus","false");
      this.emit_wm_Status.emit(this.wmStatus==="true");
      this.adddNotification("Clean the filter !!!");
    }, this.wmTimeNeeded);
  }

  public dwmTimer() : void {
    this.dwmStatus = "true";
    localStorage.setItem("dwmStatus","true");
    localStorage.setItem("dwmTimerStartedOn",new Date().getTime().toString());
    setTimeout(() => {
      this.dwmStatus = "false";
      localStorage.setItem("dwmStatus","false");
      this.emit_dwm_Status.emit(this.dwmStatus==="true");
      this.adddNotification("Remove the dishes !!!");
    }, this.dwmTimeNeeded);
  }

  public fTimer() : void {
    this.fStatus = "true";
    localStorage.setItem("fStatus","true");
    localStorage.setItem("fTimerStartedOn",new Date().getTime().toString());
    setTimeout(() => {
      this.fStatus = "false";
      localStorage.setItem("fStatus","false");
      this.emit_f_Status.emit(this.fStatus==="true");
      this.adddNotification("Clean the fridge !!!");
    }, this.fTimeNeeded);
  }
}

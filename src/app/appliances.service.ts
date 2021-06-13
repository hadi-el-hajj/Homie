import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppliancesService {
  public notifications : string[] = [];
  public notificationsTiming: string[] = [];

  //Washing Machine Parameters
  public wmTimeNeeded : number = 5000;
  public wmStatus : boolean = false;

  //Dish Washing Machine Parameters
  public dwmTimeNeeded : number = 5000;
  public dwmStatus : boolean = false;

  //Fridge Parameters
  public fTimeNeeded : number = 5000;
  public fStatus : boolean = false;

  public emit_wm_Status: EventEmitter<boolean> = new EventEmitter<boolean>();
  public emit_dwm_Status: EventEmitter<boolean> = new EventEmitter<boolean>();
  public emit_f_Status: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  //returns the status of a machine
  public getStatus(machine : string) : boolean {
    let status = false;
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
    return status;
  }

  public getNotifications() : string[] {
    return this.notifications;
  }

  public getNotificationsTimings() : string[] {
    return this.notificationsTiming;
  }

  public adddNotification( message : string ) : void {
    this.notifications.unshift(message);
    this.notificationsTiming.unshift(`${new Date().toUTCString()}`);
  }

  public wmTimer() : void {
    this.wmStatus = true;
    setTimeout(() => {
      this.wmStatus = false;
      this.emit_wm_Status.emit(this.wmStatus);
      this.adddNotification("Clean the filter !!!");
    }, this.wmTimeNeeded);
  }

  public dwmTimer() : void {
    this.dwmStatus = true;
    setTimeout(() => {
      this.dwmStatus = false;
      this.emit_dwm_Status.emit(this.dwmStatus);
      this.adddNotification("Remove the dishes !!!");
    }, this.dwmTimeNeeded);
  }

  public fTimer() : void {
    this.fStatus = true;
    setTimeout(() => {
      this.fStatus = false;
      this.emit_f_Status.emit(this.fStatus);
      this.adddNotification("Clean the fridge !!!");
    }, this.fTimeNeeded);
  }
}

import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppliancesService {
  public status : boolean = false;
  public emitStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  public getStatus() : boolean {
    return this.status;
  }

  public launchTimer( timeNeeded: number) : void {
    this.status = true;
    setTimeout(() => {
      this.status = false;
      this.emitStatus.emit(this.status);
    }, timeNeeded);
  }
}

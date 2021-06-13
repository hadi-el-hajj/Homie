import { Component, OnInit } from '@angular/core';
import { AppliancesService } from 'src/app/appliances.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public notifications : string[] = [];
  public notificationsTiming : string[] = [];

  constructor(
    private _appliancesService: AppliancesService
  ) { }

  ngOnInit(): void {
    this.notifications = this._appliancesService.getNotifications();
    this.notificationsTiming = this._appliancesService.getNotificationsTimings();
  }

}

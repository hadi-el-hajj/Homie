import { Component, OnInit } from '@angular/core';
import { AppliancesService } from '../appliances.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _appliancesService: AppliancesService,
  ) { }

  ngOnInit(): void {
  }

  public async resetApplication() {
    localStorage.clear();
    await location.reload();
    alert("Application has been reset ! All your notifications and ongoing tasks are gone ! POUF !")
  }

}

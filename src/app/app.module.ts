import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'

//components
import { AppComponent } from './app.component';
import { AppliancesComponent } from './appliances/appliances.component';
import { HomeComponent } from './home/home.component';
import { WashingMachineComponent } from './appliances/washing-machine/washing-machine.component';

const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'appliance', component: AppliancesComponent},
  {path: 'appliance/washingmachine', component: WashingMachineComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    AppliancesComponent,
    HomeComponent,
    WashingMachineComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'

//components
import { AppComponent } from './app.component';
import { AppliancesComponent } from './appliances/appliances.component';
import { HomeComponent } from './home/home.component';
import { WashingMachineComponent } from './appliances/washing-machine/washing-machine.component';
import { DishWashingMachineComponent } from './appliances/dish-washing-machine/dish-washing-machine.component';
import { FridgeComponent } from './appliances/fridge/fridge.component';
import { NotificationsComponent } from './notifications panel/notifications/notifications.component';

const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'appliances', component: AppliancesComponent},
  {path: 'appliances/washingmachine', component: WashingMachineComponent},
  {path: 'appliances/dishwashingmachine', component: DishWashingMachineComponent},
  {path: 'appliances/fridge', component: FridgeComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    AppliancesComponent,
    HomeComponent,
    WashingMachineComponent,
    DishWashingMachineComponent,
    FridgeComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

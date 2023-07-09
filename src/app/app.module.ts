import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from "@angular/forms";
import { HomeAmministratoreComponent } from './components/home-amministratore/home-amministratore.component';
import {UsersService} from "./services/users.service";
import {HttpClientModule} from "@angular/common/http";
import { HomeCoachComponent } from './components/home-coach/home-coach.component';
import { HomeAtletaComponent } from './components/home-atleta/home-atleta.component';
import { GestionecoachComponent } from './components/gestionecoach/gestionecoach.component';
import { GestioneatletiComponent } from './components/gestioneatleti/gestioneatleti.component';
import { GestioneatleticoachComponent } from './components/gestioneatleticoach/gestioneatleticoach.component';
import { GestioneprofilocoachComponent } from './components/gestioneprofilocoach/gestioneprofilocoach.component';
import { GestioneallenamentiComponent } from './components/gestioneallenamenti/gestioneallenamenti.component';
import { GestioneallenamentiatletaComponent } from './components/gestioneallenamentiatleta/gestioneallenamentiatleta.component';
import { GestioneprofiloatletaComponent } from './components/gestioneprofiloatleta/gestioneprofiloatleta.component';
import { AllenamentiamministratoreComponent } from './components/allenamentiamministratore/allenamentiamministratore.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeAmministratoreComponent,
    HomeCoachComponent,
    HomeAtletaComponent,
    GestionecoachComponent,
    GestioneatletiComponent,
    GestioneatleticoachComponent,
    GestioneprofilocoachComponent,
    GestioneallenamentiComponent,
    GestioneallenamentiatletaComponent,
    GestioneprofiloatletaComponent,
    AllenamentiamministratoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }

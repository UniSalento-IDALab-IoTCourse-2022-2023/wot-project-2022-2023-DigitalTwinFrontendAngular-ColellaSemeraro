import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeAmministratoreComponent} from "./components/home-amministratore/home-amministratore.component";
import {HomeCoachComponent} from "./components/home-coach/home-coach.component";
import {HomeAtletaComponent} from "./components/home-atleta/home-atleta.component";
import {GestioneatletiComponent} from "./components/gestioneatleti/gestioneatleti.component";
import {GestionecoachComponent} from "./components/gestionecoach/gestionecoach.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home-amministratore', component: HomeAmministratoreComponent },
  { path: 'home-coach', component: HomeCoachComponent },
  { path: 'home-atleta', component: HomeAtletaComponent },
  { path: 'gestione-atleti', component: GestioneatletiComponent },
  { path: 'gestione-coach', component: GestionecoachComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeAmministratoreComponent} from "./components/home-amministratore/home-amministratore.component";
import {HomeCoachComponent} from "./components/home-coach/home-coach.component";
import {HomeAtletaComponent} from "./components/home-atleta/home-atleta.component";
import {GestioneatletiComponent} from "./components/gestioneatleti/gestioneatleti.component";
import {GestionecoachComponent} from "./components/gestionecoach/gestionecoach.component";
import {GestioneatleticoachComponent} from "./components/gestioneatleticoach/gestioneatleticoach.component";
import {GestioneprofilocoachComponent} from "./components/gestioneprofilocoach/gestioneprofilocoach.component";
import {GestioneallenamentiComponent} from "./components/gestioneallenamenti/gestioneallenamenti.component";
import {
  GestioneallenamentiatletaComponent
} from "./components/gestioneallenamentiatleta/gestioneallenamentiatleta.component";
import {GestioneprofiloatletaComponent} from "./components/gestioneprofiloatleta/gestioneprofiloatleta.component";
import {
  AllenamentiamministratoreComponent
} from "./components/allenamentiamministratore/allenamentiamministratore.component";
import {ContattiComponent} from "./components/contatti/contatti.component";
import {InformazioniComponent} from "./components/informazioni/informazioni.component";
import {StoricoallenamentiComponent} from "./components/storicoallenamenti/storicoallenamenti.component";
import {StoricorisultatiatletaComponent} from "./components/storicorisultatiatleta/storicorisultatiatleta.component";
import {GraficorisultaticoachComponent} from "./components/graficorisultaticoach/graficorisultaticoach.component";
import {GraficorisultatiatletaComponent} from "./components/graficorisultatiatleta/graficorisultatiatleta.component";
import {GuidaamministratoreComponent} from "./components/guidaamministratore/guidaamministratore.component";
import {GuidacoachComponent} from "./components/guidacoach/guidacoach.component";
import {GuidaatletaComponent} from "./components/guidaatleta/guidaatleta.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home-amministratore', component: HomeAmministratoreComponent },
  { path: 'home-coach', component: HomeCoachComponent },
  { path: 'home-atleta', component: HomeAtletaComponent },
  { path: 'gestione-atleti', component: GestioneatletiComponent },
  { path: 'gestione-coach', component: GestionecoachComponent },
  { path: 'gestione-atleti-coach', component: GestioneatleticoachComponent },
  { path: 'gestione-profilo-coach', component: GestioneprofilocoachComponent },
  { path: 'gestione-allenamenti', component: GestioneallenamentiComponent },
  { path: 'gestione-allenamenti-atleta', component: GestioneallenamentiatletaComponent },
  { path: 'gestione-profilo-atleta', component: GestioneprofiloatletaComponent },
  { path: 'allenamenti-amministratore', component: AllenamentiamministratoreComponent },
  { path: 'contatti', component: ContattiComponent },
  { path: 'informazioni', component: InformazioniComponent },
  { path: 'storico-allenamenti', component: StoricoallenamentiComponent },
  { path: 'storico-risultati-atleta', component: StoricorisultatiatletaComponent },
  { path: 'grafico-risultati-coach', component: GraficorisultaticoachComponent },
  { path: 'grafico-risultati-atleta', component: GraficorisultatiatletaComponent },
  { path: 'guida-amministratore', component: GuidaamministratoreComponent },
  { path: 'guida-coach', component: GuidacoachComponent },
  { path: 'guida-atleta', component: GuidaatletaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

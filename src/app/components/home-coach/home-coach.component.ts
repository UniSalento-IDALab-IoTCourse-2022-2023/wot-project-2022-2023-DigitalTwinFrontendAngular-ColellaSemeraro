import {Component, OnInit} from '@angular/core';
import {Coach} from "../../models/Coach";
import {Atleta} from "../../models/Atleta";
import {AtletaService} from "../../services/atleta.service";
import {CoachService} from "../../services/coach.service";
import {HrvService} from "../../services/hrv.service";
import {HRV} from "../../models/HRV";
import {orderBy} from "lodash";
import {AssegnazioneService} from "../../services/assegnazione.service";

@Component({
  selector: 'app-home-coach',
  templateUrl: './home-coach.component.html',
  styleUrls: ['./home-coach.component.scss']
})
export class HomeCoachComponent implements OnInit{

  coach: Coach = {} as Coach;
  jwt: string = '';
  atleti: Atleta[] = [];
  n_atleti: number = 0;
  listaHRV: HRV[] = [];
  hrv: HRV = {} as HRV;
  usernameAtleti: string[] = [];
  setUsername: Set<string> = new Set<string>;
  risultatiNuovi: boolean = false;

  constructor(private atletaService: AtletaService, private coachService: CoachService, private hrvService: HrvService, private assegnazioneService: AssegnazioneService) {
  }

  getNAtleti() {
    return this.atletaService.getAtletyByCoach(this.jwt, this.coach.id).subscribe(
      (atleti: Atleta[]) => {
        this.atleti = atleti;
        console.log(this.atleti);
        this.n_atleti = this.atleti.length;
        console.log(this.n_atleti);
      },
      (error: any) => {
        console.error("Errore durante l'ottenimento degli atleti", error);
      }
    );
  }

  getUsernameAtleti() {
    return this.atletaService.getAtletyByCoach(this.jwt, this.coach.id).subscribe(
      (atleti: Atleta[]) => {
        console.log(atleti);
        for(let i = 0; i < atleti.length; i++){
          this.usernameAtleti.push(atleti[i].username);
        }
        console.log(this.usernameAtleti);
        this.getHRVs(this.usernameAtleti);
      },
      (error: any) => {
        console.error("Errore durante l'ottenimento degli atleti.", error);
      }
    );
  }

  getHRVs(usernameAtleti: string[]) {
    return this.hrvService.getHRVByAtleti(this.jwt, usernameAtleti).subscribe(
      (listaHRV: HRV[]) => {
        console.log(listaHRV);
        this.listaHRV = listaHRV;
        this.listaHRV = orderBy(listaHRV, 'data', 'desc');

        for (const hrv of this.listaHRV) {
          // Esegui la chiamata API checkifExistsByIdRisultatoPrecedente
          this.assegnazioneService.checkifExistsByIdRisultatoPrecedente(this.jwt, hrv.id).subscribe(
            (exists: boolean) => {
              // Assegna il valore booleano a existsByIdRisultatoPrecedente
              hrv.existsByIdRisultatoPrecedente = exists;
              if(!exists) {
                this.risultatiNuovi = true;
                this.setUsername.add(hrv.usernameAtleta);
              }

            },
            (error: any) => {
              console.error("Errore durante il controllo dell'esistenza del risultato precedente", error);
            }
          );
        }
      },
      (error: any) => {
        console.error("Errore durante l'ottenimento degli indici HRV", error);
      }
    );
  }

  ngOnInit(): void {

    // Recupera l'oggetto currentUser dal localStorage
    const currentUserJSON = localStorage.getItem('currentUser')!;

    // Verifica se l'oggetto currentUser è presente nel localStorage
    if (currentUserJSON) {
      // Parsa l'oggetto JSON e ottieni il token
      const currentUser = JSON.parse(currentUserJSON);
      this.coach = currentUser.coach;
      this.jwt = currentUser.token;
      if (this.coach == undefined) {
        // ricarica la pagina per far inizializzare correttamente il cliente
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }

      this.getNAtleti();
      this.getUsernameAtleti();

    } else {
      // Gestisci il caso in cui l'oggetto currentUser non sia presente nel localStorage
      // ...
    }

  }

}

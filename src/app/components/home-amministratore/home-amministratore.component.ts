import {Component, OnInit} from '@angular/core';
import {Amministratore} from "../../models/Amministratore";
import {Atleta} from "../../models/Atleta";
import {Coach} from "../../models/Coach";
import {AtletaService} from "../../services/atleta.service";
import {CoachService} from "../../services/coach.service";

@Component({
  selector: 'app-home-amministratore',
  templateUrl: './home-amministratore.component.html',
  styleUrls: ['./home-amministratore.component.scss']
})
export class HomeAmministratoreComponent implements OnInit{

  amministratore: Amministratore = {} as Amministratore;
  jwt: string = '';
  atleti: Atleta[] = [];
  coaches: Coach[] = [];
  n_atleti: number = 0;
  n_coach: number = 0;

  constructor(private atletaService: AtletaService, private coachService: CoachService) {
  }

  getNAtleti() {
    return this.atletaService.getAllAtleti(this.jwt).subscribe(
      (atleti: Atleta[]) => {
        this.atleti = atleti;
        console.log("Atleti: ", this.atleti);
        this.n_atleti = this.atleti.length;
      },
      (error) => {
        console.error("Errore nell'ottenimento del numero degli atleti", error)
      }
    );
  }

  getNCoach() {
    return this.coachService.getAllCoaches(this.jwt).subscribe(
      (coaches: Coach[]) => {
        this.coaches = coaches;
        console.log("Coach: ", this.coaches);
        this.n_coach = this.coaches.length;
      },
      (error) => {
        console.error("Errore nell'ottenimento del numero dei coach", error)
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
      this.amministratore = currentUser.amministratore;
      this.jwt = currentUser.token;
      if (this.amministratore == undefined) {
        // ricarica la pagina per far inizializzare correttamente il cliente
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }

      this.getNAtleti();
      this.getNCoach();


    } else {
      // Gestisci il caso in cui l'oggetto currentUser non sia presente nel localStorage
      // ...
    }

  }

}

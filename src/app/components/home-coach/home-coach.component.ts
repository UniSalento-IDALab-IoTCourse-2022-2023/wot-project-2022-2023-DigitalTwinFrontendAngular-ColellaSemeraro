import {Component, OnInit} from '@angular/core';
import {Coach} from "../../models/Coach";
import {Atleta} from "../../models/Atleta";
import {AtletaService} from "../../services/atleta.service";
import {CoachService} from "../../services/coach.service";

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

  constructor(private atletaService: AtletaService, private coachService: CoachService) {
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

    } else {
      // Gestisci il caso in cui l'oggetto currentUser non sia presente nel localStorage
      // ...
    }

  }

}

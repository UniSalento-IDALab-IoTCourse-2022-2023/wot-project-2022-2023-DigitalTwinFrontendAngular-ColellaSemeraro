import {Component, OnInit} from '@angular/core';
import {Amministratore} from "../../models/Amministratore";
import {Atleta} from "../../models/Atleta";
import {CoachService} from "../../services/coach.service";
import {AtletaService} from "../../services/atleta.service";
import {Coach} from "../../models/Coach";

@Component({
  selector: 'app-gestioneatleti',
  templateUrl: './gestioneatleti.component.html',
  styleUrls: ['./gestioneatleti.component.scss']
})
export class GestioneatletiComponent implements OnInit {

  amministratore: Amministratore = {} as Amministratore;
  atleti: Atleta[] = [];
  atleta: Atleta = {} as Atleta;
  coach: Coach = {} as Coach;
  newCoach: Coach = {} as Coach;
  jwt: string = '';
  selectedRole: string = '';
  selectedTeam: string = '';
  filteredAtleti: Atleta[] = [];
  newAtleta: Atleta = {} as Atleta;
  successReg: boolean = false;
  errorReg: boolean = false;
  confirmPassword: string = '';
  posizioneCampo: string = '';
  squadra: string = '';
  atletaAllenato: boolean = false;
  coachId: string | undefined = '';

  roles: string[] = ['Attaccante', 'Difensore', 'Centrocampista', 'Portiere'];

  constructor(private coachService: CoachService, private atletaService: AtletaService) {}

  getAtleti() {
    return this.atletaService.getAllAtleti(this.jwt).subscribe(
      (atleti: Atleta[]) => {
        this.atleti = atleti;
        console.log("Atleti: ", atleti);

        this.applyFilters();
      },
      (error:any) => {
        console.error("Errore durante la richiesta di ottenimento degli atleti", error)
      }
    );
  }

  getCoach() {
    return this.coachService.getCoachById(this.jwt, this.atleta.idCoach).subscribe(
      (coach: Coach) => {
        this.coach = coach;
        console.log(coach);
      },
      (error:any) => {
        console.error("Errore durante l'ottenimento del coach.", error);
      }
    );
  }

  getCoachBySquadraERuolo() {
    return this.coachService.getCoachBySquadraERuolo(this.jwt, this.squadra, this.atleta.posizioneCampo).subscribe(
      (coach: Coach) => {
        this.newCoach = coach;
        console.log(this.newCoach);
      },
      (error:any) => {
        console.error("Errore durante l'ottenimento del coach.", error)
      }
    );
  }

  getCoachBySquadraERuoloCreate() {
    this.squadra = this.newAtleta.squadra;
    this.posizioneCampo = this.newAtleta.posizioneCampo;
    return this.coachService.getCoachBySquadraERuolo(this.jwt, this.squadra, this.posizioneCampo).subscribe(
      (coach: Coach) => {
        this.newCoach = coach;
        console.log(this.newCoach);
      },
      (error:any) => {
        console.error("Errore durante l'ottenimento del coach.", error)
      }
    );
  }

  updateSquadraCoachAtleta() {
    this.coachId = this.newCoach.id;
    return this.atletaService.updateSquadraCoachAtleta(this.jwt, this.atleta.username, this.squadra, this.coachId).subscribe(
      (risposta: string) => {
        this.successReg = true;
        this.errorReg = false;
        console.log(risposta);

        setTimeout(() => {
          window.location.reload();
        }, 1000);

      },
      (error: any) => {
        console.error("Errore durante la modifica dell'atleta", error);
        this.successReg = false;
        this.errorReg = true;
      }
    );
  }

  creaAtleta() {
    this.coachId = this.newCoach.id;
    if (this.coachId != null) {
      this.newAtleta.idCoach = this.coachId;
    }
    return this.atletaService.creaAtleta(this.jwt, this.newAtleta).subscribe(
      (atleta: Atleta) => {
        console.log(atleta);
        this.successReg = true;
        this.errorReg = false;

        setTimeout(() => {
          window.location.reload();
        }, 1000);

      },
      (error: any) => {
        console.error("Errore durante la registrazione dell'atleta.", error);
        this.successReg = false;
        this.errorReg = true;
      }
    )
  }

  applyFilters() {
    // Applica i filtri alla lista dei coach
    this.filteredAtleti = this.atleti.filter((atleta) => {
      // Verifica se il coach soddisfa i criteri di filtro
      const matchesRole = this.selectedRole === '' || atleta.posizioneCampo === this.selectedRole;
      const matchesTeam = this.selectedTeam === '' || atleta.squadra === this.selectedTeam || atleta.squadra.toLowerCase().includes(this.selectedTeam.toLowerCase());

      return matchesRole && matchesTeam;
    });
  }

  isFormContentModified(): boolean {
    return (
      this.squadra !== this.atleta.squadra
    );
  }

  // Funzione per aprire il modal e visualizzare i dettagli dell'utente coach
  openModal(atleta: Atleta) {

    this.atleta = atleta;

    this.atletaAllenato = this.atleta.idCoach != '';

    if(this.atletaAllenato) {
        this.getCoach();
    }

    this.posizioneCampo = this.atleta.posizioneCampo;
    this.squadra = this.atleta.squadra;
    console.log(this.squadra);

    const modal = document.getElementById('modalAtleta');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  // Funzione per chiudere il modal
  closeModal() {
    const modal = document.getElementById('modalAtleta');
    if (modal) {
      modal.style.display = 'none';
    }
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  isSecondOptionDefault(): boolean {
    return this.newCoach.id != null;
  }

  isFirstOptionDefault(): boolean {
    return this.newCoach.id == null;
  }


  creaAtletaClick(){
    this.creaAtleta();
  }

  openModalCreation() {
    const modal = document.getElementById('modalAtletaCreation');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModalCreation() {
    const modal = document.getElementById('modalAtletaCreation');
    if (modal) {
      modal.style.display = 'none';
    }
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

      this.getAtleti();

    } else {
      // Gestisci il caso in cui l'oggetto currentUser non sia presente nel localStorage
      // ...
    }
  }

}

import {Component, OnInit} from '@angular/core';
import {Coach} from "../../models/Coach";
import {CoachService} from "../../services/coach.service";
import {Amministratore} from "../../models/Amministratore";
import {AtletaService} from "../../services/atleta.service";

@Component({
  selector: 'app-gestionecoach',
  templateUrl: './gestionecoach.component.html',
  styleUrls: ['./gestionecoach.component.scss']
})
export class GestionecoachComponent implements OnInit{

  amministratore: Amministratore = {} as Amministratore;
  coaches: Coach[] = [];
  coach: Coach = {} as Coach;
  jwt: string = '';
  selectedRole: string = '';
  selectedTeam: string = '';
  filteredCoaches: Coach[] = [];
  modalOpen: boolean = false;
  newCoach: Coach = {} as Coach;
  successReg: boolean = false;
  errorReg: boolean = false;
  confirmPassword: string = '';
  coachEsistente: boolean = false;
  coachAllena: boolean = false;
  ruoloAllenato: string = '';
  squadra: string = '';

  roles: string[] = ['Attaccante', 'Difensore', 'Centrocampista', 'Portiere'];

  constructor(private coachService: CoachService, private atletaService: AtletaService) {
  }

  getCoaches() {
    return this.coachService.getAllCoaches(this.jwt).subscribe(
      (coaches: Coach[]) => {
        this.coaches = coaches;
        console.log("Coach: ", this.coaches);

        this.applyFilters();

      },
      (error) => {
        console.error("Errore nell'ottenimento del numero dei coach", error)
      }
    );
  }

  creaCoach(coachDTO: Coach) {
    return this.coachService.creaCoach(this.jwt, coachDTO).subscribe(
      (coachDTO: Coach) => {
        console.log("Coach creato con successo: ", coachDTO);
        this.successReg = true;
        this.errorReg = false;
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.error("Errore nella creazione del coach", error)
        this.errorReg = true;
      }
    );
  }

  checkifCoachExistsBySquadraAndRuolo(coachDTO: Coach) {
    return this.coachService.checkifCoachExistsBySquadraAndRuolo(this.jwt, coachDTO.squadra, coachDTO.ruoloAllenato).subscribe(
      (result: boolean) => {
        console.log(result);
        this.coachEsistente = result;
        if(!this.coachEsistente) {
          this.creaCoach(coachDTO);
        }
      },
      (error) => {
        console.error("Errore nella richiesta", error);
      }
    );
  }

  checkIfCoachAllenaAtleti() {
    return this.atletaService.checkifAtletaAllenatoDaCoach(this.jwt, this.coach.id).subscribe(
      (result: boolean) => {
        this.coachAllena = result;
        console.log(this.coachAllena);
      },
      (error) => {
        console.error("Errore nella richiesta", error);
      }
    )
  }

  updateRuoloSquadraCoach() {
    return this.coachService.updateRuoloSquadraCoach(this.jwt, this.squadra, this.ruoloAllenato, this.coach.username).subscribe(
      (risposta: string) => {
        this.successReg = true;
        this.errorReg = false;
        console.log(risposta);

        setTimeout(() => {
          window.location.reload();
        }, 1000);

      },
      (error: any) => {
        console.error("Errore durante la modifica del coach", error);
        this.successReg = false;
        this.errorReg = true;
      }
    );
  }

  creaCoachClick(coachDTO: Coach) {
    this.checkifCoachExistsBySquadraAndRuolo(coachDTO);
  }

  // Funzione per aprire il modal e visualizzare i dettagli dell'utente coach
  openModal(coach: Coach) {

    this.coach = coach;

    this.checkIfCoachAllenaAtleti();

    this.ruoloAllenato = this.coach.ruoloAllenato;
    this.squadra = this.coach.squadra;
    console.log(this.squadra);

    const modal = document.getElementById('modalCoach');
    if (modal) {
      modal.style.display = 'block';
    }
    this.modalOpen = true;
  }

  // Funzione per chiudere il modal
  closeModal() {
    const modal = document.getElementById('modalCoach');
    if (modal) {
      modal.style.display = 'none';
    }
    this.modalOpen = false;
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }


  openModalCreation() {
    const modal = document.getElementById('modalCoachCreation');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModalCreation() {
    const modal = document.getElementById('modalCoachCreation');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  isFormContentModified(): boolean {
    return (
       this.squadra !== this.coach.squadra ||
       this.ruoloAllenato !== this.coach.ruoloAllenato
    );
  }

  applyFilters() {
    // Applica i filtri alla lista dei coach
    this.filteredCoaches = this.coaches.filter((coach) => {
      // Verifica se il coach soddisfa i criteri di filtro
      const matchesRole = this.selectedRole === '' || coach.ruoloAllenato === this.selectedRole;
      const matchesTeam = this.selectedTeam === '' || coach.squadra === this.selectedTeam || coach.squadra.toLowerCase().includes(this.selectedTeam.toLowerCase());

      return matchesRole && matchesTeam;
    });
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

      this.getCoaches();

    } else {
      // Gestisci il caso in cui l'oggetto currentUser non sia presente nel localStorage
      // ...
    }

  }

}

import {Component, OnInit} from '@angular/core';
import {Coach} from "../../models/Coach";
import {Atleta} from "../../models/Atleta";
import {AtletaService} from "../../services/atleta.service";

@Component({
  selector: 'app-gestioneatleticoach',
  templateUrl: './gestioneatleticoach.component.html',
  styleUrls: ['./gestioneatleticoach.component.scss']
})
export class GestioneatleticoachComponent implements OnInit {

  coach: Coach = {} as Coach;
  atleti: Atleta[] = [];
  atleta: Atleta = {} as Atleta;
  jwt: string = '';
  successReg: boolean = false;
  errorReg: boolean = false;
  altezza: number = 0;
  peso: number = 0;

  constructor(private atletaService: AtletaService) {

  }

  getAtleti() {
    return this.atletaService.getAtletyByCoach(this.jwt, this.coach.id).subscribe(
      (atleti: Atleta[]) => {
        this.atleti = atleti;
        console.log(this.atleti);
      },
      (error: any) => {
        console.error("Errore durante l'ottenimento degli alteti.", error);
      }
    );
  }

  updateAtleta() {
    this.altezza = this.atleta.altezza;
    this.peso = this.atleta.peso
    return this.atletaService.updatePesoAltezza(this.jwt, this.coach.id, this.atleta.username, this.atleta.idCoach, this.altezza, this.peso).subscribe(
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

  isFormContentModified(): boolean {
    return (
      this.altezza !== this.atleta.altezza ||
      this.peso !== this.atleta.peso
    );
  }

  // Funzione per aprire il modal e visualizzare i dettagli dell'utente coach
  openModal(atleta: Atleta) {

    this.atleta = atleta;

    this.altezza = this.atleta.altezza;
    this.peso = this.atleta.peso;

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

      this.getAtleti()

    } else {
      // Gestisci il caso in cui l'oggetto currentUser non sia presente nel localStorage
      // ...
    }

  }

}

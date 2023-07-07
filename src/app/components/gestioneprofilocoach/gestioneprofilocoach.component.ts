import {Component, OnInit} from '@angular/core';
import {Coach} from "../../models/Coach";
import {CoachService} from "../../services/coach.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-gestioneprofilocoach',
  templateUrl: './gestioneprofilocoach.component.html',
  styleUrls: ['./gestioneprofilocoach.component.scss']
})
export class GestioneprofilocoachComponent implements OnInit {

  coach: Coach = {} as Coach;
  jwt: string = '';
  modificheEffettuate: boolean = false;
  email: string = '';
  successMod: boolean = false;
  emailEsistente: boolean = false;

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  changePassSuccess: boolean = false;
  changePassErr: boolean = false;

  constructor(private coachService: CoachService, private usersService: UsersService) {
  }

  getCoach() {
    return this.coachService.getCoachById(this.jwt, this.coach.id).subscribe(
      (coach: Coach) => {
        console.log(coach);
        this.coach = coach;
        this.email = this.coach.email;
      },
      (error: any) => {
        console.error("Errore durante l'ottenimento del coach", error);
      }
    );
  }

  isFormContentModified(): boolean {
    return (
      this.email !== this.coach.email
    );
  }

  updateCoach() {
    return this.usersService.updateEmailUser(this.jwt, this.coach.username, this.coach.email).subscribe(
      (risposta: string) => {
        console.log(risposta);
        this.successMod = true;
        this.emailEsistente = false;

        setTimeout(() => {
          window.location.reload();
        }, 1000);

      },
      (error: any) => {
        console.error('Email già esistente:', error.error);
        // Gestisci l'errore di email già presente
        this.emailEsistente = true;
      }
    )
  }

  updatePassword() {
    return this.usersService.updatePasswordUser(this.jwt, this.coach.username, this.currentPassword, this.newPassword).subscribe(
      (risposta: string) => {
        console.log(risposta);
        this.changePassSuccess = true;
        this.changePassErr = false;

        setTimeout(() => {
          window.location.reload();
        }, 1000);

      },
      (error: any) => {
        console.error("Errore nel cambiare la password", error);
        this.changePassErr = true;
      }
    );
  }

  isPasswordInvalid(): boolean {
    return this.newPassword === this.currentPassword;
  }

  openChangePasswordModal(): void {
    // Apri la modale solo se l'elemento esiste
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeChangePasswordModal(): void {
    // Chiudi la modale solo se l'elemento esiste
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
      modal.style.display = 'none';

      // Resetti i campi di input della password
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    }
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

      this.getCoach();

    } else {
      // Gestisci il caso in cui l'oggetto currentUser non sia presente nel localStorage
      // ...
    }

  }

}

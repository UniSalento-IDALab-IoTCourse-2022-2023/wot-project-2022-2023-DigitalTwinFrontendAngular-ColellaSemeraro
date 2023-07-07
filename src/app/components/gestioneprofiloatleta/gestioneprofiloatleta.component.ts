import {Component, OnInit} from '@angular/core';
import {Atleta} from "../../models/Atleta";
import {AtletaService} from "../../services/atleta.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-gestioneprofiloatleta',
  templateUrl: './gestioneprofiloatleta.component.html',
  styleUrls: ['./gestioneprofiloatleta.component.scss']
})
export class GestioneprofiloatletaComponent implements OnInit {

  atleta: Atleta = {} as Atleta;
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

  constructor(private atletaService: AtletaService, private usersService: UsersService) {
  }

  getAtleta() {
    return this.atletaService.getAtletaById(this.jwt, this.atleta.id).subscribe(
      (atleta: Atleta) => {
        console.log(atleta);
        this.atleta = atleta;
        this.email = this.atleta.email;
      },
      (error: any) => {
        console.error("Errore nell'ottenimento dell'atleta", error);
      }
    );
  }

  isFormContentModified(): boolean {
    return (
      this.email !== this.atleta.email
    );
  }

  updateAtleta() {
    return this.usersService.updateEmailUser(this.jwt, this.atleta.username, this.atleta.email).subscribe(
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
    return this.usersService.updatePasswordUser(this.jwt, this.atleta.username, this.currentPassword, this.newPassword).subscribe(
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
      this.atleta = currentUser.atleta;
      this.jwt = currentUser.token;
      if (this.atleta == undefined) {
        // ricarica la pagina per far inizializzare correttamente il cliente
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }

      this.getAtleta();

    } else {
      // Gestisci il caso in cui l'oggetto currentUser non sia presente nel localStorage
      // ...
    }

  }

}

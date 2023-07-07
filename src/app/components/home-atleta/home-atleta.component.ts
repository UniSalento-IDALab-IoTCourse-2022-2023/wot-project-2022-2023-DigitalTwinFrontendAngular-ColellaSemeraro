import {Component, OnInit} from '@angular/core';
import {Atleta} from "../../models/Atleta";

@Component({
  selector: 'app-home-atleta',
  templateUrl: './home-atleta.component.html',
  styleUrls: ['./home-atleta.component.scss']
})
export class HomeAtletaComponent implements OnInit{

  atleta: Atleta = {} as Atleta;
  jwt: string = '';

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


    } else {
      // Gestisci il caso in cui l'oggetto currentUser non sia presente nel localStorage
      // ...
    }
  }

}

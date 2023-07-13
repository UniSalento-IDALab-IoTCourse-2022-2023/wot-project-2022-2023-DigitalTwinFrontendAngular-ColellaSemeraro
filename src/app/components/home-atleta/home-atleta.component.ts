import {Component, OnInit} from '@angular/core';
import {Atleta} from "../../models/Atleta";
import {AssegnazioneService} from "../../services/assegnazione.service";
import {AssegnazioneAllenamento} from "../../models/AssegnazioneAllenamento";
import {AllenamentoService} from "../../services/allenamento.service";
import {Allenamento} from "../../models/Allenamento";

@Component({
  selector: 'app-home-atleta',
  templateUrl: './home-atleta.component.html',
  styleUrls: ['./home-atleta.component.scss']
})
export class HomeAtletaComponent implements OnInit{

  atleta: Atleta = {} as Atleta;
  jwt: string = '';
  assegnazione: AssegnazioneAllenamento = {} as AssegnazioneAllenamento;
  allenamentoAssegnato: boolean = false;
  allenamento: Allenamento = {} as Allenamento;

  constructor(private assegnazioneService: AssegnazioneService, private allenamentoService: AllenamentoService) {
  }

  getAssegnazione() {
    return this.assegnazioneService.findMostRecentByIdAtleta(this.jwt, this.atleta.id).subscribe(
      (assegnazione: AssegnazioneAllenamento) => {
        console.log(assegnazione);
        this.assegnazione = assegnazione;

        const dataCorrente = new Date();
        const dataAssegnazione = new Date(assegnazione.dataAssegnazione);

        // Rimuovi le informazioni sull'ora, i minuti e i secondi dalle date
        dataCorrente.setHours(0, 0, 0, 0);
        dataAssegnazione.setHours(0, 0, 0, 0);

        // Verifica se la data dell'assegnazione è uguale alla data corrente
        this.allenamentoAssegnato = dataAssegnazione.getTime() === dataCorrente.getTime();

        this.getAllenamento();
      },
      (error: any) => {
        console.error("Errore durante l'ottenimento dell'assegnazione più recente", error);
      }
    );
  }

  getAllenamento() {
    return this.allenamentoService.getAllenamentoById(this.jwt, this.assegnazione.idAllenamento).subscribe(
      (allenamento: Allenamento) => {
        console.log(allenamento);
        this.allenamento = allenamento;
      },
      (error: any) => {
        console.error("Errore durante l'ottenimento dell'allenamento.", error);
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
      this.atleta = currentUser.atleta;
      this.jwt = currentUser.token;
      if (this.atleta == undefined) {
        // ricarica la pagina per far inizializzare correttamente il cliente
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }

      this.getAssegnazione();


    } else {
      // Gestisci il caso in cui l'oggetto currentUser non sia presente nel localStorage
      // ...
    }
  }

}

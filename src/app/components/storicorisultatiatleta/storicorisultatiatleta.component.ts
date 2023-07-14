import {Component, OnInit} from '@angular/core';
import {Atleta} from "../../models/Atleta";
import {HRV} from "../../models/HRV";
import {HrvService} from "../../services/hrv.service";
import {orderBy} from "lodash";
import {AssegnazioneAllenamento} from "../../models/AssegnazioneAllenamento";

@Component({
  selector: 'app-storicorisultatiatleta',
  templateUrl: './storicorisultatiatleta.component.html',
  styleUrls: ['./storicorisultatiatleta.component.scss']
})
export class StoricorisultatiatletaComponent implements OnInit {

  atleta: Atleta = {} as Atleta;
  jwt: string = '';
  usernameAtleta: string[] = [];
  listaHRV: HRV[] = [];

  dayFilter: number | undefined;
  monthFilter: number | undefined;
  yearFilter: number | undefined;

  filteredHRV: HRV[] = [];

  constructor(private hrvService: HrvService) {
  }

  applyFilter(): void {
    this.filteredHRV = this.listaHRV.filter((hrv: HRV) => {
      const filterYear = this.yearFilter || new Date().getFullYear();
      const filterMonth = this.monthFilter;
      const filterDay = this.dayFilter;

      const conferimentoDate = new Date(hrv.data);
      const conferimentoYear = conferimentoDate.getFullYear();
      const conferimentoMonth = conferimentoDate.getMonth() + 1;
      const conferimentoDay = conferimentoDate.getDate();

      if (filterMonth && filterDay) {
        // Filtro per giorno, mese e anno
        return (
          conferimentoYear === filterYear &&
          conferimentoMonth === filterMonth &&
          conferimentoDay === filterDay
        );
      } else if (filterMonth) {
        // Filtro per mese e anno
        return (
          conferimentoYear === filterYear &&
          conferimentoMonth === filterMonth
        );
      } else {
        // Filtro solo per anno
        return conferimentoYear === filterYear;
      }
    });
    console.log(this.filteredHRV);
  }


  filterNumericInput(event: any): void {
    const input = event.target;
    const inputValue = input.value;

    // Rimuove i caratteri non numerici
    input.value = inputValue.replace(/\D/, '');
  }

  resetFilters(): void {
    if (!this.yearFilter) {
      this.monthFilter = undefined;
      this.dayFilter = undefined;
    } else if (!this.monthFilter) {
      this.dayFilter = undefined;
    }
  }

  getRisultatiHRV() {
    return this.hrvService.getHRVByAtleti(this.jwt, this.usernameAtleta).subscribe(
      (listaHRV: HRV[]) => {
        console.log(listaHRV);
        this.listaHRV = listaHRV;
        this.listaHRV = orderBy(listaHRV, 'data', 'desc');

        const currentMonth = new Date().getMonth() + 1; // Ottieni il mese corrente
        const currentYear = new Date().getFullYear(); // Ottieni l'anno corrente

        this.monthFilter = parseInt(currentMonth.toString(), 10);
        this.yearFilter = parseInt(currentYear.toString(), 10);

        // Applica i filtri
        this.applyFilter();

      },
      (error: any) => {
        console.error("Errore durante l'ottenimento delle metriche HRV.", error);
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

      this.usernameAtleta.push(this.atleta.username);
      this.getRisultatiHRV();

    } else {
      // Gestisci il caso in cui l'oggetto currentUser non sia presente nel localStorage
      // ...
    }

  }

}

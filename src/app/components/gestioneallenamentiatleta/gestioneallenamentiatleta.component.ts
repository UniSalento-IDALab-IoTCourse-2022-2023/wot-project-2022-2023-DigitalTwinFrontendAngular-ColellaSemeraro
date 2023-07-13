import {Component, OnInit} from '@angular/core';
import {Atleta} from "../../models/Atleta";
import {AssegnazioneService} from "../../services/assegnazione.service";
import {AssegnazioneAllenamento} from "../../models/AssegnazioneAllenamento";
import {orderBy} from "lodash";

@Component({
  selector: 'app-gestioneallenamentiatleta',
  templateUrl: './gestioneallenamentiatleta.component.html',
  styleUrls: ['./gestioneallenamentiatleta.component.scss']
})
export class GestioneallenamentiatletaComponent implements OnInit{

  atleta: Atleta = {} as Atleta;
  jwt: string = '';
  assegnazioni: AssegnazioneAllenamento[] = [];

  dayFilter: number | undefined;
  monthFilter: number | undefined;
  yearFilter: number | undefined;

  filteredAssegnazioni: AssegnazioneAllenamento[] = []; // Array dei conferimenti filtrati

  constructor(private assegnazioneService: AssegnazioneService) {
  }

  applyFilter(): void {
    this.filteredAssegnazioni = this.assegnazioni.filter((assegnazione: AssegnazioneAllenamento) => {
      const filterYear = this.yearFilter || new Date().getFullYear();
      const filterMonth = this.monthFilter;
      const filterDay = this.dayFilter;

      const conferimentoDate = new Date(assegnazione.dataAssegnazione);
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
    console.log(this.filteredAssegnazioni);
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

  getAllenamenti() {
    return this.assegnazioneService.findAllByIdAtleta(this.jwt, this.atleta.id).subscribe(
      (assegnazioni: AssegnazioneAllenamento[]) => {
        console.log(assegnazioni);
        this.assegnazioni = assegnazioni;
        this.assegnazioni = orderBy(assegnazioni, 'dataAssegnazione', 'desc')

        const currentMonth = new Date().getMonth() + 1; // Ottieni il mese corrente
        const currentYear = new Date().getFullYear(); // Ottieni l'anno corrente

        this.monthFilter = parseInt(currentMonth.toString(), 10);
        this.yearFilter = parseInt(currentYear.toString(), 10);

        // Applica i filtri
        this.applyFilter();

      },
      (error:any) => {
        console.error("Errore durante l'ottenimento delle assegnazioni per l'atleta.", error);
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

      this.getAllenamenti();

    } else {
      // Gestisci il caso in cui l'oggetto currentUser non sia presente nel localStorage
      // ...
    }

  }



}

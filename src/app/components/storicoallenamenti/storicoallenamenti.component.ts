import {Component, OnInit} from '@angular/core';
import {Coach} from "../../models/Coach";
import {Atleta} from "../../models/Atleta";
import {AssegnazioneService} from "../../services/assegnazione.service";
import {AssegnazioneAllenamento} from "../../models/AssegnazioneAllenamento";
import {orderBy} from "lodash";
import {Allenamento} from "../../models/Allenamento";
import {AllenamentoService} from "../../services/allenamento.service";

@Component({
  selector: 'app-storicoallenamenti',
  templateUrl: './storicoallenamenti.component.html',
  styleUrls: ['./storicoallenamenti.component.scss']
})
export class StoricoallenamentiComponent implements OnInit {

  coach: Coach = {} as Coach;
  atleta: Atleta = {} as Atleta;
  jwt: string = '';
  assegnazioni: AssegnazioneAllenamento[] = [];
  assegnazione: AssegnazioneAllenamento = {} as AssegnazioneAllenamento;
  allenamento: Allenamento = {} as Allenamento;

  dayFilter: number | undefined;
  monthFilter: number | undefined;
  yearFilter: number | undefined;

  filteredAssegnazioni: AssegnazioneAllenamento[] = []; // Array dei conferimenti filtrati

  constructor(private assegnazioneService: AssegnazioneService, private allenamentoService: AllenamentoService) {
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

  openModal(assegnazione: AssegnazioneAllenamento) {

    this.assegnazione = assegnazione;

    this.getAllenamento();

    const modal = document.getElementById('modalAllenamentoAtleta');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  // Funzione per chiudere il modal
  closeModal() {
    const modal = document.getElementById('modalAllenamentoAtleta');
    if (modal) {
      modal.style.display = 'none';
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

  getAllenamento() {
    return this.allenamentoService.getAllenamentoById(this.jwt, this.assegnazione.idAllenamento).subscribe(
      (allenamento: Allenamento) => {
        console.log(allenamento);
        this.allenamento = allenamento;
      },
      (error: any) => {
        console.error("Errore durante il recupero dell'allenamento.", error);
      }
    );
  }

  ngOnInit(): void {

    // Recupera l'oggetto currentUser dal localStorage
    const currentUserJSON = localStorage.getItem('currentUser')!;
    const atletaJSON = localStorage.getItem('Atleta');

    // Verifica se l'oggetto currentUser è presente nel localStorage
    if (currentUserJSON && atletaJSON) {
      // Parsa l'oggetto JSON e ottieni il token
      const currentUser = JSON.parse(currentUserJSON);
      const atleta = JSON.parse(atletaJSON);
      this.coach = currentUser.coach;
      this.jwt = currentUser.token;
      this.atleta = atleta;
      if (this.coach == undefined || this.atleta == undefined) {
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

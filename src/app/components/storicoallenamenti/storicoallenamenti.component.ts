import {Component, OnInit} from '@angular/core';
import {Coach} from "../../models/Coach";
import {Atleta} from "../../models/Atleta";
import {AssegnazioneService} from "../../services/assegnazione.service";
import {AssegnazioneAllenamento} from "../../models/AssegnazioneAllenamento";
import {orderBy} from "lodash";
import {Allenamento} from "../../models/Allenamento";
import {AllenamentoService} from "../../services/allenamento.service";
import {HRV} from "../../models/HRV";
import {AtletaService} from "../../services/atleta.service";
import {RealTimeHRV} from "../../models/RealTimeHRV";
import {RealtimehrvService} from "../../services/realtimehrv.service";

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
  mostraListaAllenamenti: boolean = true;
  mostraCampiAssegnazione: boolean = false;
  allenamentoSelezionato: boolean = false;
  nuovaAssegnazione: AssegnazioneAllenamento = {} as AssegnazioneAllenamento;
  successReg: boolean = false;
  errorReg: boolean = false;
  selectedTipo: string = '';
  selectedNome: string = '';
  selectedIntensita: string = '';
  allenamenti: Allenamento[] = [];
  filteredAllenamenti: Allenamento[] = [];
  hrv: HRV = {} as HRV;
  types: string[] = [this.coach.ruoloAllenato];
  intensitas: string[] = ['Medio/Bassa', 'Alta'];
  intensita: string = '';
  realTimeHRV: RealTimeHRV = {} as RealTimeHRV;
  integer: number = 0;
  intervalId: any; // Variabile per memorizzare l'ID dell'intervallo

  selectedAllenamento: Allenamento | null = null;

  dayFilter: number | undefined;
  monthFilter: number | undefined;
  yearFilter: number | undefined;

  filteredAssegnazioni: AssegnazioneAllenamento[] = []; // Array dei conferimenti filtrati

  constructor(private assegnazioneService: AssegnazioneService, private allenamentoService: AllenamentoService, private atletaService: AtletaService,
              private realTimeHRVService: RealtimehrvService) {
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
        const currentDay = new Date().getDate(); // Ottieni il giorno corrente

        this.monthFilter = parseInt(currentMonth.toString(), 10);
        this.yearFilter = parseInt(currentYear.toString(), 10);

        // Applica i filtri
        this.applyFilter();


        for (let i = 0; i < this.filteredAssegnazioni.length; i++) {
          const dataAssegnazione = new Date(this.filteredAssegnazioni[i].dataAssegnazione);
          const allenamentoDay = dataAssegnazione.getDate(); // Ottieni il giorno dell'allenamento
          const allenamentoMonth = dataAssegnazione.getMonth() + 1; // Ottieni il mese dell'allenamento
          const allenamentoYear = dataAssegnazione.getFullYear(); // Ottieni l'anno dell'allenamento

          // Verifica la coincidenza delle date
          this.filteredAssegnazioni[i].allenamentoInDataOdierna = allenamentoMonth === currentMonth && allenamentoYear === currentYear && allenamentoDay == currentDay;
          console.log(this.filteredAssegnazioni[i].allenamentoInDataOdierna)
        }


      },
      (error:any) => {
        console.error("Errore durante l'ottenimento delle assegnazioni per l'atleta.", error);
      }
    );
  }



  getAllenamentidaAssegnare() {
    return this.allenamentoService.getAllAllenamenti(this.jwt).subscribe(
      (allenamenti: Allenamento[]) => {
        console.log(allenamenti);
        this.allenamenti = allenamenti;

        this.selectedIntensita = this.intensita
        this.applyFilters();
      },
      (error:any) => {
        console.error("Errore nella richiesta di ottenimento degli allenamenti.", error);
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


  creaAssegnazione() {
    this.nuovaAssegnazione.idAllenamento = <string>this.selectedAllenamento?.id;
    this.nuovaAssegnazione.idRisultatoPrecedente = '';
    if (this.atleta.id != null) {
      this.nuovaAssegnazione.idAtleta = this.atleta.id;
    }

    return this.assegnazioneService.creaNuovaAssegnazione(this.jwt, this.nuovaAssegnazione, this.coach.id).subscribe(
      (assegnazione: AssegnazioneAllenamento) => {
        console.log(assegnazione);
        this.successReg = true;
        this.errorReg = false;

        setTimeout(() => {
          window.location.reload();
        }, 1000);

      },
      (error: any) => {
        console.error("Errore durante la creazione dell'assegnazione.", error);
        this.errorReg = true;
      }
    );
  }

  getRealTimeHrv() {
    if(this.allenamento.intensita == 'Alta')
      this.integer = 1;
    else this.integer = 0;

    return this.realTimeHRVService.getRealTimeHRV(this.integer).subscribe(
      (result: RealTimeHRV) => {
        this.realTimeHRV = result;
        this.realTimeHRV.median_nni = Number(this.realTimeHRV.median_nni.toFixed(2))
        if(this.realTimeHRV.intensity == 1)
          this.intensita = 'Alta';
        else this.intensita = 'Medio/Bassa';

        console.log(this.realTimeHRV);
      },
      (error: any) => {
        console.error("Errore durante l'ottenimento dei dati in tempo reale.", error);
      }
    );

  }


  openModalHRV(assegnazione: AssegnazioneAllenamento) {
    this.assegnazione = assegnazione;

    this.getAllenamento();
    this.startRealTimeHrv();

    const modal = document.getElementById('modalAllenamentoHRV');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  // Funzione per chiudere il modal
  closeModalHRV() {
    this.stopRealTimeHrv()
    const modal = document.getElementById('modalAllenamentoHRV');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  startRealTimeHrv() {

    this.getRealTimeHrv();
    // Avvia l'intervallo per chiamare getRealTimeHrv() ogni 5 secondi
    this.intervalId = setInterval(() => {
      this.getRealTimeHrv();
    }, 5000);

  }

  stopRealTimeHrv() {
    // Interrompe l'intervallo
    clearInterval(this.intervalId);
  }

  openModalAssegnazione() {

    this.getAllenamentidaAssegnare();

    const modal = document.getElementById('modalNuovaAssegnazione');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModalAssegnazione() {

    const modal = document.getElementById('modalNuovaAssegnazione');
    if (modal) {
      modal.style.display = 'none';
    }

  }

  calculateDurataTotale() {
    if (this.nuovaAssegnazione.numeroCircuiti > 0 && this.nuovaAssegnazione.durataCircuiti > 0) {
      this.nuovaAssegnazione.durataInMinuti = this.nuovaAssegnazione.numeroCircuiti * this.nuovaAssegnazione.durataCircuiti;
    }
  }

  applyFilters() {
    // Applica i filtri alla lista degli allenamenti
    this.filteredAllenamenti = this.allenamenti.filter((allenamento) => {
      // Verifica se l'allenamento soddisfa i criteri di filtro
      const matchesTipo = (this.selectedTipo === '' && allenamento.tipologia === this.coach.ruoloAllenato) || allenamento.tipologia === this.selectedTipo;
      const matchesNome = this.selectedNome === '' || allenamento.nome === this.selectedNome || allenamento.nome.toLowerCase().includes(this.selectedNome.toLowerCase());

      let matchesIntensita: boolean;

      if (this.selectedIntensita === 'Medio/Bassa') {
        matchesIntensita = allenamento.intensita === 'Media' || allenamento.intensita === 'Bassa';
      } else if(this.selectedIntensita === '') {
        matchesIntensita = allenamento.intensita === 'Media' || allenamento.intensita === 'Bassa' || allenamento.intensita === 'Alta';
      } else {
        matchesIntensita = allenamento.intensita === this.selectedIntensita;
      }

      return matchesTipo && matchesNome && matchesIntensita;
    });
  }

  selectAllenamento(allenamento: Allenamento) {
    this.selectedAllenamento = allenamento;
    this.allenamentoSelezionato = true;
  }

  goBack() {
    this.mostraListaAllenamenti = true;
    this.mostraCampiAssegnazione = false;
    this.nuovaAssegnazione = {} as AssegnazioneAllenamento;
  }

  avantiClick() {
    this.mostraListaAllenamenti = false;
    this.mostraCampiAssegnazione = true;
  }

  submitForm() {
    if(this.nuovaAssegnazione.numeroCircuiti == 0)
      this.nuovaAssegnazione.durataCircuiti = 0;
    this.creaAssegnazione();
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
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

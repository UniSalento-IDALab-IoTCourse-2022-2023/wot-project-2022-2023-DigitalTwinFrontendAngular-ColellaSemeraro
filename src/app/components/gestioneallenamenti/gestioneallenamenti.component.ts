import {Component, OnInit} from '@angular/core';
import {Coach} from "../../models/Coach";
import {AtletaService} from "../../services/atleta.service";
import {Atleta} from "../../models/Atleta";
import {HrvService} from "../../services/hrv.service";
import {HRV} from "../../models/HRV";
import { orderBy } from 'lodash';
import {AssegnazioneService} from "../../services/assegnazione.service";
import {Allenamento} from "../../models/Allenamento";
import {AllenamentoService} from "../../services/allenamento.service";
import {AssegnazioneAllenamento} from "../../models/AssegnazioneAllenamento";


@Component({
  selector: 'app-gestioneallenamenti',
  templateUrl: './gestioneallenamenti.component.html',
  styleUrls: ['./gestioneallenamenti.component.scss']
})
export class GestioneallenamentiComponent implements OnInit{

  coach: Coach = {} as Coach;
  jwt: string = '';
  usernameAtleti: string[] = [];
  atleta: Atleta = {} as Atleta;
  listaHRV: HRV[] = [];
  hrv: HRV = {} as HRV;
  mostraListaAllenamenti: boolean = true;
  mostraCampiAssegnazione: boolean = false;
  allenamenti: Allenamento[] = [];
  filteredAllenamenti: Allenamento[] = [];
  selectedTipo: string = '';
  selectedNome: string = '';
  selectedIntensita: string = '';
  intensita: string = '';
  nuovaAssegnazione: AssegnazioneAllenamento = {} as AssegnazioneAllenamento;
  successReg: boolean = false;
  errorReg: boolean = false;

  selectedAllenamento: Allenamento | null = null;

  types: string[] = [this.coach.ruoloAllenato];
  intensitas: string[] = ['Medio/Bassa', 'Alta'];

  dayFilter: number | undefined;
  monthFilter: number | undefined;
  yearFilter: number | undefined;

  filteredHRV: HRV[] = [];

  constructor(private atletaService: AtletaService, private hrvService: HrvService, private assegnazioneService: AssegnazioneService,
              private allenamentoService: AllenamentoService) {
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

  getUsernameAtleti() {
    return this.atletaService.getAtletyByCoach(this.jwt, this.coach.id).subscribe(
      (atleti: Atleta[]) => {
        console.log(atleti);
        for(let i = 0; i < atleti.length; i++){
          this.usernameAtleti.push(atleti[i].username);
        }
        console.log(this.usernameAtleti);
        this.getHRVs(this.usernameAtleti);
      },
      (error: any) => {
        console.error("Errore durante l'ottenimento degli atleti.", error);
      }
    );
  }

  getHRVs(usernameAtleti: string[]) {
    return this.hrvService.getHRVByAtleti(this.jwt, usernameAtleti).subscribe(
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

        for (const hrv of this.filteredHRV) {
          // Esegui la chiamata API checkifExistsByIdRisultatoPrecedente
          this.assegnazioneService.checkifExistsByIdRisultatoPrecedente(this.jwt, hrv.id).subscribe(
            (exists: boolean) => {
              // Assegna il valore booleano a existsByIdRisultatoPrecedente
              hrv.existsByIdRisultatoPrecedente = exists;
            },
            (error: any) => {
              console.error("Errore durante il controllo dell'esistenza del risultato precedente", error);
            }
          );
        }
      },
      (error: any) => {
        console.error("Errore durante l'ottenimento degli indici HRV", error);
      }
    );
  }

  getAtletaByUsername() {
    return this.atletaService.getAtletaByUsername(this.jwt, this.hrv.usernameAtleta).subscribe(
      (atleta: Atleta) => {
        this.atleta = atleta;
        console.log(atleta);
      },
      (error: any) => {
        console.error("Errore durante l'ottenimento dell'atleta.", error);
      }
    );
  }

  getAllenamenti() {
    return this.allenamentoService.getAllAllenamenti(this.jwt).subscribe(
      (allenamenti: Allenamento[]) => {
        console.log(allenamenti);
        this.allenamenti = allenamenti;

        if(this.hrv.valorePredetto == 1) {
          this.intensita = 'Medio/Bassa';
        } else this.intensita = 'Alta';

        this.selectedIntensita = this.intensita
        this.applyFilters();
      },
      (error:any) => {
        console.error("Errore nella richiesta di ottenimento degli allenamenti.", error);
      }
    );
  }

  creaAssegnazione() {
    this.nuovaAssegnazione.idAllenamento = <string>this.selectedAllenamento?.id;
    this.nuovaAssegnazione.idRisultatoPrecedente = this.hrv.id;
    if (this.atleta.id != null) {
      this.nuovaAssegnazione.idAtleta = this.atleta.id;
    }

    return this.assegnazioneService.creaNuovaAssegnazione(this.jwt, this.nuovaAssegnazione).subscribe(
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

  openModal(hrv: HRV) {

    this.hrv = hrv;

    this.getAllenamenti();
    this.getAtletaByUsername();

    const modal = document.getElementById('modalAssegnazione');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {

    const modal = document.getElementById('modalAssegnazione');
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

      this.getUsernameAtleti();

    } else {
      // Gestisci il caso in cui l'oggetto currentUser non sia presente nel localStorage
      // ...
    }

  }

}

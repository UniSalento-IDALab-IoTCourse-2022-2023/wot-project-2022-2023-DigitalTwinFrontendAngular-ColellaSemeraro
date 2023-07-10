import {Component, OnInit} from '@angular/core';
import {Amministratore} from "../../models/Amministratore";
import {Allenamento} from "../../models/Allenamento";
import {AllenamentoService} from "../../services/allenamento.service";
import {Coach} from "../../models/Coach";

@Component({
  selector: 'app-allenamentiamministratore',
  templateUrl: './allenamentiamministratore.component.html',
  styleUrls: ['./allenamentiamministratore.component.scss']
})
export class AllenamentiamministratoreComponent implements OnInit{

  amministratore: Amministratore = {} as Amministratore;
  allenamenti: Allenamento[] = [];
  allenamento: Allenamento = {} as Allenamento;
  jwt: string = '';
  selectedTipo: string = '';
  selectedNome: string = '';
  filteredAllenamenti: Allenamento[] = [];
  newAllenamento: Allenamento = {} as Allenamento;
  successReg: boolean = false;
  errorReg: boolean = false;
  nomeAllenamento: string = '';
  allenamentoEsistente: boolean = false;

  types: string[] = ['Attaccante', 'Difensore', 'Centrocampista', 'Portiere'];
  intensitas: string[] = ['Bassa', 'Media', 'Alta'];

  constructor(private allenamentoService: AllenamentoService) {}

  getAllenamenti() {
    return this.allenamentoService.getAllAllenamenti(this.jwt).subscribe(
      (allenamenti: Allenamento[]) => {
        console.log(allenamenti);
        this.allenamenti = allenamenti;
        this.applyFilters();
      },
      (error:any) => {
        console.error("Errore nella richiesta di ottenimento degli allenamenti.", error);
      }
    );
  }

  checkIfAllenamentoEsisteCreate() {
    if(this.newAllenamento.tipologia == 'Generale')
      this.newAllenamento.tipologia = '';
    console.log(this.newAllenamento);
    return this.allenamentoService.checkIfAllenamentoEsisteByNomeETipo(this.jwt, this.newAllenamento).subscribe(
      (result: boolean) => {
        console.log(result);
        this.allenamentoEsistente = result;
        if(this.allenamentoEsistente)
          this.errorReg = true;
        if(!this.allenamentoEsistente)
          this.creaAllenamento();
      },
      (error:any) => {
        console.error("Errore durante l'esecuzione della richiesta.", error);
      }
    );
  }

  checkIfAllenamentoEsisteUpdate() {
    this.allenamento.nome = this.nomeAllenamento;
    return this.allenamentoService.checkIfAllenamentoEsisteByNomeETipo(this.jwt, this.allenamento).subscribe(
      (result: boolean) => {
        console.log(result);
        this.allenamentoEsistente = result;
        if(this.allenamentoEsistente)
          this.errorReg = true;
        if(!this.allenamentoEsistente)
          this.updateAllenamento();
      },
      (error:any) => {
        console.error("Errore durante l'esecuzione della richiesta.", error);
      }
    );
  }

  creaAllenamento() {
    return this.allenamentoService.creaAllenamento(this.jwt, this.newAllenamento).subscribe(
      (allenamento: Allenamento) => {
        console.log(allenamento);
        this.allenamento = allenamento;
        this.successReg = true;
        this.errorReg = false;

        setTimeout(() => {
          window.location.reload();
        }, 1000);

      },
      (error: any) => {
        console.error("Errore durante la creazione dell'allenamento;")
        this.successReg = false;
        this.errorReg = true;
      }
    )
  }

  updateAllenamento() {
    return this.allenamentoService.updateNomeAllenamento(this.jwt, this.allenamento.id, this.nomeAllenamento).subscribe(
      (allenamento: Allenamento) => {
        console.log(allenamento);
        this.allenamento = allenamento;
        this.successReg = true;
        this.errorReg = false;

        setTimeout(() => {
          window.location.reload();
        }, 1000);

      },
      (error: any) => {
        console.error("Errore durante l'aggiornamento dell'allenamento.", error);
        this.errorReg = true;
        this.successReg = false;
      }
    )
  }

  openModal(allenamento: Allenamento) {

    this.allenamento = allenamento;

    this.nomeAllenamento = this.allenamento.nome;

    const modal = document.getElementById('modalAllenamento');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  // Funzione per chiudere il modal
  closeModal() {
    const modal = document.getElementById('modalAllenamento');
    if (modal) {
      modal.style.display = 'none';
    }
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  isFormContentModified(): boolean {
    return (
      this.nomeAllenamento !== this.allenamento.nome
    );
  }

  openModalCreation() {
    const modal = document.getElementById('modalAllenamentoCreation');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModalCreation() {
    const modal = document.getElementById('modalAllenamentoCreation');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  creaAllenamentoClick() {
    this.checkIfAllenamentoEsisteCreate();
  }

  updateAllenamentoClick(){
    this.checkIfAllenamentoEsisteUpdate();
  }

  applyFilters() {
    // Applica i filtri alla lista dei coach
    this.filteredAllenamenti = this.allenamenti.filter((allenamento) => {
      // Verifica se il coach soddisfa i criteri di filtro
      const matchesTipo = this.selectedTipo === '' || allenamento.tipologia === this.selectedTipo;
      const matchesNome = this.selectedNome === '' || allenamento.nome === this.selectedNome || allenamento.nome.toLowerCase().includes(this.selectedNome.toLowerCase());

      return matchesTipo && matchesNome;
    });
  }

  ngOnInit(): void {

    // Recupera l'oggetto currentUser dal localStorage
    const currentUserJSON = localStorage.getItem('currentUser')!;

    // Verifica se l'oggetto currentUser è presente nel localStorage
    if (currentUserJSON) {
      // Parsa l'oggetto JSON e ottieni il token
      const currentUser = JSON.parse(currentUserJSON);
      this.amministratore = currentUser.amministratore;
      this.jwt = currentUser.token;
      if (this.amministratore == undefined) {
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

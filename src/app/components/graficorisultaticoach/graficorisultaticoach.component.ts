import {Component, OnInit} from '@angular/core';
import Chart, {ChartOptions} from 'chart.js/auto';
import {Coach} from "../../models/Coach";
import {HrvService} from "../../services/hrv.service";
import {AtletaService} from "../../services/atleta.service";
import {Atleta} from "../../models/Atleta";
import {HRV} from "../../models/HRV";
import {orderBy} from "lodash";

@Component({
  selector: 'app-graficorisultaticoach',
  templateUrl: './graficorisultaticoach.component.html',
  styleUrls: ['./graficorisultaticoach.component.scss']
})
export class GraficorisultaticoachComponent implements OnInit{

  public chart: any;
  coach: Coach = {} as Coach;
  jwt: string = '';
  listaHRV: HRV[] = [];
  usernameAtleti: string[] = [];
  labelsData: Date[] = [];
  medianData: number[] = [];
  intensitaData: number[] = [];
  usernameData: string[] = [];
  selectedAtleta: string = '';
  filteredHRV: HRV[] = [];

  constructor(private hrvService: HrvService, private atletaService: AtletaService) {}

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
        this.listaHRV = orderBy(listaHRV, 'data', 'asc');

        this.applyFilters();

        for(let i=0; i<this.filteredHRV.length; i++) {
          this.labelsData.push(this.filteredHRV[i].data);
          this.medianData.push(this.filteredHRV[i].median_nni);
          this.intensitaData.push(this.filteredHRV[i].valorePredetto*100);
          this.usernameData.push(this.filteredHRV[i].usernameAtleta);
        }

        this.createChart()

      },
      (error: any) => {
        console.error("Errore durante l'ottenimento degli indici HRV", error);
      }
    );
  }

  updateChart() {

    this.applyFilters();

    this.labelsData = [];
    this.medianData = [];
    this.intensitaData = [];
    this.usernameData = [];

    for(let i=0; i<this.filteredHRV.length; i++) {
      this.labelsData.push(this.filteredHRV[i].data);
      this.medianData.push(this.filteredHRV[i].median_nni);
      this.intensitaData.push(this.filteredHRV[i].valorePredetto*100);
      this.usernameData.push(this.filteredHRV[i].usernameAtleta);
    }

    // Se il grafico esiste già, distruggilo prima di crearne uno nuovo
    if (this.chart) {
      this.chart.destroy();
    }

    this.createChart()

  }


  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: this.labelsData,
        datasets: [
          {
            label: "Median NNI",
            data: this.medianData,
            backgroundColor: 'blue'
          },
          {
            label: "Intensità",
            data: this.intensitaData,
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.9,
        plugins: {
          tooltip: {
            callbacks: {
              afterLabel: (context: any) => {
                const index = context.dataIndex;
                return this.usernameData[index];
              },
              label: (context: any) => {
                const datasetIndex = context.datasetIndex;
                const index = context.dataIndex;
                if (datasetIndex === 1) {
                  if (this.intensitaData[index] === 0)
                    return 'Intensità Medio/Bassa';
                  else
                    return 'Intensità Alta';
                }
                return 'Median NNI: '+this.medianData[index];
              }
            }
          }
        }
      } as ChartOptions<'line'>
    });
  }

  applyFilters() {
    // Applica i filtri alla lista degli allenamenti
    this.filteredHRV = this.listaHRV.filter((hrv) => {
      // Verifica se l'allenamento soddisfa i criteri di filtro
      return this.selectedAtleta === '' || hrv.usernameAtleta === this.selectedAtleta;
    });
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

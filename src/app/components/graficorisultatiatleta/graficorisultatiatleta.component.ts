import {Component, OnInit} from '@angular/core';
import {Atleta} from "../../models/Atleta";
import {HRV} from "../../models/HRV";
import {HrvService} from "../../services/hrv.service";
import Chart, {ChartOptions} from "chart.js/auto";
import {orderBy} from "lodash";

@Component({
  selector: 'app-graficorisultatiatleta',
  templateUrl: './graficorisultatiatleta.component.html',
  styleUrls: ['./graficorisultatiatleta.component.scss']
})
export class GraficorisultatiatletaComponent implements OnInit {

  public chart: any;
  atleta: Atleta = {} as Atleta;
  jwt: string = '';
  listaHRV: HRV[] = [];
  labelsData: Date[] = [];
  medianData: number[] = [];
  intensitaData: number[] = [];
  usernameAtleta: string[] = [];

  constructor(private hrvService: HrvService) {
  }

  getHRVs() {
    return this.hrvService.getHRVByAtleti(this.jwt, this.usernameAtleta).subscribe(
      (listaHRV: HRV[]) => {
        console.log(listaHRV);
        this.listaHRV = listaHRV;
        this.listaHRV = orderBy(listaHRV, 'data', 'asc');

        for(let i=0; i<this.listaHRV.length; i++) {
          this.labelsData.push(this.listaHRV[i].data);
          this.medianData.push(this.listaHRV[i].median_nni);
          this.intensitaData.push(this.listaHRV[i].valorePredetto*100);
        }

        this.createChart()

      },
      (error: any) => {
        console.error("Errore durante l'ottenimento degli indici HRV", error);
      }
    );
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
      this.getHRVs();

    } else {
      // Gestisci il caso in cui l'oggetto currentUser non sia presente nel localStorage
      // ...
    }

  }


}

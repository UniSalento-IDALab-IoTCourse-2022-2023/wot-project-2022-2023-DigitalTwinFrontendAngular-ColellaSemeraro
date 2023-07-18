import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Atleta} from "../../models/Atleta";
import {HRV} from "../../models/HRV";
import {HrvService} from "../../services/hrv.service";
import Chart, {ChartOptions} from "chart.js/auto";
import {orderBy} from "lodash";
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-graficorisultatiatleta',
  templateUrl: './graficorisultatiatleta.component.html',
  styleUrls: ['./graficorisultatiatleta.component.scss']
})
export class GraficorisultatiatletaComponent implements OnInit {

  @ViewChild('chartCanvas', { static: true }) chartCanvas: ElementRef<HTMLCanvasElement>;


  public chart: any;
  atleta: Atleta = {} as Atleta;
  jwt: string = '';
  listaHRV: HRV[] = [];
  labelsData: Date[] = [];
  medianData: number[] = [];
  intensitaData: number[] = [];
  usernameAtleta: string[] = [];

  constructor(private hrvService: HrvService) {
    this.chartCanvas = {} as ElementRef<HTMLCanvasElement>;
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
        aspectRatio: 3.25,
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

  downloadHRV() {
    this.hrvService.downloadCSV(this.jwt, this.listaHRV).subscribe((data: Blob) => {
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'hrv_list.csv';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  downloadChart() {
    const chartCanvas = this.chartCanvas.nativeElement;

    // Crea un nuovo oggetto jsPDF
    const pdf = new jsPDF();

    // Utilizza html2canvas per generare un'immagine del canvas
    html2canvas(chartCanvas).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');

      // Imposta le dimensioni del canvas nel PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;


      const title = 'Risultati per '+ this.atleta.nome + " " + this.atleta.cognome;
      pdf.setFontSize(18);
      pdf.setFontStyle('bold');
      pdf.text(title, pdfWidth / 2, 20, {align: 'center'});

      // Aggiungi l'immagine al PDF
      pdf.addImage(imageData, 'PNG', 0, 50, pdfWidth, pdfHeight);

      // Salva il PDF
      pdf.save('myChart.pdf');


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

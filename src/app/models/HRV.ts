export interface HRV {
  id: string;
  usernameAtleta: string;
  median_nni: number;
  data: Date;
  valorePredetto: number;
  existsByIdRisultatoPrecedente: boolean; // attributo che serve a capire se è già stato assegnato un allenamento sulla base delle metriche HRV
}

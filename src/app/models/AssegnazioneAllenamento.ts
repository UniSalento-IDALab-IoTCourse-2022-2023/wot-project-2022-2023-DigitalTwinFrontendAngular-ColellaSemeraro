export interface AssegnazioneAllenamento {
  id: string;
  idAllenamento: string;
  idAtleta: string;
  numeroCircuiti: number;
  durataInMinuti: number;
  dataAssegnazione: Date;
  idRisultatoPrecedente: string;
  durataCircuiti: number;
  allenamentoInDataOdierna: boolean;
}

export interface AssegnazioneAllenamento {
  id: string;
  idAllenamento: string;
  idAtleta: string;
  indiceSforzo: number;
  numeroCircuiti: number;
  durataInMinuti: number;
  calorieConsumate: number;
  intensita: Intensita;
  dataAssegnazione: Date;
}

export enum Intensita {
  Bassa = "Bassa",
  Media = "Media",
  Elevata = "Elevata"
}

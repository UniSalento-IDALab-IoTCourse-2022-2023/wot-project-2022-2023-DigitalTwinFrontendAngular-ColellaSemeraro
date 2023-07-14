import { Injectable } from '@angular/core';
import {AssegnazioneAllenamento} from "../models/AssegnazioneAllenamento";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AssegnazioneService {

  assegnazione: AssegnazioneAllenamento = {} as AssegnazioneAllenamento;

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type':'application/json',
      'Authorization':''

    })
  }

  checkifExistsByIdRisultatoPrecedente(jwt: string, idRisultatoPrecedente: string): Observable<boolean> {

    const url = "http://localhost:8081/api/assegnazioni/existsByIdRisultatoPrecedente/"+idRisultatoPrecedente;

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.get<boolean>(url, this.httpOptions);

  }

  creaNuovaAssegnazione(jwt: string, assegnazioneDTO: AssegnazioneAllenamento, idCoach: string | undefined): Observable<AssegnazioneAllenamento> {

    const url = "http://localhost:8081/api/assegnazioni/"+idCoach+"/";

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.post<AssegnazioneAllenamento>(url, assegnazioneDTO, this.httpOptions);

  }

  findAllByIdAtleta(jwt: string, idAtleta: string | undefined): Observable<AssegnazioneAllenamento[]> {

    const url = "http://localhost:8081/api/assegnazioni/findAllByAtletaId/"+idAtleta;

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.get<AssegnazioneAllenamento[]>(url, this.httpOptions);

  }

  findMostRecentByIdAtleta(jwt: string, idAtleta: string | undefined): Observable<AssegnazioneAllenamento> {

    const url = "http://localhost:8081/api/assegnazioni/findMostRecentByIdAtleta/"+idAtleta+"/";

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.get<AssegnazioneAllenamento>(url, this.httpOptions);

  }

}

import { Injectable } from '@angular/core';
import {Atleta} from "../models/Atleta";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AtletaService {

  atleta:Atleta = {} as Atleta

  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type':'application/json',
      'Authorization':''

    })
  }

  constructor(private http:HttpClient) { }

  getAllAtleti(jwt: string): Observable<Atleta[]> {

    const url = "http://localhost:8080/api/users/atleta/findAll"

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.get<Atleta[]>(url, this.httpOptions)

  }

  getAtletaById(jwt: string, idAtleta: string | undefined): Observable<Atleta> {

    const url = "http://localhost:8080/api/users/atleta/findById/"+idAtleta;

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.get<Atleta>(url, this.httpOptions)

  }

  checkifAtletaAllenatoDaCoach(jwt: string, idCoach: string | undefined): Observable<boolean> {

    const url = "http://localhost:8080/api/users/atleta/existsByCoachId/"+idCoach;

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.get<boolean>(url, this.httpOptions)

  }

  updateSquadraCoachAtleta(jwt: string, username: string, squadra: string, idCoach: string | undefined): Observable<any> {

    const url = "http://localhost:8080/api/users/atleta/updateRuoloSquadraCoach/"+username;

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    let atletaDTO = {
      squadra: squadra,
      idCoach: idCoach
    }

    return this.http.patch(url, atletaDTO, {
        ...this.httpOptions,
        responseType: 'text' // Specifica il tipo di risposta come testo
      }
    );

  }

  creaAtleta(jwt: string, atletaDTO: Atleta): Observable<Atleta> {

    const url = "http://localhost:8080/api/users/atleta/"

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.post<Atleta>(url, atletaDTO, this.httpOptions);

  }

  getAtletyByCoach(jwt: string, idCoach: string | undefined): Observable<Atleta[]> {

    const url = "http://localhost:8080/api/users/atleta/findByCoachId/"+idCoach;

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.get<Atleta[]>(url, this.httpOptions);

  }

  updatePesoAltezza(jwt: string, idCoach: string | undefined, usernameAtleta: string, idCoachAtleta: string, altezza: number, peso: number): Observable<any> {

    const url = "http://localhost:8080/api/users/atleta/updateAltezzaEPeso/"+idCoach;

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    const atletaDTO = {
      idCoach: idCoachAtleta,
      username: usernameAtleta,
      altezza: altezza,
      peso: peso
    }

    return this.http.patch(url, atletaDTO, {
        ...this.httpOptions,
        responseType: 'text' // Specifica il tipo di risposta come testo
      }
    );

  }

  getAtletaByUsername(jwt: string, username: string): Observable<Atleta> {

    const url = "http://localhost:8080/api/users/atleta/find/username/"+username;

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.get<Atleta>(url, this.httpOptions);


  }

}

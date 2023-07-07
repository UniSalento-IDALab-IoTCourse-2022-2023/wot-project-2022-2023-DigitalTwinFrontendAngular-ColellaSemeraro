import { Injectable } from '@angular/core';
import {Coach} from "../models/Coach";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  coach: Coach = {} as Coach;

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type':'application/json',
      'Authorization':''

    })
  }

  getAllCoaches(jwt: string): Observable<Coach[]> {

    const url = "http://localhost:8080/api/users/coach/findAll"

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.get<Coach[]>(url, this.httpOptions)

  }

  getCoachById(jwt: string, idCoach: string): Observable<Coach> {

    const url = "http://localhost:8080/api/users/coach/findById/"+idCoach;

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.get<Coach >(url, this.httpOptions)

  }

  creaCoach(jwt: string, coachDTO: Coach):Observable<Coach> {

    const url = "http://localhost:8080/api/users/coach/"

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.post<Coach>(url, coachDTO, this.httpOptions)

  }

  checkifCoachExistsBySquadraAndRuolo(jwt: string, squadra: string, ruoloAllenato: string): Observable<boolean> {

    const url = "http://localhost:8080/api/users/coach/checkifExistsBySquadraAndRuolo";

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    let richiesta = {
      squadra: squadra,
      ruoloAllenato: ruoloAllenato
    }

    return this.http.post<boolean>(url, richiesta, this.httpOptions)

  }

  updateRuoloSquadraCoach(jwt: string, squadra: string, ruoloAllenato: string, username: string): Observable<any> {

    const url = "http://localhost:8080/api/users/coach/updateRuoloSquadraCoach/"+username;

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    let coachDTO = {
      squadra: squadra,
      ruoloAllenato: ruoloAllenato
    }

    return this.http.patch(url, coachDTO, {
      ...this.httpOptions,
      responseType: 'text' // Specifica il tipo di risposta come testo
    }
    );

  }

  getCoachBySquadraERuolo(jwt: string, squadra: string, ruolo: string):Observable<Coach> {
    const url = "http://localhost:8080/api/users/coach/findByTeamAndRole";

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    let richiesta = {
      squadra: squadra,
      ruoloAllenato: ruolo
    }

    return this.http.post<Coach>(url, richiesta, this.httpOptions)
  }

}

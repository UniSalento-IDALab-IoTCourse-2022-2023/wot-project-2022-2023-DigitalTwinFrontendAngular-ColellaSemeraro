import { Injectable } from '@angular/core';
import {HRV} from "../models/HRV";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HrvService {

  hrv: HRV = {} as HRV;

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type':'application/json',
      'Authorization':''

    })
  }

  getHRVByAtleti(jwt: string, usernameAtleti: string[]): Observable<HRV[]> {

    //const url = "http://localhost:8082/api/hrv/findAllByAtleti"

    const url = "https://x7oeqezkzi.execute-api.us-east-1.amazonaws.com/dev/api/hrv/findAllByAtleti"

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    const richiestaUsernameAtleti = {
      usernameAtleti: usernameAtleti
    }

    return this.http.post<HRV[]>(url, richiestaUsernameAtleti, this.httpOptions);

  }

  downloadCSV(jwt: string, lista_hrv: HRV[]) {

    //const url = "http://localhost:8082/api/hrv/downloadCsv";

    const url = "https://x7oeqezkzi.execute-api.us-east-1.amazonaws.com/dev/api/hrv/downloadcsv";

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    const hrvList = {
      lista_hrv: lista_hrv
    };

    return this.http.post(url, hrvList, {
      ...this.httpOptions,
      responseType: 'blob' // Specifica il tipo di risposta come testo
    })

  }

}

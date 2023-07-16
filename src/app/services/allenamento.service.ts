import { Injectable } from '@angular/core';
import {Allenamento} from "../models/Allenamento";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AllenamentoService {

  allenamento: Allenamento = {} as Allenamento;

  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type':'application/json',
      'Authorization':''

    })
  }

  constructor(private http:HttpClient) { }

  getAllAllenamenti(jwt: string): Observable<Allenamento[]> {

    //const url = "http://localhost:8081/api/allenamenti/findAll"

    const url = "https://x7oeqezkzi.execute-api.us-east-1.amazonaws.com/dev/api/allenamenti/findAll";

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.get<Allenamento[]>(url, this.httpOptions);

  }

  creaAllenamento(jwt: string, allenamentoDTO: Allenamento): Observable<Allenamento> {

    //const url = "http://localhost:8081/api/allenamenti/"

    const url = "https://x7oeqezkzi.execute-api.us-east-1.amazonaws.com/dev/api/allenamenti";

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.post<Allenamento>(url, allenamentoDTO, this.httpOptions);

  }

  updateNomeAllenamento(jwt: string, idAllenamento: string, nomeAllenamento: string): Observable<Allenamento> {

    //const url = "http://localhost:8081/api/allenamenti/changeTrainName/"+idAllenamento;

    const url = "https://x7oeqezkzi.execute-api.us-east-1.amazonaws.com/dev/api/allenamenti/changeTrainName/"+idAllenamento;

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    const allenamentoDTO = {
      nome: nomeAllenamento
    }

    return this.http.patch<Allenamento>(url, allenamentoDTO, this.httpOptions);

  }

  checkIfAllenamentoEsisteByNomeETipo(jwt: string, allenamentoDTO: Allenamento): Observable<boolean> {

    //const url = "http://localhost:8081/api/allenamenti/checkIfTrainAlreadyExists";

    const url = "https://x7oeqezkzi.execute-api.us-east-1.amazonaws.com/dev/api/allenamenti/checkIfTrainAlreadyExists";

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.post<boolean>(url, allenamentoDTO, this.httpOptions);

  }

  getAllenamentoById(jwt: string, idAllenamento: string): Observable<Allenamento> {

    //const url = "http://localhost:8081/api/allenamenti/findById/"+idAllenamento;

    const url = "https://x7oeqezkzi.execute-api.us-east-1.amazonaws.com/dev/api/allenamenti/findById/"+idAllenamento;

    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);

    return this.http.get<Allenamento>(url, this.httpOptions);

  }

}

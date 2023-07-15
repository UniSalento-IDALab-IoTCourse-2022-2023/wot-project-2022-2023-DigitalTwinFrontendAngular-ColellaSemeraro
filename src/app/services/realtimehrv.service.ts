import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RealTimeHRV} from "../models/RealTimeHRV";

@Injectable({
  providedIn: 'root'
})
export class RealtimehrvService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type':'application/json'

    })
  }

  getRealTimeHRV(integer: number): Observable<RealTimeHRV> {

    const url = "https://bwmsz75yoc.execute-api.us-east-1.amazonaws.com/dev/realtimehrv";

    const integerDTO = {
      integer: integer
    };

    return this.http.post<RealTimeHRV>(url, integerDTO, this.httpOptions);

  }



}

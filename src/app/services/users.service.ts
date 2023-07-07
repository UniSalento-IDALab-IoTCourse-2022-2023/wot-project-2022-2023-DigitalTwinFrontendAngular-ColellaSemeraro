import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NavigationEnd, Router} from "@angular/router";
import {catchError, map, Observable, of, switchMap, tap} from "rxjs";
import {Atleta} from "../models/Atleta";
import {Coach} from "../models/Coach";
import {Amministratore} from "../models/Amministratore";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  atleta:Atleta = {} as Atleta
  coach:Coach = {} as Coach
  amministratore:Amministratore = {} as Amministratore


  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type':'application/json',
      'Authorization':''

    })
  }

  constructor(private router: Router, private http:HttpClient) { }

  // Metodo per effettuare il login
  login(username: string, password: string): Observable<boolean> {
    const loginDTO = {
      username: username,
      password: password
    };

    //const loginUrl: string = "https://fotjz0nseb.execute-api.us-east-1.amazonaws.com/dev/api/users/authenticate";
    const loginUrl:string = "http://localhost:8080/api/users/authenticate";

    return this.http.post(loginUrl, loginDTO).pipe(
      map((response: any) => response.jwt),
      switchMap((jwt: string) => {
        localStorage.setItem('currentUser', JSON.stringify({ 'token': jwt }));
        return this.checkUserRole(username).pipe(
          tap((role: string) => {
            console.log(role);
            if (role === 'ATLETA') {
              this.router.navigate(['/home-atleta']);
              this.findByUsernameAtleta(loginDTO.username).subscribe(
                (atleta: Atleta) => {
                  this.atleta = atleta;
                  const currentUser = {
                    token: jwt,
                    atleta: atleta
                  };

                  // Salvataggio dell'oggetto nel localStorage
                  localStorage.setItem('currentUser', JSON.stringify(currentUser));
                  // Puoi eseguire altre operazioni con il valore del cliente qui
                },
                (error: any) => {
                  // Gestisci eventuali errori qui
                }
              );

            } else if (role === 'COACH') {
              this.router.navigate(['/home-coach']);
              this.findByUsernameCoach(loginDTO.username).subscribe(
                (coach: Coach) => {
                  this.coach = coach;
                  // Creazione dell'oggetto combinato con token e dati del cliente
                  const currentUser = {
                    token: jwt,
                    coach: coach
                  };

                  // Salvataggio dell'oggetto nel localStorage
                  localStorage.setItem('currentUser', JSON.stringify(currentUser));
                  // Puoi eseguire altre operazioni con il valore del cliente qui
                },
                (error: any) => {
                  // Gestisci eventuali errori qui
                }
              );
            } else if (role === 'AMMINISTRATORE') {
              this.router.navigate(['/home-amministratore']);
              this.findByUsernameAmministratore(loginDTO.username).subscribe(
                (amministratore: Amministratore) => {
                  this.amministratore = amministratore;
                  // Creazione dell'oggetto combinato con token e dati del cliente
                  const currentUser = {
                    token: jwt,
                    amministratore: amministratore
                  };

                  // Salvataggio dell'oggetto nel localStorage
                  localStorage.setItem('currentUser', JSON.stringify(currentUser));
                  // Puoi eseguire altre operazioni con il valore del cliente qui
                },
                (error: any) => {
                  // Gestisci eventuali errori qui
                }
              );
            } else {
              throw new Error('Ruolo sconosciuto.');
            }
          }),
          map(() => false) // Login riuscito, emetti valore false
        );
      }),
      catchError((error: any) => {
        return of(true); // Errore di login, emetti valore true
      })
    );
  }

  private checkUserRole(username: string): Observable<string> {
    // Eseguire la chiamata HTTP per determinare il ruolo dell'utente
    // Restituire un Observable contenente il ruolo (es. 'cliente', 'ammcomune', 'ammazienda')
    // Esempio:
    var jwt = JSON.parse(localStorage.getItem('currentUser')!).token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);
    //var urlRole = "https://fotjz0nseb.execute-api.us-east-1.amazonaws.com/dev/api/users/role/"+username
    var urlRole = 'http://localhost:8080/api/users/role/' + username;
    return this.http.get<RoleResponse>(urlRole, this.httpOptions).pipe(
      map((response) => response.role)
    );
  }

  findByUsernameAtleta(username:string): Observable<Atleta> {
    var jwt = JSON.parse(localStorage.getItem('currentUser')!).token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);
    //var urlFindCliente = "https://fotjz0nseb.execute-api.us-east-1.amazonaws.com/dev/api/users/cliente/find/username/"+username;
    var urlFindCliente = 'http://localhost:8080/api/users/atleta/find/username/' + username;
    return this.http.get<Atleta>(urlFindCliente, this.httpOptions).pipe(
      map((response: any) => response as Atleta)
    );
  }

  findByUsernameCoach(username:string): Observable<Coach> {
    var jwt = JSON.parse(localStorage.getItem('currentUser')!).token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);
    //var urlFindAmmComune = "https://fotjz0nseb.execute-api.us-east-1.amazonaws.com/dev/api/users/ammcomune/find/username/"+username;
    var urlFindAmmComune = 'http://localhost:8080/api/users/coach/find/username/' + username;
    return this.http.get<Coach>(urlFindAmmComune, this.httpOptions).pipe(
      map((response: any) => response as Coach)
    );
  }

  findByUsernameAmministratore(username:string): Observable<Amministratore> {
    var jwt = JSON.parse(localStorage.getItem('currentUser')!).token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+jwt);
    //var urlFindAmmAzienda = "https://fotjz0nseb.execute-api.us-east-1.amazonaws.com/dev/api/users/ammazienda/find/username/"+username;
    var urlFindAmmAzienda = 'http://localhost:8080/api/users/amministratore/find/username/' + username;
    return this.http.get<Amministratore>(urlFindAmmAzienda, this.httpOptions).pipe(
      map((response: any) => response as Amministratore)
    );
  }

  logout() {
    localStorage.clear();

    // Disabilita la cache del browser per evitare la navigazione indietro o avanti
    history.pushState(null, '', location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }


}

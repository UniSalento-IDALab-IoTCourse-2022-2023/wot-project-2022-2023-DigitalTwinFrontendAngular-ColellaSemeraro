import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Coach} from "./models/Coach";
import {Atleta} from "./models/Atleta";
import {Amministratore} from "./models/Amministratore";
import {UsersService} from "./services/users.service";
import {Router, NavigationEnd } from "@angular/router";
import {filter, Subject, Subscription, takeUntil} from "rxjs";
import {LoginComponent} from "./components/login/login.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'iotdigitaltwin';

  coach: Coach = {} as Coach;
  atleta: Atleta = {} as Atleta;
  amministratore: Amministratore = {} as Amministratore;
  linkHrefHome: string = '';
  currentRouter: string = '';
  enableHome: boolean = true;
  ifAmministratore: boolean = false;
  ifCoach: boolean = false;
  ifAtleta: boolean = false;
  linkHrefGuida: string = '';


  constructor(private usersService: UsersService, private router: Router) {
  }

  logout() {

    const confermaLogout = window.confirm('Sei sicuro di voler uscire?');
    if(confermaLogout) {
      this.usersService.logout();
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          window.location.reload();
        }
      });
      this.router.navigate(['/'])
    }

  }


  ngOnInit() {

    this.currentRouter = this.router.url;
    // Recupera l'oggetto currentUser dal localStorage
    const currentUserJSON = localStorage.getItem('currentUser')!;

    // Verifica se l'oggetto currentUser è presente nel localStorage
    if (currentUserJSON) {
      // Parsa l'oggetto JSON e ottieni il token
      const currentUser = JSON.parse(currentUserJSON);
      this.coach = currentUser.coach;
      const jwt = currentUser.token;
      if (this.coach != undefined) {
        this.linkHrefHome = '/home-coach'
        this.linkHrefGuida = '/guida-coach'
        this.ifCoach = true;
      } else {
        this.atleta = currentUser.atleta;
        if(this.atleta != undefined) {
          this.linkHrefHome = '/home-atleta'
          this.linkHrefGuida = '/guida-atleta'
          this.ifAtleta = true;
        } else {
          this.amministratore = currentUser.amministratore;
          if(this.amministratore != undefined) {
            this.linkHrefHome = '/home-amministratore'
            this.linkHrefGuida = '/guida-amministratore'
            this.ifAmministratore = true;
          }
        }}


    } else {

      this.linkHrefHome = '';
      this.enableHome = false;

    }
  }




}

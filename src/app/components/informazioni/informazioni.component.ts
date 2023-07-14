import { Component } from '@angular/core';

@Component({
  selector: 'app-informazioni',
  templateUrl: './informazioni.component.html',
  styleUrls: ['./informazioni.component.scss']
})
export class InformazioniComponent {

  goBack() {
    window.history.back();
  }

}

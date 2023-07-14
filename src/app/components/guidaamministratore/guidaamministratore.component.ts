import { Component } from '@angular/core';

@Component({
  selector: 'app-guidaamministratore',
  templateUrl: './guidaamministratore.component.html',
  styleUrls: ['./guidaamministratore.component.scss']
})
export class GuidaamministratoreComponent {

  goBack() {
    window.history.back();
  }

}

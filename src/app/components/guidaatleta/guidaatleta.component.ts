import { Component } from '@angular/core';

@Component({
  selector: 'app-guidaatleta',
  templateUrl: './guidaatleta.component.html',
  styleUrls: ['./guidaatleta.component.scss']
})
export class GuidaatletaComponent {

  goBack() {
    window.history.back();
  }

}

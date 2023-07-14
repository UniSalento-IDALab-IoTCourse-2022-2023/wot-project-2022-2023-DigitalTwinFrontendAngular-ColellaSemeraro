import { Component } from '@angular/core';

@Component({
  selector: 'app-guidacoach',
  templateUrl: './guidacoach.component.html',
  styleUrls: ['./guidacoach.component.scss']
})
export class GuidacoachComponent {

  goBack() {
    window.history.back();
  }


}

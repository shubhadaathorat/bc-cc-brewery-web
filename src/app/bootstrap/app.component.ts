import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'code-challenge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  constructor(private swUpdate: SwUpdate) {}

  ngOnInit() {
     // added this code to checkForUpdate and reload if new build version pushed
     if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(() => {
        this.swUpdate.checkForUpdate().then(() => {
          window.location.reload();
          console.log('SW Updated');
        });
      });
    }
  }
}

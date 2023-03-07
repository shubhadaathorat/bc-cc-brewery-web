import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from './service/spinner.service';

@Component({
  selector: 'code-challenge-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnDestroy {

  isShow: boolean = false;
  subscriptionShow: Subscription;
  subscriptionHide: Subscription;

  constructor(private spinnerService: SpinnerService) {
    this.subscriptionShow = this.spinnerService.show$.subscribe((data: string) => {
      this.show(data);
    });
    this.subscriptionHide = this.spinnerService.hide$.subscribe(() => {
      this.hide();
    });
  }

  ngOnDestroy() {
    if (this.subscriptionShow) { this.subscriptionShow.unsubscribe(); }
    if (this.subscriptionHide) { this.subscriptionHide.unsubscribe(); }
  }

  show(spinType?: string) {
    if (spinType === 'sub') {
      this.hide();
    } else {
      this.isShow = true;
    }
  }
  hide() {
    this.isShow = false;
  }
}

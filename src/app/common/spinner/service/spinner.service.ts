import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SpinnerService {

  // Observable string sources
  private showSource = new Subject();
  private hideSource = new Subject();
  // Observable string streams
  show$ = this.showSource.asObservable();
  hide$ = this.hideSource.asObservable();

  constructor() { }
  show(spinType?: string) {
    this.showSource.next(spinType);
  }
  hide() {
    this.hideSource.next();
  }
}

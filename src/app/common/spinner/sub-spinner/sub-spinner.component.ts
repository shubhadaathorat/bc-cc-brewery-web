import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'code-challenge-sub-spinner',
  templateUrl: './sub-spinner.component.html',
  styleUrls: ['./sub-spinner.component.scss']
})
export class SubSpinnerComponent implements OnInit {
  @Input() isShowSpin:boolean;

  constructor() {}
  
  ngOnInit(){}
}

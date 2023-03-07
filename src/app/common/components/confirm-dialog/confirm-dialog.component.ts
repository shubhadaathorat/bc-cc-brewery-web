import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../models/dialog';

@Component({
  selector: 'code-challenge-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {}

  ngOnInit(): void {}
}

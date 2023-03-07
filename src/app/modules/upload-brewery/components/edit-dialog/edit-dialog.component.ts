import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'code-challenge-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  value: any;
  name: any;
  editDataForm:FormGroup;
  text: string;

  constructor(private formBuilder: FormBuilder,private router : Router,public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.editDataForm = this.formBuilder.group({
      editData : this.data.value ? this.data.value : ''
    });
  }
  update(){
    let updatedValue = this.editDataForm.value.editData;
    this.dialogRef.close(updatedValue); 
  }
  cancel(){
    this.dialogRef.close(this.data.value);
  }
}

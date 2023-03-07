import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { of, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, flatMap, map } from 'rxjs/operators';

@Component({
  selector: 'code-challenge-common-filters',
  templateUrl: './common-filters.component.html',
  styleUrls: ['./common-filters.component.scss']
})
export class CommonFiltersComponent implements OnInit, OnDestroy {
  showSearchBox = true;
  showSearchIcon = false;
  selDateFrom:any;
  selDateTo: any;
  minDateTo = '';
  maxDateFrom = '';
  dateForm : FormGroup;
  @Output() onSubmitDates = new EventEmitter<any>();
  @Output() onKeyUpSearch = new EventEmitter<any>();
  public keyUp = new Subject<any>();
  SearchSubscription: Subscription;
  @Input() isFormReq = true ;
  
  constructor(private datepipe: DatePipe,private fb:FormBuilder,private datePipe: DatePipe) { 
    this.applyFilter()
  }

  ngOnInit(): void {
    this.dateForm = this.fb.group({
      dateFrom: ['',Validators.required],
      dateTo: ['',Validators.required],
    })
  }
  // get Datepicker values on apply button click
  datesSubmitHandler(){
    let datesSelected = {
      fromDate: this.datePipe.transform(this.dateForm.value.dateFrom,'yyyy-MM-dd'),
      toDate: this.datePipe.transform(this.dateForm.value.dateTo,'yyyy-MM-dd')
    }
    this.onSubmitDates.emit(datesSelected);
  }
  // get Datepicker values on clear button click
  clearDatepickers(){
    if(this.dateForm.value.dateFrom || this.dateForm.value.dateTo){
        this.dateForm.reset();
      let datesSelected = {
        fromDate: this.dateForm.value.dateFrom,
        toDate: this.dateForm.value.dateTo
      }
      this.onSubmitDates.emit(datesSelected);
    }
  }
  // get debounced search value on key up event
  applyFilter() {
    this.SearchSubscription = this.keyUp.pipe(
      map(event => event.target.value),
      debounceTime(1500),
      distinctUntilChanged(),
      flatMap(search => of(search).pipe(delay(100)))
    ).subscribe((value:any) =>{
      this.onKeyUpSearch.emit(value);
    });
  }
  // hide/unhide searchbar
  
  // searchPopup(){
  //   if(!this.showSearchBox){
  //     this.showSearchBox = true;
  //     this.showSearchIcon = false;
  //   }else{
  //     this.showSearchBox = false;
  //     this.showSearchIcon = true;
  //     this.onKeyUpSearch.emit("");
  //   }
  // }

  // function for detecting changes in fromDate datepicker
  addEventForDateFrom(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selDateFrom = this.datepipe.transform(event.target.value , "yyyy-MM-dd");
  }
  // function for detecting changes in toDate datepicker
  addEventForDateTo(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selDateTo = this.datepipe.transform(event.target.value , "yyyy-MM-dd");
  }

  ngOnDestroy(): void {
      if(this.SearchSubscription){
        this.SearchSubscription.unsubscribe();
      }
  }
}

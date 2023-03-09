import { Component, OnInit,ViewChild,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import { MismatchBreweryService } from '../../services/mismatch-brewery.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from "@angular/material/table";
import { AlertService } from "src/app/common/services/alert.service";
import * as XLSX from "xlsx";

@Component({
  selector: 'code-challenge-mismatch',
  templateUrl: './mismatch.component.html',
  styleUrls: ['./mismatch.component.scss']
})
export class MismatchComponent implements OnInit {

  mismatchType = '';
  brewerySubcription: Subscription;
  userProvince = '';
  displayedColumns :string[] = [];
  mismatchBreweries:any;
  isHidden = true;
  pageSize = 5;
  mismatchDatasourceLength = 0;
  pageSizeOptions = [5, 10, 15, 20, 25, 100];
  mismatchDatasource = new MatTableDataSource();
  uploadSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor( private route: ActivatedRoute, 
          private mismatchBrewerySvc: MismatchBreweryService, 
          private localStorageSvc: LocalStorageService) {
    this.route.params.subscribe(params => {
      this.mismatchType = params["type"];
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    let userDetails = this.localStorageSvc.getWithExpiry('User');
    this.userProvince = userDetails?.association.provienc;
    console.log(this.userProvince);
    this.getMismatchBreweries();
  }

  getMismatchBreweries() {    
    this.brewerySubcription = this.mismatchBrewerySvc.getMismatchBreweries(this.mismatchType, this.changeProvinceText()).subscribe(breweries => {
      console.log(breweries);
      this.mismatchBreweries = breweries;
      this.displayedColumns = Object.keys(breweries[0]);
      this.mismatchDatasource = new MatTableDataSource<any>(this.mismatchBreweries);
      this.mismatchDatasource.paginator = this.paginator;
      this.mismatchDatasourceLength = this.mismatchBreweries.length;
    });
  }

  changeProvinceText(){
    this.userProvince=this.userProvince.replace(/ /g,"_");
    return this.userProvince.toLowerCase().trim();
  }
}

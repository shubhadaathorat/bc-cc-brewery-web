import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import { MismatchBreweryService } from '../../services/mismatch-brewery.service';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from "@angular/material/table";
import { AlertService } from "src/app/common/services/alert.service";

@Component({
  selector: 'code-challenge-mismatch',
  templateUrl: './mismatch.component.html',
  styleUrls: ['./mismatch.component.scss']
})
export class MismatchComponent implements OnInit, OnDestroy {

  mismatchType = '';
  brewerySubcription: Subscription;
  userProvince = '';
  displayedColumns: string[] = [];
  mismatchBreweries: any;
  datesObj: any;
  searchKey: any;
  isHidden = true;
  pageSize = 5;
  totalRows: number;

  currentPage = 0;
  pageEvent: PageEvent;
  mismatchDatasourceLength = 0;
  pageSizeOptions = [5, 10, 15, 20, 25, 100];
  mismatchDatasource = new MatTableDataSource();
  uploadSubscription: Subscription;
  descriptionText = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private route: ActivatedRoute, private alert: AlertService,
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
    this.mismatchType === 'ministry' ? this.descriptionText = `A list of breweries that exist in the 
    Ministry data but are not included on my own brewery association list` : this.descriptionText = `A list of breweries that exist on my 
    own brewery association list, but not in the Ministry data.`;
    this.getMismatchBreweries();
  }

  getMismatchBreweries() {
    this.brewerySubcription = this.mismatchBrewerySvc.getMismatchBreweries(this.mismatchType, this.changeProvinceText()).subscribe({
      next: (breweries) => {
        this.mismatchBreweries = breweries;
        this.mismatchDatasourceLength = this.mismatchBreweries?.length;
        if (this.mismatchDatasourceLength > 0) {
          this.displayedColumns = Object.keys(this.mismatchBreweries[0]);
          this.mismatchDatasource = new MatTableDataSource<any>(this.mismatchBreweries);
          this.mismatchDatasource.paginator = this.paginator;
          this.mismatchDatasourceLength = this.mismatchBreweries?.length;
          this.isHidden = this.mismatchDatasourceLength > 0 ? false : true;
        } else {
          this.displayedColumns = [];
          this.mismatchDatasource = new MatTableDataSource<any>(this.mismatchBreweries);
          this.mismatchDatasource.paginator = this.paginator;
          this.mismatchDatasourceLength = this.mismatchBreweries?.length;
          this.isHidden = this.mismatchDatasourceLength > 0 ? false : true;
        }
      },
      error: (error) => {
        this.alert.error(`Error : ${error.message}`);
      },
    });
  }

  changeProvinceText() {
    this.userProvince = this.userProvince.replace(/ /g, "_");
    return this.userProvince.toLowerCase().trim();
  }

  ngOnDestroy() {
    if (this.brewerySubcription) {
      this.brewerySubcription.unsubscribe();
    }
  }
}
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { BreakpointObserver } from "@angular/cdk/layout";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Observable, Subject, Subscription } from "rxjs";
// import { DiscardChangesGuard } from "src/app/common/guard/discard-changes.guard";
import { ConfirmDialogComponent } from "src/app/common/components/confirm-dialog/confirm-dialog.component";
import { AlertService } from "src/app/common/services/alert.service";
import * as XLSX from "xlsx";
import * as yup from "yup";
import { EditDialogComponent } from "./edit-dialog/edit-dialog.component";
import { FileUploadService } from '../services/file-upload.service';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import { BreweryRequest } from 'src/app/common/models/brewery';

@Component({
  selector: 'code-challenge-upload-brewery',
  templateUrl: './upload-brewery.component.html',
  styleUrls: ['./upload-brewery.component.scss']
})
export class UploadBreweryComponent implements OnInit, AfterViewInit, OnDestroy {
  arrayBuffer: any;
  uploadedFile: File;
  displayedColumns: string[];
  dataSource: any;
  isHidden = true;
  checked;
  pageSize = 10;
  pageSizeOptions = [5, 10, 15, 20, 25, 100];
  @ViewChild("stepper") stepper: MatStepper;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filename: string;
  fileSize: string;
  breweryList: any;
  breweryListWithId: any;
  errorObjectIndex: any;
  errorBreweryObject: { row: any; field: any; erMsg: any };
  isTableValid: boolean;
  loanTableDataLength: any;
  errRows: any;
  validatedMsg = "All good! You're ready to import the data";
  inValidatedMsg: any; 
  files = [];
  validatedBreweries = [];
  excelUploadReqBody = [];
  isDisabledExcelNext = true;  
  errorDatasource = new MatTableDataSource();
  showSuccessScreen = false;
  showMixScreen = false;
  showValidationErrScreen = false;
  errData: any;
  breweryTableData: any;
  breweryListWithErrors: any; 
  isSlideToggleChecked: boolean;
  stepperOrientation = 'horizontal';
  confirmDiscardChangesDialog: MatDialogRef<unknown, any>;
  breweryTypeList = [];
  displayUploadResult = false;
  errordisplayedColumns = ["name", "type", "street","city","province","post_code","result"];
  breweryResultList = [];
  private destroyDiscardChanges = new Subject();
  discardChangesSubscription: Subscription;
  constructor(
    private alert: AlertService,
    private dialog: MatDialog,
    private router: Router,
    private observer: BreakpointObserver,
    private cdRef: ChangeDetectorRef,
    private localStorageSvc: LocalStorageService,
    private brewerySvc : FileUploadService
  ) { }

  ngOnInit(): void {
      this.localStorageSvc.getWithExpiry('BreweryTypes').map(resp => { this.breweryTypeList.push(resp.name)});
  }

  ngAfterViewInit(): void {
    this.observer.observe(["(max-width: 700px)"]).subscribe((res) => {
      if (res.matches) {
        this.stepperOrientation = 'vertical';
      } else {
        this.stepperOrientation = 'horizontal';
      }
    });
    this.cdRef.detectChanges();
  }

  fileUploadHandler(event) {
    this.uploadedFile = event.target.files[0];
    this.filename = this.uploadedFile.name;
    const fileExt = this.filename.split(".");
    if (fileExt[fileExt.length - 1] === "xlsx" || fileExt[fileExt.length - 1] === "csv") {
      this.fileSize = this.calculateFileSize(this.uploadedFile.size);
      this.parseFile(this.uploadedFile);
      this.isDisabledExcelNext = false;
    } else {
      this.alert.error("Unsupported file format. Upload only Excel or CSV file");
      this.isDisabledExcelNext = true;
    }
  }

  yupSchema() {
    let brewerySchema = yup.object().shape({
      name: yup.string().required().max(45, "Brewery name should not exceed 45 characters"),
      street: yup.string().required().max(45, "Street name should not exceed 45 characters"),
      brewery_type: yup.string().required().oneOf(this.breweryTypeList,"brewery_type not present").max(45, "Brewery type should not exceed 45 characters"),
      city: yup.string().required().max(45, "Brewery city anme should not exceed 45 characters"),
      county_province: yup.string().required().max(45, "County province should not exceed 45 characters"),
      postal_code: yup.string().required().max(45, "Postal Code should not exceed 45 characters"),
      country: yup.string().required().max(45, "Country name should not exceed 45 characters"),
    });
    return brewerySchema;
  }

  validateSchema(breweries: any[]) {
    if (this.validatedBreweries.length) this.validatedBreweries.length = 0;
    breweries.forEach((brewery,index) => {
      this.yupSchema()
        .validate(brewery, { abortEarly: false })
        .then((value) => {
          this.dataSource = new MatTableDataSource<any>(this.breweryList);
          this.dataSource.paginator = this.paginator;
          this.isTableValid = true;
          this.validatedBreweries.push(value);
        })
        .catch((err) => {
          // for downloading front end error excel
          let errorRowObject = {...this.breweryList.find((errorRow,i) => i === index)};
          errorRowObject.errors = err?.errors?.toString();
          err?.errors.forEach(errorValue => {   
            this.errorBreweryObject = {
              row: index,
              field: errorValue.split(" ")[0],
              erMsg: errorValue,
            };
            this.errorObjectIndex = this.breweryList.findIndex(
              (errorObject,index) => index == this.errorBreweryObject.row
            );
            this.breweryTableData[this.errorObjectIndex][this.errorBreweryObject.field] = {
              value: this.breweryList[this.errorObjectIndex][this.errorBreweryObject.field],
              errMsg: this.errorBreweryObject.erMsg,
            };
            this.breweryTableData[this.errorObjectIndex]["validity"] = "warning";
          });
          this.dataSource = new MatTableDataSource<any>(this.breweryTableData);
          this.dataSource.paginator = this.paginator;
          const errorValExists = this.breweryTableData.some((item) => item["validity"] == "warning");
          if (errorValExists) this.isTableValid = false;
          const errRows = this.breweryTableData.filter((row) => row["validity"] == "warning");
          this.inValidatedMsg = `${errRows.length} rows contain errors.`;
        });
    });
  }

  editCellHandler(value, name, index) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      disableClose: true,
      data: { value, name },
    });
    dialogRef.afterClosed().subscribe((res) => {
      // Receive data from edit-dialog component
      this.isSlideToggleChecked = false;
      this.breweryList[index][name] = res;
      this.breweryTableData = this.breweryList.map((u) => ({ ...u }));
      this.displayedColumns = Object.keys(this.breweryTableData[0]);
      this.displayedColumns.splice(-1, 1);
      this.displayedColumns.splice(0, 0, "validity");
      this.validateSchema(this.validateBrewerySheetData(this.breweryList));
    });
  }

  trimWhiteSpace(item) {
    let str = String(item);
    str.trim();
    if (str.trim() === "" || str == "undefined" || str == "null") {
      return "";
    } else {
      return str.trim();
    }
  }

  validateBrewerySheetData(breweryList: any[]) {
    let validBreweryList = [];
    breweryList.forEach((brewery, index) => {
      validBreweryList.push({
        name: this.trimWhiteSpace(brewery?.name),
        brewery_type: this.trimWhiteSpace(brewery?.brewery_type),
        street: this.trimWhiteSpace(brewery?.street),
        city: this.trimWhiteSpace(brewery?.city),
        county_province: this.trimWhiteSpace(brewery?.county_province),
        postal_code: this.trimWhiteSpace(brewery?.postal_code),
        country: this.trimWhiteSpace(brewery?.country)
      });
    });
    return validBreweryList;
  }

  parseFile(file: File) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (event) => {
      const bufferArray = event.target.result;
      const workBook: XLSX.WorkBook = XLSX.read(bufferArray, {
        type: "buffer",
        cellText: false,
        cellDates: true,
      });
      const workBookSheet: string = workBook.SheetNames[0]; //fetching workbook sheet
      const workBookSheetData: XLSX.WorkSheet = workBook.Sheets[workBookSheet];
      this.breweryList= XLSX.utils.sheet_to_json(workBookSheetData, {
        defval: "",
        raw: false,
        dateNF: "yyyy-mm-dd",
      });
      this.isHidden = this.breweryList.length > 0 ? false : true;
      if (this.breweryList.length && this.breweryList.length > 0) {
        this.breweryList.forEach((element) => {element.validity = "check_circle"});
        this.validateSchema(this.validateBrewerySheetData(this.breweryList));
        this.breweryTableData = this.breweryList.map((u) => ({ ...u }));
        this.breweryListWithErrors = this.breweryList.map((u) => ({ ...u }));
        this.displayedColumns = Object.keys(this.breweryTableData[0]);
        this.displayedColumns.splice(-1, 1);
        this.displayedColumns.splice(0, 0, "validity");
      } else {
        if (!this.breweryList.length) {
          this.alert.error(
            "brewery sheet has no data, Please fill all the data and then try again."
          );
        }
        this.isDisabledExcelNext = true;
      }
    };
  }

  validateImportHandler() {
    if (this.isDisabledExcelNext === false) this.stepper.next();
  }

  calculateFileSize(bytes, si = false, dp = 1) {
    /**
     * Format bytes as human-readable text.
     *
     * @param bytes Number of bytes.
     * @param si True to use metric (SI) units, aka powers of 1000. False to use
     *           binary (IEC), aka powers of 1024.
     * @param dp Number of decimal places to display.
     *
     * @return Formatted string.
     */
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + " B";
    }
    const units = si
      ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    let u = -1;
    const r = 10 ** dp;
    do {
      bytes /= thresh;
      ++u;
    } while (
      Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1
    );
    return bytes.toFixed(dp) + " " + units[u];
  }

  backButtonHnadler() {
    this.stepper.previous();
  }

  toggleHandler(event: MatSlideToggleChange) {
    if (event.checked) {
      const errRows = this.breweryTableData.filter((row) => row["validity"] == "warning");
      this.isSlideToggleChecked = true;
      this.dataSource = new MatTableDataSource<any>(errRows);
      this.dataSource.paginator = this.paginator;
    } else {
      this.dataSource = new MatTableDataSource<any>(this.breweryTableData);
      this.dataSource.paginator = this.paginator;
      this.isSlideToggleChecked = false;
    }
  }

  fileDownloadHandler() {
    this.breweryListWithErrors.forEach((el) => delete el.validity);
    const fileName = "excel_with_errors.xlsx";
    const ws1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.breweryListWithErrors
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, "breweries");
    XLSX.writeFileXLSX(wb, fileName);
  }

  isUniqueProp(arr, propName) {
    let tmpArr = [];
    for (let obj in arr) {
      if (tmpArr.indexOf(arr[obj][propName]) < 0) {
        tmpArr.push(arr[obj][propName]);
      } else {
        return false; // Duplicate value for seqno found
      }
    }
    return true; // No duplicate values found for seqno
  }

  prepareBreweryListToUpload() {
    let breweryRequestList : BreweryRequest[] = [];
    this.breweryList.forEach(element => {
      let request: BreweryRequest = ({} as any) as BreweryRequest;
      request = element;
      breweryRequestList.push(request);
    });
    return breweryRequestList;
  }

  uploadBrewery() {
    if (this.isTableValid) {
      //upload data
      this.stepper.next();
      this.brewerySvc.uploadBrewery(this.prepareBreweryListToUpload()).subscribe(breweryList => {
        this.breweryResultList = breweryList?.data?.breweryList;
        let isHaveError = this.breweryResultList.find(brewery => brewery.result === 'rejected');
        isHaveError ? this.displayUploadResult = true : this.displayUploadResult = false;
        this.errordisplayedColumns = Object.keys(this.breweryResultList[0]);        
      });
      
    } else {
      this.alert.error(
        `Error : Incorrect data, Please go through your file data again.`
      );
    }
  }
  
  ngOnDestroy(): void {
    // if (this.uploadZipSubscription) {
    //   this.uploadZipSubscription.unsubscribe();
    // }
    // if (this.uploadExcelSubscription) {
    //   this.uploadExcelSubscription.unsubscribe();
    // }
    // this.destroyDiscardChanges.next();
    // this.destroyDiscardChanges.complete();
  }
}
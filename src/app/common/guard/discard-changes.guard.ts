import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadBreweryComponent } from '../../modules/upload-brewery/components/upload-brewery.component';
import { ConfirmDialogComponent } from '../../common/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from '../services/confirm-dialog.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DiscardChangesGuard implements CanDeactivate<CanComponentDeactivate> {
    constructor(private dialog: MatDialog,private dialogSvc: ConfirmDialogService) {}
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component instanceof UploadBreweryComponent && !component.isProcessStarted) {
        return new Promise<boolean>(resolve => {
          this.dialogSvc
          .confirmDialog({
            title: "Discard Changes",
            message: "Are you sure you want to discard your changes?",
            confirmText: "Okay",
            cancelText: "Cancel",
          })
          .subscribe((yes: boolean) => {            
            resolve(yes);
          });
          });
        } else {
          return true;
    }
  }
}
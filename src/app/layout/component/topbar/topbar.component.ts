import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { routes } from "src/app/common/constants/routers/dashboard";
import { AuthService } from "src/app/common/mediation/auth.services";
import { ConfirmDialogService } from "src/app/common/services/confirm-dialog.service";
import { LocalStorageService } from "src/app/common/services/localStorage.service";
@Component({
  selector: "code-challenge-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})
export class TopbarComponent implements OnInit {
  logoutDialog: any;
  public routers: typeof routes = routes;
  userDetails;
  constructor(
    private router: Router,
    private dialogSvc: ConfirmDialogService,
    private authSvc: AuthService,
    private localStorageSvc: LocalStorageService
  ) {}

  ngOnInit() {
    this.userDetails = this.localStorageSvc.getWithExpiry('User');
  }

  handleLogout() {
    this.dialogSvc
      .confirmDialog({
        title: "Logout",
        message: "Are you sure, you want to logout?",
        confirmText: "Okay",
        cancelText: "Cancel",
      })
      .subscribe((yes: boolean) => {
        if (yes) {
          this.authSvc.userLogout();
          this.router.navigate([this.routers.LOGIN]);
        }
      });
  }
}

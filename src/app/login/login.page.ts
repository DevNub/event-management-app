import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ApicallsService } from "../services/apicalls.service";
import { Subscription } from "rxjs";
import { ScreensizeService } from '../services/screensize.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit, OnDestroy {
  usercred = {
    username: "",
    password: "",
  };
  image: String;
  login: Subscription;
  isDesktop: boolean;

  constructor(private router: Router, private api: ApicallsService, private screensizeService: ScreensizeService) {
    this.image = "../../assets/imgs/icon.png";

    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      console.log('Is desktop changed: ', isDesktop);
      this.isDesktop = isDesktop;
    });
  }

  ngOnInit() {
  }

  navigateToMain(){
    console.log("android")
    console.log(this.usercred)
    // this.router.navigate(["/tabs"])

    this.login = this.api
      .loginUser(this.usercred.username, this.usercred.password)
      .subscribe(
        (res) => {
          const { token } = res;
          console.log(token);
          localStorage.setItem("token", token);
          this.router.navigate(["/tabs"]);
        },
        (err) => console.log("HTTP Error", err),
        () => console.log("HTTP request completed.")
      );
  }

  ngOnDestroy(): void {
    this.login.unsubscribe();
  }
}

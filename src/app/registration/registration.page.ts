import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApicallsService } from "../services/apicalls.service";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit,OnDestroy {

  user = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  }

  registeration: Subscription;

  constructor(private router: Router, private api: ApicallsService,) { }

  ngOnInit() {
  }


  register(){

    this.registeration = this.api.registerUser(this.user).subscribe(
      (res) => {

        if (res.success == true){

          console.log("registered")

          this.router.navigate(["/login"]);

        }
        

        
      },
      (err) => console.log("HTTP Error", err),
      () => console.log("HTTP request completed."))

  }

  ngOnDestroy(): void {
    this.registeration.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  image: String;
  
  constructor() {
    this.image = "../../assets/imgs/icon.png";
   }

  ngOnInit() {
  }

}

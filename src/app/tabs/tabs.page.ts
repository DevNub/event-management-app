import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  admin: boolean;
  constructor(private router: Router) {

   
    var decoded = this.getDecodedToken()
    this.admin = decoded["admin"];
  }


  getDecodedToken():string{


    const token = localStorage.getItem("token");
    
    var decoded = jwt_decode(token);
    return decoded;
  }


 

  

}

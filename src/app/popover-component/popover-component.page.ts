import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import { ApicallsService } from "../services/apicalls.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-popover-component',
  templateUrl: './popover-component.page.html',
  styleUrls: ['./popover-component.page.scss'],
})
export class PopoverComponentPage implements OnInit {

  constructor(public popover:PopoverController,private api:ApicallsService,private router: Router) { }

  ngOnInit() {
  }
  ClosePopover()
  {
    this.popover.dismiss();
  }

  async Toggle(ev: any) {
    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    systemDark.addListener(this.colorTest);
    if((<any>event).detail.checked){
      document.body.setAttribute('data-theme', 'dark');
    }
    else{
      document.body.setAttribute('data-theme', 'light');
    }
  }

   colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }

  logout(){

    
    this.api.logout();
    this.router.navigate(["/login"])
    console.log("logout happened")
    this.ClosePopover()

  }

  navigateToEvent(){
    this.router.navigate(["/tabs/tab2"])
    this.ClosePopover()
  }
}

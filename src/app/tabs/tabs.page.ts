
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { Component } from '@angular/core';
import { ScreensizeService } from '../services/screensize.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponentPage } from '../popover-component/popover-component.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isDesktop: boolean;
  admin: boolean;

  constructor(private screensizeService: ScreensizeService,public popover:PopoverController,private router: Router) {

    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      console.log('Is desktop changed: ', isDesktop);
      this.isDesktop = isDesktop;
    });

    var decoded = this.getDecodedToken()
    this.admin = decoded["admin"];
  }

  

  getDecodedToken():string{


    const token = localStorage.getItem("token");
    
    var decoded = jwt_decode(token);
    return decoded;
  }


 

  
  async CreatePopover(ev: any) {
    const popover = await this.popover.create({
      component: PopoverComponentPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}

import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponentPage } from '../popover-component/popover-component.page';
import { ScreensizeService } from '../services/screensize.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  isDesktop: boolean;
  constructor(public popover:PopoverController,private screensizeService: ScreensizeService)
   {
     this.screensizeService.isDesktopView().subscribe(isDesktop => {
       console.log('Is desktop changed: ', isDesktop);
       this.isDesktop = isDesktop;
     });
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

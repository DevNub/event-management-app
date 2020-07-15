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
  constructor(private screensizeService: ScreensizeService,public popover:PopoverController) {
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

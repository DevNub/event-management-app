import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponentPage } from '../popover-component/popover-component.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public popover:PopoverController)
   {
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

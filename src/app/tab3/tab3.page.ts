import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponentPage } from '../popover-component/popover-component.page';
import { ScreensizeService } from '../services/screensize.service';
import { ApicallsService } from "../services/apicalls.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  isDesktop: boolean;
  users: Observable<any>;
  logo: String;
  constructor(private api: ApicallsService,public popover:PopoverController,private screensizeService: ScreensizeService)
  {
    this.screensizeService.isDesktopView().subscribe(isDesktop => {
      console.log('Is desktop changed: ', isDesktop);
      this.isDesktop = isDesktop;
    });
    this.logo = "../assets/imgs/icon.png";
  }

  ngOnInit(): void {

    this.users = this.api.getUsers().pipe(map(res=> res["users:"]))
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

import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponentPage } from '../popover-component/popover-component.page';
import { ApicallsService } from "../services/apicalls.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  users: Observable<any>;

  constructor(private api: ApicallsService,public popover:PopoverController){}

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

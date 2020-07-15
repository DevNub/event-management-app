import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponentPage } from '../popover-component/popover-component.page';
import { ApicallsService } from "../services/apicalls.service";
import { Observable } from 'rxjs';
import { map, filter } from "rxjs/operators";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  events: Observable<any>;
  visible: Observable<any>;
  hidden: Observable<any>;
  image: String;

  constructor(private api: ApicallsService,public popover:PopoverController) {
    this.image = "../../assets/imgs/icon.png";
  }

  ngOnInit() {

    // this.api.getEvents().pipe(map(res=> res.events),filter(t=> t == t)).subscribe(res=> console.log(`ssv ${JSON.stringify(res)}`))

   this.events =  this.api.getEvents().pipe(map(res=> {

    return res.events.map(res=> ({...res,"flyer":  this.getImg(res.flyer)}))
    }))
   this.visible = this.api.getEvents().pipe(map(data=> data.events.filter((res: { visibility: boolean; })=> res.visibility == true)))
   this.hidden =  this.api.getEvents().pipe(map(data=> data.events.filter((res:any)=> res.visibility != true)))


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

  async getImg(flyer:string){
    const res= await fetch(`http://localhost:5000/get-image/${flyer}`,{headers: {mode:"cors"}})
    const blob = await res.blob();

    return await this.convertBlobToBase64(blob) as string;
  }
  dateConvert(date: string){
    return new Date(date).toLocaleString()
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve,reject)=>{

    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = ()=>{
      resolve(reader.result);
    }
    reader.readAsDataURL(blob);
  })




}

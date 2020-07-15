import { Component, OnInit } from '@angular/core';
import { ApicallsService } from "../services/apicalls.service";
import { Observable, interval } from 'rxjs';
import { map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  events: Observable<any>;
  visible: Observable<any>;
  hidden: Observable<any>;

  constructor(private api: ApicallsService) {}
 
  ngOnInit() {

    // this.api.getEvents().pipe(map(res=> res.events),filter(t=> t == t)).subscribe(res=> console.log(`ssv ${JSON.stringify(res)}`))
   console.log("in init")
  //  this.events = interval(1000).pipe(switchMap(res=>{
  //    return this.api.getEvents().pipe(map(res=> {
     
  //     return res.events.map(res=> ({...res,"flyer":  this.getImg(res.flyer)}))
  //     }))
  //  }))

   this.events =  this.api.getEvents().pipe(map(res=> {
     
    console.log(this.getImg(res.flyer))
    return res.events.map(res=> ({...res,"flyer":  this.getImg(res.flyer)}))
    }))
   this.visible = this.api.getEvents().pipe(map(data=> data.events.filter((res: { visibility: boolean; })=> res.visibility == true)))
   this.hidden =  this.api.getEvents().pipe(map(data=> data.events.filter((res:any)=> res.visibility != true)))
   

  }

  async getImg(flyer:string){
    const res= await fetch(`${this.api.url}/get-image/${flyer}`,{headers: {mode:"cors"}})
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

  doRefresh(event:any){

    setTimeout(() => {
      
      this.events =  this.api.getEvents().pipe(map(res=> {
     
        return res.events.map(res=> ({...res,"flyer":  this.getImg(res.flyer)}))
        }))
       this.visible = this.api.getEvents().pipe(map(data=> data.events.filter((res: { visibility: boolean; })=> res.visibility == true)))
       this.hidden =  this.api.getEvents().pipe(map(data=> data.events.filter((res:any)=> res.visibility != true)))
      event.target.complete();
    }, 2000);
    // event.target.complete();

  }

  

}

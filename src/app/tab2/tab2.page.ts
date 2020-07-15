import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponentPage } from '../popover-component/popover-component.page';
import { ApicallsService } from "../services/apicalls.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  event = {
    title: "",
    category: "",
    venue: "",
    cost: 0,
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    file: ""

  }
  image: String;
  calendar: String;
  
  constructor(private api:ApicallsService,private router: Router,public popover:PopoverController) {
    this.image = "../../assets/imgs/icon.png";
    this.calendar = "../../assets/imgs/calendar.svg";
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

  




  createEvent() {
    
    console.log(this.event);
    let form = new FormData();
    form.append("title", this.event.title);
    form.append("description", this.event.description);
    form.append("cost", "" + this.event.cost);
    form.append("category", "" + this.event.category);
    form.append("start_date", this.modifyTime(this.event.startDate));
    form.append("end_date", this.modifyTime(this.event.startDate));
    form.append("flyer", this.event.file);
    form.append("venue", this.event.venue);

    this.api.submitForm(form).subscribe(
      (res) => {
        //success
        this.router.navigate(["/tabs/tab1"]);
      },
      (err) => console.log("HTTP Error", err),
      () => console.log("HTTP request completed.")
    );
  }

  modifyTime(date: any): string {
    date = new Date(date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const time = date.toTimeString().split(" ")[0];

    return `${year}-${month}-${day} ${time}`;
  }

  loadImageFromDevice(event: { target: { files: any[] } }) {
    console.log("here");
    const file = event.target.files[0];
    console.log(file);
    this.event.file = file;

  };

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {

  url: string = "http://localhost:5000"
  

  
  private getoken():string {
    const token = localStorage.getItem("token");
    return token
  }

  getEvents():Observable<any>{

    const token = this.getoken();
    return this.http.get(`${this.url}/event`,{headers:{mode:"cors","x-access-token":token}})
  }


  public loginUser(username:string,password:string): Observable<any>{
    
    return this.http.post(`${this.url}/login`,{},{
      headers:{
        Authorization: 'Basic ' + btoa(username + ":" + password),
        mode: "cors"
      }
    })
  }

  public submitForm(form: FormData):Observable<any>{

    const token = this.getoken();
    return this.http.post("http://localhost:5000/event",form,{headers:{mode:"cors","x-access-token":token}})
  }

  constructor(private http: HttpClient) { }

}

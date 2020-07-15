import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApicallsService {

  url: string = "http://localhost:5000"
  

  /**
   * gets jwt tiken from local storage
   */
  private getoken():string {
    const token = localStorage.getItem("token");
    return token
  }

  /**
   * gets all events
   */
  getEvents():Observable<any>{

    const token = this.getoken();
    return this.http.get(`${this.url}/event`,{headers:{mode:"cors","x-access-token":token}})
  }

  /**
   * logins user to the api
   * @param username 
   * @param password 
   */
  public loginUser(username:string,password:string): Observable<any>{
    
    return this.http.post(`${this.url}/login`,{},{
      headers:{
        Authorization: 'Basic ' + btoa(username + ":" + password),
        mode: "cors"
      }
    })
  }

  /**
   * create an event form
   * @param form 
   */
  public submitForm(form: FormData):Observable<any>{

    const token = this.getoken();
    return this.http.post("http://localhost:5000/event",form,{headers:{mode:"cors","x-access-token":token}})
  }

  /**
   * toggle visibily 
   *  @param id
   */
  public changeVisiblity(id:number):Observable<any> {

    const token = this.getoken();
    return this.http.get(`${this.url}/event/${id}`,{headers:{mode:"cors","x-access-token":token}}).pipe(map(res=> res["Event"]),switchMap(event=>{

      return this.http.put(`${this.url}/event/${event.id}`,{visibility:!event.visibility},{headers:{mode:"cors","x-access-token":token}})
    }))
    
  }

  /**
   * gets the event with the visbility attribute
   * getVisiblity
   * @param id
   */
  public getVisiblity(id:number):Observable<any> {

    const token = this.getoken();
    return this.http.get(`${this.url}/event/${id}`,{headers:{mode:"cors","x-access-token":token}}).pipe(map(res=>res["Event"]))
    
  }

  /**
   * deleteEvent
   *  @param id
   */
  public deleteEvent(id:number):Observable<any> {

    const token = this.getoken();
    return this.http.delete(`${this.url}/event/${id}`,{headers:{mode:"cors","x-access-token":token}})
  }

  /**
   * gets specific user event
   * @param id
   * getEvent
   */
  public getEvent(id:number):Observable<any> {
    
    const token = this.getoken();
    return this.http.get(`${this.url}/event/${id}`,{headers:{mode:"cors","x-access-token":token}})
  }

  public logout():void{
    localStorage.removeItem("token")
  }

  constructor(private http: HttpClient) { }

}

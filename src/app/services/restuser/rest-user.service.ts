import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONNECTION } from '../global';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {
  public uri: string;
  public token;
  public userId;
  public user;
  public status;

  public httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public httpOptionsAuth = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
  }
  
  private extractData(res:Response){
    let body = res;
    return body || [] || {};
  }

  public getToken(){
    let token = localStorage.getItem("token");
    if(token != null || token != undefined){
      this.token = 'Token '+token;
    }else{
      this.token = null;
    }

    return this.token;
  }
  


  constructor(private http:HttpClient) { 
    this.uri = CONNECTION.URI;
  }

  public login(user){
    let params = JSON.stringify(user);
    return this.http.post(this.uri+"login",params,this.httpOptions)
    .pipe(map(this.extractData));
  }

  public logOut(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.post(this.uri+"logOutV",{},{headers:headers})
    .pipe(map(this.extractData));
  }


  public register(user){
    let params = JSON.stringify(user);
    return this.http.post(this.uri+"saveUser",params,this.httpOptions)
    .pipe(map(this.extractData));
  }

}

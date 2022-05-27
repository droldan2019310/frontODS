import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONNECTION } from '../global';

@Injectable({
  providedIn: 'root'
})
export class RestAnswerService {

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



  public saveAnswer(answer){
    let params = JSON.stringify(answer)
    return this.http.post(this.uri+"saveAnswer",params,this.httpOptions)
    .pipe(map(this.extractData));
  }

  public getAnswerById(answer){
    let params = JSON.stringify(answer)
    return this.http.post(this.uri+"getAnswerById",params,this.httpOptions)
    .pipe(map(this.extractData));
  }
}

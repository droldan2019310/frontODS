import { BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestUserService } from './services/restuser/rest-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'ODSfront';
  mobileQuery: MediaQueryList;
  public token;
  public user;
  public isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(map((result: BreakpointState) => result.matches));

  @ViewChild('snav') sidenav: MatSidenav;
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router:Router, 
    private breakpointObserver:BreakpointObserver, private restUser:RestUserService, private toastr:ToastrService) {
      
  }
  ngOnDestroy(): void {
  }



  ngDoCheck(){
    this.getToken();
  }
  
  getToken(){
     let token = localStorage.getItem("token");
    if(token != undefined){
      this.token = token;
    }else{
      this.token = null;
    }
  }



  ngOnInit(){
  }

  logOut(){
      this.restUser.logOut().subscribe((res:any)=>{
        if(res.message){
          localStorage.clear();
          this.toastr.success("Has cerrado sesión exitosamente", "LOGOUT")
        }else{
          this.toastr.info("ALGO HA OCURRIDO", "LOGOUT")
        }
      }, error=>{
        console.log(error)
        this.toastr.error("ALGO ANDA MAL, INTENTALO MÁS TARDE", "LOGOUT")
      })
  }
}

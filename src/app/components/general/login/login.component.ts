import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { RestUserService } from 'src/app/services/restuser/rest-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user:User;
  constructor(private toastr:ToastrService, private restUser:RestUserService, private router:Router) { 
    this.user = new User('','','','','','','','')
  }

  ngOnInit(): void {
  }

  public login(){
 
    if(this.user.username && this.user.password){
      this.restUser.login(this.user).subscribe((res:any)=>{
        if(res.token){
          this.toastr.success("Has iniciado sesión exitosamente", "LOGIN ACCEPT")
          localStorage.setItem("token", res.token);
          let userjson = JSON.parse(res.user);
          userjson = userjson[0]
          localStorage.setItem("user", JSON.stringify(userjson));
          this.router.navigateByUrl("")
        }else{
          this.toastr.error(res.msg,"Algo malo Ha ocurrido...")
        }
      }, error=>{
        console.log(error)
        if(error.error){
          this.toastr.error("error",error.error.error)
        }else{
          this.toastr.error("Algo ha ocurrido, intenta de nuevo","ERROR GENERAL")
        }
      })
    }else{
      this.toastr.error("CREDENCIALES FALTANTES", "Revisa que todos los campos esten llenos...")
    }
    
  }



}

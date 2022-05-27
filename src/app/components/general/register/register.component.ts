import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { RestUserService } from 'src/app/services/restuser/rest-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user:User;
  constructor(private toastr:ToastrService, private restUser:RestUserService, private router:Router) { 
    this.user = new User('','','','','','','','')
  }
  ngOnInit(): void {
  }


  public register(){
 
    if(this.user.username && this.user.password && this.user.phone && this.user.email){
      this.restUser.register(this.user).subscribe((res:any)=>{
        if(res.user){
          this.toastr.success("HAS CREADO TU USUARIO EXITOSAMENTE", "REGISTER ACCEPT")
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
      this.toastr.error("CAMPOS  FALTANTES", "Revisa que todos los campos esten llenos...")
    }
    
  }


}

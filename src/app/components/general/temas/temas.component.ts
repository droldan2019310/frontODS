import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ToastrService } from 'ngx-toastr';
import { Tema } from 'src/app/models/Tema';
import { RestTemasService } from 'src/app/services/restTemas/rest-temas.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {
  public temas:[]
  constructor(private _bottomSheet: MatBottomSheet, private restTema:RestTemasService, private toastr:ToastrService) { 
    this.temas = []
    this.getTema();
  }

  ngOnInit(): void {
  }

  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(sheetTema);
    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      this.getTema();
    });
  }



  
  getTema(){ 
    this.restTema.getTemas().subscribe((res:any)=>{
      if(res.tema){
        this.temas = res.tema
        console.log(res.tema)
      }else{
        this.toastr.error("ALGO MALO HA OCURRIDO, INTENTALO MÁS TARDE","Algo malo Ha ocurrido...")  
      }
    }, error=>{
      this.toastr.error("ALGO MALO HA OCURRIDO, INTENTALO MÁS TARDE","Algo malo Ha ocurrido...")  
      console.log(error)
    })
  }

}




@Component({
  selector: 'new-tema',
  templateUrl: 'newTema.html',
})
export class sheetTema {
  public tema;
  constructor(private toastr:ToastrService, private _bottomSheetRef: MatBottomSheetRef<sheetTema>, private restTema:RestTemasService) {
    this.tema = new Tema('','','','','','')
  }

  
 


  saveTema(){
    let token = localStorage.getItem("token")

    if(token){
      if(this.tema.title && this.tema.shortdescription && this.tema.bigDescription && this.tema.link){
        let user = JSON.parse(localStorage.getItem("user"))

        this.tema.userid = user.id;


        this.restTema.saveTema(this.tema).subscribe((res:any)=>{
          if(res.tema){
            this._bottomSheetRef.dismiss(res.tema);
            this.toastr.success("SE HA INGRESADO EL NUEVO TEMA A EXPLICAR","TEMA GUARDADO")
          }else{
            this.toastr.error("ALGO MALO HA OCURRIDO, INTENTALO MÁS TARDE","Algo malo Ha ocurrido...")  
          }
        }, error=>{
          this.toastr.error("ALGO MALO HA OCURRIDO, INTENTALO MÁS TARDE","Algo malo Ha ocurrido...")  
          console.log(error)
        })
      }else{
        this.toastr.error("LLENA TODOS LOS CAMPOS","Algo malo Ha ocurrido...")  
      }

    }else{
      this.toastr.error("DEBES INICIAR SESIÓN PARA PODER AGREGAR UNA PREGUNTA","Algo malo Ha ocurrido...")
    }
  }

}
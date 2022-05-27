import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ToastrService } from 'ngx-toastr';
import { Beca } from 'src/app/models/Beca';
import { RestBecasService } from 'src/app/services/restBecas/rest-becas.service';

@Component({
  selector: 'app-becas',
  templateUrl: './becas.component.html',
  styleUrls: ['./becas.component.css']
})
export class BecasComponent implements OnInit {

  public becas:[];
  constructor(private _bottomSheet: MatBottomSheet, private restBeca:RestBecasService, private toastr:ToastrService) { 
    this.becas = []
    this.getBecas();
  }

  ngOnInit(): void {
  }


  
  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(sheetBeca);
    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      this.getBecas();
    });
  }


  
  getBecas(){ 
    this.restBeca.getBecas().subscribe((res:any)=>{
      if(res.beca){
        this.becas = res.beca
        console.log(res.beca)
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
  selector: 'new-beca',
  templateUrl: 'newBeca.html',
})
export class sheetBeca {
  public beca;
  constructor(private toastr:ToastrService, private _bottomSheetRef: MatBottomSheetRef<sheetBeca>, private restBeca:RestBecasService) {
    this.beca = new Beca('','','','','','','')
  }

  
 


  saveBeca(){
    let token = localStorage.getItem("token")

    if(token){
      if(this.beca.title && this.beca.shortdescription && this.beca.bigDescription && this.beca.link && this.beca.beneficios){
        let user = JSON.parse(localStorage.getItem("user"))

        this.beca.userid = user.id;


        this.restBeca.saveBecas(this.beca).subscribe((res:any)=>{
          if(res.beca){
            this._bottomSheetRef.dismiss(res.beca);
            this.toastr.success("SE HA INGRESADO LA NUEVA BECA","BECA Y AYUDA  GUARDADA")
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
      this.toastr.error("DEBES INICIAR SESIÓN PARA PODER AGREGAR LA BECA O AYUDA QUE OFRECES","Algo malo Ha ocurrido...")
    }
  }

}
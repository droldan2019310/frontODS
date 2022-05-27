import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ToastrService } from 'ngx-toastr';
import { Questions } from 'src/app/models/Questions';
import { RestQuestionService } from 'src/app/services/restQuestion/rest-question.service';
import { RestTemasService } from 'src/app/services/restTemas/rest-temas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public questions:[]
  public temas:[]
  constructor(private _bottomSheet: MatBottomSheet, private restQuestions:RestQuestionService, private toastr:ToastrService,
    private restTema:RestTemasService) { 
    this.questions = []
    this.temas = []
    this.getQuestions();
    this.getTema();
  }

  ngOnInit(): void {
  }

  slideConfig = {"slidesToShow": 3, "slidesToScroll": 3};
  
 
  
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }


  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(BottomSheetOverviewExampleSheet);
    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      this.getQuestions();
    });
  }



  getQuestions(){ 
      this.restQuestions.getQuestion().subscribe((res:any)=>{
        if(res.questions){
          this.questions = res.questions
          console.log(res.questions)
        }else{
          this.toastr.error("ALGO MALO HA OCURRIDO, INTENTALO MÁS TARDE","Algo malo Ha ocurrido...")  
        }
      }, error=>{
        this.toastr.error("ALGO MALO HA OCURRIDO, INTENTALO MÁS TARDE","Algo malo Ha ocurrido...")  
        console.log(error)
      })
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
  selector: 'add-Question',
  templateUrl: 'addQuestion.html',
})
export class BottomSheetOverviewExampleSheet {
  public question;
  constructor(private toastr:ToastrService, private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>, private restQuestion:RestQuestionService) {
    this.question = new Questions('','','',null, null)
  }

  
 


  saveQuestion(){
    let token = localStorage.getItem("token")

    if(token){
      if(this.question.principalQuestion && this.question.description && this.question.asignature){
        let user = JSON.parse(localStorage.getItem("user"))

        this.question.userid = user.id;


        this.restQuestion.saveQuestion(this.question).subscribe((res:any)=>{
          if(res.question){
            this._bottomSheetRef.dismiss(res.question);
            this.toastr.success("SE HA INGRESADO LA NUEVA PREGUNTA AL FORO","PREGUNTA GUARDADA")
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
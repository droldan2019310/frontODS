import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Answer } from 'src/app/models/answer';
import { RestAnswerService } from 'src/app/services/restAnswer/rest-answer.service';
import { RestQuestionService } from 'src/app/services/restQuestion/rest-question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public questions:[]
  public idquestion;
  public answers:[]
  constructor(private _bottomSheet: MatBottomSheet, private restQuestions:RestQuestionService, private toastr:ToastrService
    , private route:ActivatedRoute,  private restAnswer:RestAnswerService) { 
    this.questions = []
    this.answers = []
    this.idquestion =this.route.snapshot.params.id
    this.getQuestion();
    this.getAnswers();
  }

  ngOnInit(): void {
  }

  getAnswers(){ 
    let params = {
      "id": this.idquestion
    }
    this.restAnswer.getAnswerById(params).subscribe((res:any)=>{
      if(res.answer){
        this.answers = res.answer
        console.log(res.answer)
      }else{
        this.toastr.error("ALGO MALO HA OCURRIDO, INTENTALO MÁS TARDE","Algo malo Ha ocurrido...")  
      }
    }, error=>{
      this.toastr.error("ALGO MALO HA OCURRIDO, INTENTALO MÁS TARDE","Algo malo Ha ocurrido...")  
      console.log(error)
    })
  }

  

  getQuestion(){ 
    let params = {
      "id": this.idquestion
    }
    this.restQuestions.getQuestionById(params).subscribe((res:any)=>{
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


  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(sheetAnswer, {data: {id:this.idquestion}});
    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      this.getAnswers()
    });
  }


}





@Component({
  selector: 'add-answer',
  templateUrl: 'addAnswer.html',
})
export class sheetAnswer {
  public answer;
  public idquestion;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data:any, private toastr:ToastrService, private _bottomSheetRef: MatBottomSheetRef<sheetAnswer>, private restAnswer:RestAnswerService,
    private route:ActivatedRoute) {
    this.answer = new Answer('','','',null)
    this.idquestion =this.route.snapshot.params.id
  }

 


  saveAnswer(){
    let token = localStorage.getItem("token")

    if(token){
      
      if(this.answer.bigDescription){
        let user = JSON.parse(localStorage.getItem("user"))
        this.answer.userid = user.id;
        this.answer.questionid = this.data.id;
        


        this.restAnswer.saveAnswer(this.answer).subscribe((res:any)=>{
          if(res.answer){
            this._bottomSheetRef.dismiss(res.answer);
            this.toastr.success("SE HA INGRESADO LA NUEVA RESPUESTA AL FORO","RESPUESTA GUARDADA")
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
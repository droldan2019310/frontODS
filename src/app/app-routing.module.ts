import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BecasComponent } from './components/general/becas/becas.component';
import { HomeComponent } from './components/general/home/home.component';
import { LoginComponent } from './components/general/login/login.component';
import { QuestionComponent } from './components/general/question/question.component';
import { RegisterComponent } from './components/general/register/register.component';
import { TemasComponent } from './components/general/temas/temas.component';
import { DavisComponent } from './components/prueba/davis/davis.component';
import { ScheduleComponent } from './components/user/schedule/schedule.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'schedule', component:ScheduleComponent},
  {path:'becas', component:BecasComponent},
  {path:'temas', component:TemasComponent},
  {path:'question/:id', component:QuestionComponent},
 // {path:'calculator', component:CalculatorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

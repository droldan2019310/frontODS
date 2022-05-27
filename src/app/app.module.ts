import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import{MatSelectModule} from '@angular/material/select';
import { MatDividerModule } from "@angular/material/divider";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import { LoginComponent } from './components/general/login/login.component';
import { DavisComponent } from './components/prueba/davis/davis.component';
import { BottomSheetOverviewExampleSheet, HomeComponent } from './components/general/home/home.component';
import { RegisterComponent } from './components/general/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { ScheduleComponent } from './components/user/schedule/schedule.component';
import { MyAccountComponent } from './components/user/my-account/my-account.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BecasComponent, sheetBeca } from './components/general/becas/becas.component';
import { sheetTema, TemasComponent } from './components/general/temas/temas.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { QuestionComponent, sheetAnswer } from './components/general/question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DavisComponent,
    HomeComponent,
    RegisterComponent,
    ScheduleComponent,
    MyAccountComponent,
    BottomSheetOverviewExampleSheet,
    BecasComponent,
    TemasComponent,
    sheetTema,
    sheetBeca,
    QuestionComponent,
    sheetAnswer
  ],
  imports: [
    
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    MatCommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatCheckboxModule,
    MatExpansionModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatBadgeModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    SlickCarouselModule,
    YouTubePlayerModule
  ],
  exports: [ MatFormFieldModule, MatInputModule ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    //{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

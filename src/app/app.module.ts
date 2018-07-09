import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { QuestionsComponent } from './questions/questions.component';
import { OptionsComponent } from './options/options.component';

import {Option} from './options/model/options.model';

import {AssessmentService} from './assessments/service/assessments.service';
import { dataService } from './shared/data.service';
import { ValidatorService } from './validator/service/validator.service';
import { ValidatorComponent } from './validator/validator.component';
import { VaultComponent } from './vault/vault.component';


const appRoutes: Routes = [
  
  
 
]
@NgModule({
  declarations: [
    AppComponent,
    AssessmentsComponent,
    QuestionsComponent,
    OptionsComponent,
    ValidatorComponent,
    VaultComponent,
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      
    )
  ],
  providers: [AssessmentService, dataService, ValidatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

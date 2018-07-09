import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Question } from '../../questions/model/questions.model';
import { Option } from '../../options/model/options.model';
import { AssessMent } from '../../assessments/model/assessments.model';
import { Round } from '../../assessments/model/rounds.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ValidatorService {
    private _isSubmittedCorrectly = new BehaviorSubject(false);
    abc = this._isSubmittedCorrectly.asObservable();
    changeSubmission(isSubmitted : boolean){
        this._isSubmittedCorrectly.next(isSubmitted);
      }
}

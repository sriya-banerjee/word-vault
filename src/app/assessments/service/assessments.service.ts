import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Question } from '../../questions/model/questions.model';
import { Option } from '../../options/model/options.model';
import { AssessMent } from '../model/assessments.model';
import { Round } from '../model/rounds.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AssessmentService {
  question: Question = new Question();
  roundList: Round[] = new Array<Round>();
  optionListArray: Option[][] = new Array<Option[]>();
  optionList: Option[] = new Array<Option>();
  assesmentList: AssessMent[] = new Array<AssessMent>();
  assessmentListArray: AssessMent[][] = new Array<AssessMent[]>();
  private _isSubmittedCorrectly = new BehaviorSubject(false);
  isSubmittedCorrectly = this._isSubmittedCorrectly.asObservable();
  constructor(private _httpClient: HttpClient) {

  }
  public getAssesments(): Observable<any> {
    return this._httpClient.get("../../../assets/assessments/vault_rounds.json");

  }
  changeSubmission(isSubmitted : boolean){
    this._isSubmittedCorrectly.next(isSubmitted);
  }
  public ModifyAssessments(prevAssessments): Round[] {
    //Let check any round is present or not
    if (prevAssessments.rounds.length) {
      var index: number;//To Loop through rounds
      var questionIndex: number = 0;//to set id of questions

      // Atfirst Need to loop through rounds
      for (index = 0; index < prevAssessments.rounds.length; index++) {
        this.assessmentListArray[index] = new Array<AssessMent>();
        //Need to loop through assessments under one round
        var assessmentIndex: number;
        var crRoundAssessmentList = new Array<AssessMent>();
        crRoundAssessmentList = prevAssessments.rounds[index].assessments;
        for (assessmentIndex = 0; assessmentIndex < prevAssessments.rounds[index].assessments.length; assessmentIndex++) {
          //Need to collect assessments of current round.

          //Need to collect question for each assessment of current round
          var question = crRoundAssessmentList[assessmentIndex].question[0];

          this.question = { "name": question, "id": questionIndex };
          //Need to convert option into option object
          //var options = new Array<String>();
          var options = prevAssessments.rounds[index].assessments[assessmentIndex].answers;
          if (options.length) {
            var optIndex: number;
            if (this.optionList.length) {
              this.optionList.splice(0, this.optionList.length);
            }
            //Need to store the options of current question
            this.optionListArray[questionIndex] = new Array<Option>();
            for (optIndex = 0; optIndex < options.length; optIndex++) {
              //var currentOption : string = options[optIndex];
              //Need to store each option 
              //options[optIndex].id = optIndex;
              this.optionListArray[questionIndex][optIndex] = { "name": options[optIndex], "id": optIndex };
            }

          }
          this.assessmentListArray[index][assessmentIndex] = { "question": this.question, "answers": this.optionListArray[questionIndex], "correctAnswer": crRoundAssessmentList[assessmentIndex].correctAnswer, "id": index, "attemptNo": crRoundAssessmentList[assessmentIndex].attemptNo }
          questionIndex++;
        }
        this.roundList.push({ "assessments": this.assessmentListArray[index], "correctSubmission": prevAssessments.rounds[index].correctSubmission })
      }

    }
    return this.roundList;
  }
}


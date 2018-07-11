import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AssessmentService } from './service/assessments.service';
import { Question } from '../questions/model/questions.model';
import { AssessMent } from './model/assessments.model';
import { Option } from '../options/model/options.model';
import { UserResponseService } from '../shared/userResponse.service';
import { FrameRange } from '../vault/model/frameRange.model';
import { Round } from './model/rounds.model';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css']
})
export class AssessmentsComponent implements OnInit {

  question: Question = new Question();
  optionList: Option[] = new Array<Option>();
  roundList: Round[] = new Array<Round>();
  assessnentList: AssessMent[];
  currentAssessmentId: number;
  currentRoundId: number = 0;
  frameRange: FrameRange = new FrameRange();
  startFrame: number;
  endFrame: number;
  isCorrectlyChoosed : boolean;
  constructor(private _assessmentService: AssessmentService, private _userResponseService: UserResponseService, private _changedetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._assessmentService.getAssesments().subscribe(data => {
      //console.log(this._assessmentService.ModifyAssessments(data));
      this.roundList = this._assessmentService.ModifyAssessments(data);
      //this.assessnentList
      this.currentAssessmentId = 0;
      this.currentRoundId = 0;
      this.optionList = this.roundList[0].assessments[0].answers;


      this.question = this.roundList[0].assessments[0].question;
      this._userResponseService.changeCorrectOption(this.roundList[0].assessments[0].correctAnswer);


    });
  }
  goToNextAssessment($event) {
    
     {
      if($event == true){
        this._assessmentService.changeSubmission(true);
        this.roundList[this.currentRoundId].correctSubmission[this.currentAssessmentId] = true;
      }
      this._changedetector.detectChanges();
      var findAssessment = false;
      //this.currentAssessmentId = this.currentAssessmentId + 1;
      // Atfirst Need to set that correct submission value to true
      
      

      //Need to check current round has any more questions left submitted successfully

      //Let Check is it the last assignment
      if (this.roundList[this.currentRoundId].assessments.length == this.currentAssessmentId + 1) {
        //If it is the last assignment, then check form first to second last
        var index = 0;
        for (index; index < this.roundList[this.currentRoundId].assessments.length; index++) {
          //If any one from this round is left, then go to that question
          if (!this.roundList[this.currentRoundId].correctSubmission[index]) {
            this.currentAssessmentId = index;
            this.optionList = this.roundList[this.currentRoundId].assessments[this.currentAssessmentId].answers;
            this.question = this.roundList[this.currentRoundId].assessments[this.currentAssessmentId].question;
            //this.frameRange = this.assessnentList[this.currentAssessmentId].frameRange;
            this._userResponseService.changeCorrectOption(this.roundList[this.currentRoundId].assessments[this.currentAssessmentId].correctAnswer);
            this._userResponseService.changeOptionSelected(false);
            this._userResponseService.changeSelectedOption(0);
            findAssessment = true;
            break;
          } // End If
        }//End For
        //If no one is left, then go to next round, if any more round exists
        if (!findAssessment && this.roundList.length != this.currentRoundId + 1) {
          this.currentRoundId = this.currentRoundId + 1;
          this.currentAssessmentId = 0;
          this.optionList = this.roundList[this.currentRoundId].assessments[0].answers;
          this.question = this.roundList[this.currentRoundId].assessments[0].question;
          this._userResponseService.changeCorrectOption(this.roundList[this.currentRoundId].assessments[0].correctAnswer);
          this._userResponseService.changeOptionSelected(false);
          this._userResponseService.changeSelectedOption(0);
        }// End If

      }//End If
      else{
        //If the assessment is not the last, then need to check from next 
        var index = this.currentAssessmentId +1;
        for (index; index<this.roundList[this.currentRoundId].assessments.length ;index++){
          if (!this.roundList[this.currentRoundId].correctSubmission[index]) {
            this.currentAssessmentId = index;
            this.optionList = this.roundList[this.currentRoundId].assessments[this.currentAssessmentId].answers;
            this.question = this.roundList[this.currentRoundId].assessments[this.currentAssessmentId].question;
            //this.frameRange = this.assessnentList[this.currentAssessmentId].frameRange;
            this._userResponseService.changeCorrectOption(this.roundList[this.currentRoundId].assessments[this.currentAssessmentId].correctAnswer);
            this._userResponseService.changeOptionSelected(false);
            this._userResponseService.changeSelectedOption(0);
            findAssessment = true;
            break;
          } // End If
           
        }
        //Need to check from first
        if(!findAssessment){
          for (index =0; index <= this.currentAssessmentId ;index++){
            if (!this.roundList[this.currentRoundId].correctSubmission[index]) {
              this.currentAssessmentId = index;
              this.optionList = this.roundList[this.currentRoundId].assessments[this.currentAssessmentId].answers;
              this.question = this.roundList[this.currentRoundId].assessments[this.currentAssessmentId].question;
              //this.frameRange = this.assessnentList[this.currentAssessmentId].frameRange;
              this._userResponseService.changeCorrectOption(this.roundList[this.currentRoundId].assessments[this.currentAssessmentId].correctAnswer);
              this._userResponseService.changeOptionSelected(false);
              this._userResponseService.changeSelectedOption(0);
              findAssessment = true;
              break;
            } // End If
             
          }
        } 
        //If no one is left, then go to next round, if any more round exists
        if (!findAssessment && this.roundList.length != this.currentRoundId + 1) {
          this.currentRoundId = this.currentRoundId + 1;
          this.currentAssessmentId = 0;
          this.optionList = this.roundList[this.currentRoundId].assessments[0].answers;
          this.question = this.roundList[this.currentRoundId].assessments[0].question;
          this._userResponseService.changeCorrectOption(this.roundList[this.currentRoundId].assessments[0].correctAnswer);
          this._userResponseService.changeOptionSelected(false);
          this._userResponseService.changeSelectedOption(0);
        }// End If
        this._userResponseService.changeSubmissionSecondTime(false);
        this._changedetector.detectChanges();
      }

    }
  }
}

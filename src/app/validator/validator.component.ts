import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserResponseService } from '../shared/userResponse.service';
import { BlockingProxy } from 'blocking-proxy';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css']
})
export class ValidatorComponent implements OnInit {

  optionSelected: boolean;
  private _attemptNo : number = 1;
  private _correctOption: number;
  private _selectedOption: number;
  
  @Output() onCurrectSubmission = new EventEmitter<boolean>();
  constructor(private _userResponseService: UserResponseService) {
    this.optionSelected = false;

  }

  ngOnInit() {
    
    this._userResponseService.isAnyOptionSelected.subscribe(message => this.optionSelected = message);

    this._userResponseService.currentCorrectOption.subscribe(message => this._correctOption = message);
    this._userResponseService.currentSelectedOption.subscribe(message => this._selectedOption = message);
  }
  validateSubmittedAnswer() {
    console.log("In validate"+ "correct : "+this._correctOption + "selected : "+this._selectedOption);
    if (this._correctOption == this._selectedOption) {
      //this.onCurrectSubmission.emit(false); 
      //this._dataService.changeSubmission(true);
      this.onCurrectSubmission.emit(true);
    }
    else {
      if(this._attemptNo == 1){
        this._userResponseService.changeSelectedOption(0);
        this._userResponseService.changeOptionSelected(true);
        this.optionSelected = false
        this._attemptNo ++;
      }
      else{
        this._attemptNo = 1;
        this._userResponseService.changeSubmissionSecondTime(true);
        this.onCurrectSubmission.emit(false);
        //this._dataService.changeSubmission(false);
        
      }
    }
  }
  resetSelectedOption(){
    this._userResponseService.changeSelectedOption(0);
    this._userResponseService.changeOptionSelected(true);
    this.optionSelected = false;

  }

}

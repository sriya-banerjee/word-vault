import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { dataService } from '../shared/data.service';
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
  constructor(private _dataService: dataService) {
    this.optionSelected = false;

  }

  ngOnInit() {
    
    this._dataService.isAnyOptionSelected.subscribe(message => this.optionSelected = message);

    this._dataService.currentCorrectOption.subscribe(message => this._correctOption = message);
    this._dataService.currentSelectedOption.subscribe(message => this._selectedOption = message);
  }
  validateSubmittedAnswer() {
    console.log("In validate"+ "correct : "+this._correctOption + "selected : "+this._selectedOption);
    if (this._correctOption == this._selectedOption) {
      this._dataService.changeSubmission(true);
      //this.onCurrectSubmission.emit(true);
    }
    else {
      if(this._attemptNo == 1){
        this._dataService.changeSelectedOption(0);
        this._dataService.changeOptionSelected(true);
        this.optionSelected = false
        this._attemptNo ++;
      }
      else{
        this._attemptNo = 1;
        this._dataService.changeSubmissionSecondTime(true);
        this._dataService.changeSubmission(false);
        this._dataService.changeSubmissionSecondTime(false);
      }
    }
  }
  resetSelectedOption(){
    this._dataService.changeSelectedOption(0);
    this._dataService.changeOptionSelected(true);
    this.optionSelected = false;

  }

}

import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef} from '@angular/core';
import {Option} from './model/options.model';
import { UserResponseService } from '../shared/userResponse.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input() public options = Option;
  @Output() onOptionSelect: EventEmitter<number> = new EventEmitter<number>();
  primarySelectedOption : number;
  isSubmittedIncorrectly :boolean;
  correctOption : number;
  selectedOption :number;
  private _currentSelectedOption : number;
  constructor(private _userResponseService : UserResponseService, private _changedetector: ChangeDetectorRef) { }

  ngOnInit() {
    this._userResponseService.currentSelectedOption.subscribe(message => this._currentSelectedOption = message);
    this._userResponseService.isWrongSecondTime.subscribe((message) => {
      console.log("In options");
      console.log(message);
      this.isSubmittedIncorrectly = message;
    });
    this._userResponseService.currentCorrectOption.subscribe(message => this.correctOption = message);
    this._userResponseService.isAnyOptionSelected.subscribe((message) => 
    {
      
      if(message == false)
      {
        this.primarySelectedOption = -1;
        
      }
      else{
        this.primarySelectedOption = this._currentSelectedOption-1;
      }
    }
    );
    
  }
 
  /*
  * Need to Inform Parent Component i.e Assessment Component that one option is selected
  * 
  * */
 onOptionSelected(selectedOption){
   this.selectedOption = selectedOption;
  this._userResponseService.changeSelectedOption(selectedOption);
  this._userResponseService.changeOptionSelected(true);
 }
 getCorrectOption(){
  return this.correctOption;
 }
getSelectedOption(){
 return this.selectedOption;
}
getSubmittedCorrectly(){
  return this.isSubmittedIncorrectly;
}
}

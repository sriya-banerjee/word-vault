import { Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {Option} from './model/options.model';
import {dataService} from '../shared/data.service';

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
  constructor(private _dataService : dataService) { }

  ngOnInit() {
    this._dataService.currentSelectedOption.subscribe(message => this._currentSelectedOption = message);
    this._dataService.isWrongSecondTime.subscribe(message => this.isSubmittedIncorrectly = message);
    this._dataService.currentCorrectOption.subscribe(message => this.correctOption = message);
    this._dataService.isAnyOptionSelected.subscribe((message) => 
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
  this._dataService.changeSelectedOption(selectedOption);
  this._dataService.changeOptionSelected(true);
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

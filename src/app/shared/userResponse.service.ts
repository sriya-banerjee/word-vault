import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResponseService {
  private _correctOption = new BehaviorSubject(0);
  private _isAnyOptionSelected = new BehaviorSubject(false);
  private _selectedOption = new BehaviorSubject(0);
 // private _isSubmittedCorrectly = new BehaviorSubject(false);
  private _isWrongSecondTime = new BehaviorSubject(false);
  //private _currentSelectedOption = new BehaviorSubject(0);
  currentCorrectOption = this._correctOption.asObservable();
  //currentSelectedOption = this._currentSelectedOption.asObservable();
  isAnyOptionSelected = this._isAnyOptionSelected.asObservable();
  currentSelectedOption = this._selectedOption.asObservable();
  //isSubmittedCorrectly = this._isSubmittedCorrectly.asObservable();
  isWrongSecondTime = this._isWrongSecondTime.asObservable();
  constructor() {

    
   }
 changeOptionSelected(isSelected:boolean){
   this._isAnyOptionSelected.next(isSelected);
 }

  changeCorrectOption(option: number) {
    this._correctOption.next(option)
  }
  changeSelectedOption(option: number){
    this._selectedOption.next(option);
  }
  // changeSubmission(isSubmitted : boolean){
  //   this._isSubmittedCorrectly.next(isSubmitted);
  // }
  changeSubmissionSecondTime(isWrongSecondTime : boolean){
    this._isWrongSecondTime.next(isWrongSecondTime);
  }
}

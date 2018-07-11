import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, Input, Output, EventEmitter} from '@angular/core';
import { VaultService } from './service/vault.service';
import { Vault } from './model/vault.model';
import { Time } from '@angular/common';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { UserResponseService } from '../shared/userResponse.service';
import { FrameRange } from './model/frameRange.model';
import { AssessmentService } from '../assessments/service/assessments.service';
let self = null;
@Component({
  selector: 'app-vault',
  templateUrl: './vault.component.html',
  styleUrls: ['./vault.component.css']
})
export class VaultComponent implements OnInit{
  
  vaultList: Vault[] = new Array<Vault>();
  vault: Vault = new Vault();
  xPos: string;
  yPos: string;
  index: number;
  id :any;
  frameRanges : FrameRange[] = new Array<FrameRange>();
  private _startFrame : number;
  private _endFrame : number;
  private _questionSubmitted : number = 0;
  @Input() isCorrectlyChoosed : boolean = false;
  //@Output() onCurrectSubmission = new EventEmitter<boolean>();
  constructor(private _vaultService: VaultService, private _changedetector: ChangeDetectorRef, private _userResponseService : UserResponseService, private _assessmentService : AssessmentService) { 
    
  }

  ngOnInit() {
    self = this;
    this._vaultService.getFrameRanges().subscribe((data) =>{
      this.frameRanges = data.frameRange;
      console.log(data);
    })    
    this._vaultService.getSpriteSettings().subscribe((data) => {
      this.vaultList = data.vaults;
      console.log(this.vaultList);
      this.xPos = -(this.vaultList[0].topX) + "px";
      this.yPos = -(this.vaultList[0].topY) + "px";
      this._changedetector.detectChanges();
    })
    this._assessmentService.isSubmittedCorrectly.subscribe((data) =>{
      if(data == true){
        
        console.log(this.frameRanges);
        this.index = this.frameRanges[this._questionSubmitted].start;
        this._endFrame = this.frameRanges[this._questionSubmitted].end;
        this._questionSubmitted ++;
        // this.id = setInterval(() => {
        //   this.doAnimate(); 
        //     }, 50);
        window.requestAnimationFrame(this.doAnimate);
        //this.onCurrectSubmission.emit(true);
      }
      else{
        //this.onCurrectSubmission.emit(false); 
      }
    })
  }

  doAnimate(){
    self.xPos = -(self.vaultList[self.index].topX) + "px";
    self.yPos = -(self.vaultList[self.index].topY) + "px";
    self._changedetector.detectChanges();
    self.index++;
    console.log(self.index);
    if(self.index != self._endFrame){
      window.requestAnimationFrame(self.doAnimate);
      //this.onCurrectSubmission.emit(true);
    }

  }
  
}

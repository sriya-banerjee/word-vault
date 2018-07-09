import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, Input, Output, EventEmitter} from '@angular/core';
import { VaultService } from './service/vault.service';
import { Vault } from './model/vault.model';
import { Time } from '@angular/common';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { dataService } from '../shared/data.service';
import { FrameRange } from './model/frameRange.model';

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
  @Output() onCurrectSubmission = new EventEmitter<boolean>();
  constructor(private _vaultService: VaultService, private _changedetector: ChangeDetectorRef, private _dataService : dataService) { }

  ngOnInit() {
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
    this._dataService.isSubmittedCorrectly.subscribe((data) =>{
      if(data == true){
        
        console.log(this.frameRanges);
        this.index = this.frameRanges[this._questionSubmitted].start;
        this._endFrame = this.frameRanges[this._questionSubmitted].end;
        this._questionSubmitted ++;
        this.id = setInterval(() => {
          this.doAnimate(); 
            }, 50);
        
        //this.onCurrectSubmission.emit(true);
      }
      else{
        this.onCurrectSubmission.emit(false); 
      }
    })
  }

  doAnimate(){
    this.xPos = -(this.vaultList[this.index].topX) + "px";
    this.yPos = -(this.vaultList[this.index].topY) + "px";
    this._changedetector.detectChanges();
    this.index++;
    console.log(this.index);
    if(this.index == this._endFrame){
      clearInterval(this.id);
      this.onCurrectSubmission.emit(true);
    }

  }
  
}

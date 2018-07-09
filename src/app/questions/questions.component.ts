import { Component, OnInit, Input } from '@angular/core';
import {Question} from './model/questions.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  @Input() public question : Question;

  constructor() { }

  ngOnInit() {
  }

}

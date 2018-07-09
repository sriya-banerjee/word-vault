import {Option} from '../../options/model/options.model';
import {Question} from '../../questions/model/questions.model';


export interface AssessMentInterface
{
    
    question : Question;
    answers : Option[];
    correctAnswer : number;
    id : number;
    attemptNo : number;
}
export class AssessMent implements AssessMentInterface{
    question : Question;
    answers : Option[];
    correctAnswer : number;
    id : number;
    attemptNo : number;
    
    constructor(question?,answers?,correctAnswer?,id?, attemptNo?){
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.id = id;
        this.attemptNo = attemptNo;
    }

}
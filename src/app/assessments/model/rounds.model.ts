import {AssessMent} from './assessMents.model';
import {Question} from '../../questions/model/questions.model';


export interface RoundInterface
{
    assessments : AssessMent[];
    correctSubmission :Boolean[];
}
export class Round implements RoundInterface{
    assessments : AssessMent[];
    correctSubmission :Boolean[];
    constructor(assessMents?,correctSubmission?){
        this.assessments = assessMents;
        this.correctSubmission = correctSubmission;
    }

}
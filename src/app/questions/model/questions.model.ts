/**
 * Model for a question
 */

export interface QuestionInterface
{
    
   name : string;
   id : number;
   
}
export class Question implements QuestionInterface
{
    name : string;
    id : number;
    constructor(name?, id?){
        this.name = name;
        this.id = id;
    }
}
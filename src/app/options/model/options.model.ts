export interface OptionInterface
{
    
    name : string;
   id : number;
}

export class Option implements OptionInterface{
    name : string;
   id : number;
   constructor(name?, id?){
    this.id = id;
    this.name = name;
   }
}
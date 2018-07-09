export interface VaultInterface
{
    
    
    name : Text;
    topX : number;
    topY : number;
    width : number;
    height : number;
}
export class Vault implements VaultInterface{
    
    name : Text;
    topX : number;
    topY : number;
    width : number;
    height : number;
    constructor(name?,topX?,topY?,width?,height?){
        
        this.name = name;
        this.topX = topX;
        this.topY = topY;
        this.width = width;
        this.height = height;
    }

}
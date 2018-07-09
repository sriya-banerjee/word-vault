export interface FrameRangeInterface
{
 start : number;
    end : number;
}
export class FrameRange implements FrameRangeInterface{
    start : number;
    end : number;
    constructor(start?,end?,){
        this.start = start;
        this.end = end;
     }

}
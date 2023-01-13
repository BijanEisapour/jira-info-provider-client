import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'priorityColor',
})
export class PriorityColorPipe implements PipeTransform {
    public transform(value: number | undefined): string {
        switch (value) {
            case 1:
                return 'hsl(0,100%,53%,70%)';
            case 2:
                return 'hsl(0,100%,53%,70%)';
            case 3:
                return 'hsl(15,100%,53%,70%)';
            case 4:
                return 'hsl(31,100%,54%,70%)';
            case 5:
                return 'hsl(40,95%,59%,70%)';
            case 6:
                return 'hsl(63,55%,45%,70%)';
            case 7:
                return 'hsl(103,40%,50%,70%)';
            default:
                return '#';
        }
    }
}

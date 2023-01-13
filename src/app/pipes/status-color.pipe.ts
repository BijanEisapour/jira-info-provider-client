import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'statusColor',
})
export class StatusColorPipe implements PipeTransform {
    public transform(value: string | undefined): string {
        switch (value) {
            case 'Confirmed':
                return 'blue';
            case 'New':
                return 'green';
            default:
                return 'orange';
        }
    }
}

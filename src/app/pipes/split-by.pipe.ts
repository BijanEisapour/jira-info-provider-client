import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'splitBy',
})
export class SplitByPipe implements PipeTransform {
    public transform(value: string | undefined, splitChar: string): string[] {
        if (value == undefined) return [''];
        return value.split(splitChar).map((x) => x.trim());
    }
}

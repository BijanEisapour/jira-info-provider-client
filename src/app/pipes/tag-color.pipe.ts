import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'tagColor',
})
export class TagColorPipe implements PipeTransform {
    private colors = [
        'blue',
        'magenta',
        'cyan',
        'red',
        'volcano',
        'orange',
        'gold',
        'lime',
        'green',
        'geekblue',
        'purple',
    ];
    public transform(value: string | undefined, tagList: string[] | undefined): string {
        if (value == null || tagList == null) return 'blue';
        const index = tagList.indexOf(value);
        return this.colors[index] ?? 'blue';
    }
}

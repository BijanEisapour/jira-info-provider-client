import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'secondsToDHMS',
})
export class SecondsToDayHourMinuteSecondPipe implements PipeTransform {
    public transform(value: number | undefined): string {
        return this.toDaysMinutesSeconds(value);
    }

    private toDaysMinutesSeconds(totalSeconds: number | undefined): string {
        if (totalSeconds == null) return '';

        totalSeconds = totalSeconds > 0 ? totalSeconds : totalSeconds * -1;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const days = Math.floor(totalSeconds / (3600 * 24));

        const secondsStr = this.makeHumanReadable(seconds, 'second');
        const minutesStr = this.makeHumanReadable(minutes, 'minute');
        const hoursStr = this.makeHumanReadable(hours, 'hour');
        const daysStr = this.makeHumanReadable(days, 'day');

        return `${daysStr}${hoursStr}${minutesStr}${secondsStr}`.replace(/,\s*$/, '');
    }

    private makeHumanReadable(num: number, singular: string): string {
        return num > 0 ? num + (num === 1 ? `${singular}, ` : `${singular}s, `) : '';
    }
}

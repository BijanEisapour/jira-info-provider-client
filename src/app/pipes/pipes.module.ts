import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {ComponentNameToTitleCasePipe} from './component-name-to-title-case.pipe';
import {PascalCaseToTitleCasePipe} from './pascal-case-to-title-case.pipe';
import {WordsToTitleCasePipe} from './words-to-title-case.pipe';
import {SplitByPipe} from './split-by.pipe';
import {SecondsToDayHourMinuteSecondPipe} from './seconds-to-day-hour-minute-second.pipe';
import {TagColorPipe} from './tag-color.pipe';

@NgModule({
    declarations: [
        ComponentNameToTitleCasePipe,
        PascalCaseToTitleCasePipe,
        WordsToTitleCasePipe,
        SplitByPipe,
        SecondsToDayHourMinuteSecondPipe,
        TagColorPipe,
    ],
    imports: [CommonModule],
    exports: [
        ComponentNameToTitleCasePipe,
        PascalCaseToTitleCasePipe,
        WordsToTitleCasePipe,
        SplitByPipe,
        SecondsToDayHourMinuteSecondPipe,
        TagColorPipe,
    ],
})
export class PipesModule {}

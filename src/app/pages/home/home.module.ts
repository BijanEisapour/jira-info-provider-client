import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home.component';
import {TableComponent} from '../../components/table/table.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzInputModule} from 'ng-zorro-antd/input';
import {ChartComponent} from '../../components/chart/chart.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
    declarations: [HomeComponent, TableComponent, ChartComponent],
    imports: [CommonModule, NzTableModule, NzInputModule, NgxEchartsModule, NzTagModule, PipesModule],
})
export class HomeModule {}

import {Component} from '@angular/core';
import {EChartsOption} from 'echarts';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
    public chartOption: EChartsOption = {
        xAxis: {
            type: 'category',
            data: ['پارسا اروانه', 'بیژن عیسی‌پور', 'میلاد نفر'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [820, 932, 901],
                type: 'bar',
            },
        ],
    };
}

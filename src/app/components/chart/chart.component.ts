import {AfterViewInit, Component, Input} from '@angular/core';
import {EChartsOption} from 'echarts';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements AfterViewInit {
    @Input() public xAxisData: string[] = [];
    @Input() public data: number[] = [];

    public chartOption: EChartsOption = {};

    public ngAfterViewInit(): void {
        this.chartOption = {
            yAxis: {
                type: 'category',
            },
            xAxis: {
                type: 'value',
            },
            series: [
                {
                    data: [
                        {
                            // name of date item
                            name: 'data1',
                            // value of date item is 8
                            value: 10,
                        },
                        {
                            name: 'data2',
                            value: 20,
                        },
                    ],
                    type: 'pie',
                },
            ],
        };
    }
}

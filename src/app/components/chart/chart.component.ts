import {AfterViewInit, Component, Input} from '@angular/core';
import {ECharts, EChartsOption} from 'echarts';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements AfterViewInit {
    @Input() public type: 'bar' | 'pie' = 'bar';
    @Input() public data: any;
    @Input() public drilldownData: any = [];
    @Input() public chartTitle: string = '';
    @Input() public subtitle: string = '';

    public chartOption: EChartsOption = {};

    private chart!: ECharts;

    public ngAfterViewInit(): void {
        const data = this.generateData();

        this.chartOption = this.generateChartOption(data);

        this.someStuff();
    }

    private generateData(): any {
        let data: Array<any> = [];
        switch (this.type) {
            case 'bar':
                Object.keys(this.data).forEach((key) => {
                    data.push({value: this.data[key], groupId: key});
                });

                return data;
            case 'pie':
                Object.keys(this.data).forEach((key) => {
                    data.push({name: key, value: this.data[key]});
                });
                //@ts-ignore
                data.sort((firstItem, secondItem) => firstItem.value - secondItem.value);
                return data;
        }
    }

    private generateChartOption(data: any): EChartsOption {
        let options: EChartsOption = {
            title: {
                text: this.chartTitle,
                subtext: this.subtitle,
                left: 'center',
            },
        };
        switch (this.type) {
            case 'bar':
                options = {
                    ...options,
                    dataGroupId: '',
                    animationDurationUpdate: 500,
                    tooltip: {
                        trigger: 'item',
                        formatter: (params): string => {
                            // @ts-ignore
                            const tar = params.data;
                            return ` <strong>${tar.groupId}</strong><br/> تعداد باگ : ${tar.value}`;
                        },
                    },
                    xAxis: {
                        data: data.map((x: any) => x.groupId),
                        nameTextStyle: {
                            color: 'red',
                        },
                    },
                    yAxis: {
                        nameTextStyle: {
                            color: 'red',
                        },
                    },
                    series: {
                        type: 'bar',
                        id: 'bug',
                        data,
                        universalTransition: {
                            enabled: true,
                            divideShape: 'clone',
                        },
                        showBackground: true,
                        backgroundStyle: {
                            color: 'hsla(0,0%,71%,0.2)',
                        },
                    },
                };
                break;
            case 'pie':
                options = {
                    ...options,
                    tooltip: {
                        trigger: 'item',
                        formatter: (params): string => {
                            // @ts-ignore
                            const tar = params.data;
                            return ` <strong>${tar.name}</strong><br/> تعداد باگ : ${tar.value}`;
                        },
                    },
                    series: [
                        {
                            data,
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 2,
                            },
                            label: {
                                show: true,
                                position: 'outside',
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                },
                            },
                            labelLine: {
                                show: false,
                            },
                        },
                    ],
                };
                break;
        }
        return options;
    }

    private someStuff(): void {}

    public chartInitHandler(chart: ECharts): void {
        this.chart = chart;
    }

    public chartClickHandler(params: any): void {
        if (params.data) {
            let subData = this.drilldownData.find((data: any) => {
                return data.dataGroupId === params.data.groupId;
            });
            if (!subData) {
                return;
            }
            this.chart.setOption<EChartsOption>({
                ...this.chartOption,
                title: {
                    text: params.data.groupId,
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: (params): string => {
                        const tar: any = params;
                        return ` <strong>${tar.name}</strong><br/> تعداد باگ : ${tar.value}`;
                    },
                },
                xAxis: {
                    data: subData.data.map((item: any) => {
                        return item[0];
                    }),
                },
                series: {
                    type: 'bar',
                    id: 'bug',
                    dataGroupId: subData.dataGroupId,
                    data: subData.data.map((item: any) => {
                        return item[1];
                    }),
                    universalTransition: {
                        enabled: true,
                        divideShape: 'clone',
                    },
                },
                graphic: [
                    {
                        type: 'text',
                        left: 50,
                        top: 20,
                        style: {
                            text: 'Back',
                            fontSize: 18,
                        },
                        onclick: (): void => {
                            this.chart.setOption<EChartsOption>(this.chartOption);
                        },
                    },
                ],
            });
        }
    }
}

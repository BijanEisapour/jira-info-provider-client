import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';

import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from 'ng-zorro-antd/table';
import {DataService} from '../../services/data.service';
import {Bug} from '../../models/bug';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {DataType} from '../../models/data-type';

interface ColumnItem {
    name: string;
    field: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<Bug> | null;
    listOfFilter: NzTableFilterList;
    filterFn: NzTableFilterFn<Bug> | null;
    filterMultiple: boolean;
    sortDirections: NzTableSortOrder[];
    priority: number | boolean;
    width: string;
}

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
    public listOfColumns: ColumnItem[] = [];
    public listOfData: Bug[] = [];
    public copyListOfData: Bug[] = [];

    public assigneesList: string[] | undefined = [];
    public slaColorMap = new Map<string, string>();

    private currentFilter: string | null = null;

    public constructor(public dataService: DataService, private chRef: ChangeDetectorRef) {}

    public ngAfterViewInit(): void {
        this.listOfData = this.dataService.data;
        this.copyListOfData = [...this.listOfData];

        this.generateTableColumns();

        this.generateAssigneesList();
        this.generateSlaColorMap();

        this.chRef.detectChanges();
    }

    public filterBy(name: string | undefined, filterBy: string): void {
        if (name == null) return;

        let performFilter = true;
        if (this.currentFilter === name) {
            performFilter = false;
            this.currentFilter = null;
        } else this.currentFilter = name;

        if (performFilter) this.search(name, filterBy);
        else this.resetFilter();
    }

    public search(search: string, filterKey?: string): void {
        const targetValue: any[] = [];
        this.copyListOfData.forEach((value: any) => {
            if (!!filterKey) {
                if (value[filterKey]?.toString().includes(search)) targetValue.push(value);
                return;
            }
            let keys = Object.keys(value);
            for (let i = 0; i < keys.length; i++) {
                if (value[keys[i]] && value[keys[i]].toString().toLocaleLowerCase().includes(search)) {
                    targetValue.push(value);
                    break;
                }
            }
        });
        this.listOfData = targetValue;
    }

    private generateTableColumns(): void {
        this.listOfColumns = [
            this.generateColumn('link', {name: 'لینک'}),
            this.generateColumn('assignee', {name: 'گماشته', priority: 2}),
            this.generateColumn('component', {name: 'کامپوننت'}),
            this.generateColumn('creationDate', {name: 'تاریخ ساخت'}, DataType.DATE),
            this.generateColumn('labels', {name: 'گروه‌', priority: 1}),
            this.generateColumn('priority', {name: 'اولویت', priority: 4, width: '120px'}),
            this.generateColumn('status', {name: 'وضعیت'}),
            this.generateColumn('summary', {name: 'عنوان', width: '360px'}),
            this.generateColumn('version', {name: 'ورژن', priority: 3, width: '120px'}),
            this.generateColumn('sla', {name: 'زمان باقیمانده', width: '300px'}, DataType.NUMBER),
            this.generateColumn('starCis'),
        ];
    }

    private generateColumn(key: keyof Bug, overrideOptions: any = {}, dataType: DataType = DataType.TEXT): ColumnItem {
        const listOfColumnUniqueValues = [...new Set(this.listOfData.map((x) => x[key as keyof Bug]))];
        const listOfFilter = new Array<{
            text: string;
            value: NzSafeAny;
        }>();

        listOfColumnUniqueValues.forEach((x) => {
            if (x == null || x === '') return;

            listOfFilter.push({
                text: x.toString(),
                value: x,
            });
        });

        return {
            name: key,
            sortOrder: null,
            sortFn: (a: Bug, b: Bug): any => {
                switch (dataType) {
                    case DataType.TEXT:
                        return a[key]!.toString().localeCompare(b[key]!.toString());
                    case DataType.NUMBER:
                        return (a[key] as number) - (b[key] as number);
                    case DataType.DATE: {
                        const firstDate = new Date(b[key]!);
                        const secondDate = new Date(a[key]!);
                        return firstDate.getDate() - secondDate.getDate();
                    }
                }
            },
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: true,
            listOfFilter: listOfFilter,
            filterFn: (list: string[], item: Bug): any => {
                return list.some((value) => item[key as keyof Bug]?.toString().indexOf(value) !== -1);
            },
            priority: false,
            width: '200px',
            ...overrideOptions,
            field: key,
        };
    }

    private resetFilter(): void {
        this.listOfData = [...this.copyListOfData];
    }

    public openLink(data: Bug): void {
        window.open(data.link, '_blank');
    }

    private generateAssigneesList(): void {
        this.assigneesList = this.listOfColumns
            .find((x) => x.field === 'assignee')
            ?.listOfFilter.map((y): string => y.value);
    }

    private generateSlaColorMap(): void {
        this.slaColorMap.set('قرمز', 'red');
        this.slaColorMap.set('آبی', 'blue');
        this.slaColorMap.set('زرد', 'gold');
        this.slaColorMap.set('سبز', 'green');
        this.slaColorMap.set('default', 'blue');
    }
}

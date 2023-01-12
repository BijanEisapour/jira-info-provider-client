import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';

import {NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder} from 'ng-zorro-antd/table';
import {DataService} from '../../services/data.service';
import {Bug} from '../../models/bug';
import {NzSafeAny} from 'ng-zorro-antd/core/types';

interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<Bug> | null;
    listOfFilter: NzTableFilterList;
    filterFn: NzTableFilterFn<Bug> | null;
    filterMultiple: boolean;
    sortDirections: NzTableSortOrder[];
    priority: number | boolean;
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

    private currentFilter: string | null = null;

    public constructor(private dataService: DataService, private chRef: ChangeDetectorRef) {}

    public ngAfterViewInit(): void {
        this.listOfData = this.dataService.demoData;
        this.copyListOfData = [...this.listOfData];

        this.generateTableColumns();

        this.chRef.detectChanges();
    }

    public filterByLabel(label: string): void {
        let performFilter = true;
        if (this.currentFilter === label) {
            performFilter = false;
            this.currentFilter = null;
        } else this.currentFilter = label;

        if (performFilter) this.search(label, 'labels');
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

    public toDaysMinutesSeconds(totalSeconds: number | undefined): string {
        if (totalSeconds == null) return '';

        totalSeconds = totalSeconds > 0 ? totalSeconds : totalSeconds * -1;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const days = Math.floor(totalSeconds / (3600 * 24));

        const secondsStr = TableComponent.makeHumanReadable(seconds, 'second');
        const minutesStr = TableComponent.makeHumanReadable(minutes, 'minute');
        const hoursStr = TableComponent.makeHumanReadable(hours, 'hour');
        const daysStr = TableComponent.makeHumanReadable(days, 'day');

        return `${daysStr}${hoursStr}${minutesStr}${secondsStr}`.replace(/,\s*$/, '');
    }

    private generateColumn(key: string, overrideOptions: any = {}): ColumnItem {
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
                // @ts-ignore
                return a[key].toString().localeCompare(b[key]);
            },
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: true,
            listOfFilter: listOfFilter,
            filterFn: (list: string[], item: Bug): any => {
                return list.some((value) => item[key as keyof Bug]?.toString().indexOf(value) !== -1);
            },
            priority: false,
            ...overrideOptions,
        };
    }

    private generateTableColumns(): void {
        this.listOfColumns = [
            this.generateColumn('labels', {sortOrder: 'descend', name: 'گروه‌', priority: 1}),
            this.generateColumn('assignee', {name: 'گماشته', priority: 2}),
            this.generateColumn('link', {name: 'لینک'}),
            this.generateColumn('summary', {name: 'عنوان'}),
            this.generateColumn('version', {name: 'ورژن', priority: 3}),
            this.generateColumn('priority', {name: 'اولویت', priority: 4}),
            this.generateColumn('key'),
            this.generateColumn('component'),
            this.generateColumn('status'),
            this.generateColumn('starCis'),
            this.generateColumn('slaColor'),
            this.generateColumn('sla'),
            this.generateColumn('creationDate'),
            this.generateColumn('resolutionDate'),
        ];
    }

    private static makeHumanReadable(num: number, singular: string): string {
        return num > 0 ? num + (num === 1 ? `${singular}, ` : `${singular}s, `) : '';
    }

    private resetFilter(): void {
        this.listOfData = [...this.copyListOfData];
    }
}

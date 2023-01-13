import {Injectable} from '@angular/core';
import {Bug} from '../models/bug';
import {demoData} from './demo-data';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    public readonly NO_ASSIGNEE = 'ناگماشته';
    public readonly NO_LABEL = 'بدون گروه';

    private _data: Bug[] = demoData;

    public get data(): Bug[] {
        this.cleanData();

        return this._data;
    }

    public getCountBy(prop: keyof Bug): any {
        const resultData: {[klass: string]: number} = {};

        const labels: string[] = [...new Set(this.data.map((x) => x[prop as keyof Bug]?.toString() ?? ''))];

        labels.forEach((x: string) => {
            resultData[x] = 0;
        });

        this.data.forEach((x) => {
            resultData[x[prop]!]++;
        });

        return resultData;
    }

    public getDrillDownData(prop: keyof Bug, drillProp: keyof Bug): any {
        const resultData: {dataGroupId: string; data: Array<any[]>}[] = [];
        const labels: string[] = [...new Set(this.data.map((x) => x[prop]?.toString() ?? ''))];

        labels.forEach((x: string) => {
            resultData.push({
                dataGroupId: x,
                data: [],
            });
        });

        this.data.forEach((bug) => {
            const index = resultData.findIndex((x) => x.dataGroupId === bug[prop]);
            const dataExist = resultData[index].data.findIndex((x) => x[0] === bug[drillProp]);
            if (dataExist > -1) {
                resultData[index].data[dataExist][1]++;
            } else {
                resultData[index].data.push([bug[drillProp], 1]);
            }
        });

        return resultData;
    }

    private cleanData(): void {
        this._data.forEach((x, index) => {
            if (x.assignee === '') {
                this._data[index].assignee = this.NO_ASSIGNEE;
            }
            if (x.labels === '') {
                this._data[index].labels = this.NO_LABEL;
            }
        });
    }
}

import {Component} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public assigneeXAxis: string[] = [];
    public assigneeData: number[] = [];

    public labelsXAxis: string[] = [];
    public labelData: number[] = [];
    public constructor(private dataService: DataService) {
        const assignees = dataService.getCountBy('assignee');

        Object.keys(assignees).forEach((key) => {
            this.assigneeXAxis.push(key);
            this.assigneeData.push(assignees[key]);
        });

        const labels = dataService.getCountBy('labels');

        Object.keys(labels).forEach((key) => {
            this.labelsXAxis.push(key);
            this.labelData.push(labels[key]);
        });
    }
}
